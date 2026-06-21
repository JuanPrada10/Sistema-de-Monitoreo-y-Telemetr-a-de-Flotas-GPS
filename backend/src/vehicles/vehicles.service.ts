import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Gps } from 'src/gps/entities/gps.entity';
import { VehicleResponse } from './types/VehiclesResponse.interface';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepo: Repository<Vehicle>,
    @InjectRepository(Gps)
    private gpsRepo: Repository<Gps>,
  ) {}

  async findAll() {
    const vehicles = await this.vehicleRepo.find({
      order: { created_at: 'ASC' },
    });

    const now = new Date();


    const results: VehicleResponse[] = [];

    for (const vehicle of vehicles) {
      const lastGps = await this.gpsRepo.findOne({
        where: { vehicle: { vehicle_id: vehicle.vehicle_id } },
        order: { timestamp: 'DESC' },
      });

      if (!lastGps) {
        results.push({
          vehicle_id: vehicle.vehicle_id,
          last_lat: null,
          last_lng: null,
          last_seen: null,
          status: 'Sin señal',
        });
        continue;
      }

      const lastSeen = new Date(lastGps.timestamp);
      const secondsSinceLastSeen = (now.getTime() - lastSeen.getTime()) / 1000;

      if (secondsSinceLastSeen > 120) {
        results.push({
          vehicle_id: vehicle.vehicle_id,
          last_lat: lastGps.lat,
          last_lng: lastGps.lng,
          last_seen: lastSeen.toISOString(),
          status: 'Sin señal',
        });
        continue;
      }

      const lastTwoGps = await this.gpsRepo.find({
        where: { vehicle: { vehicle_id: vehicle.vehicle_id } },
        order: { timestamp: 'DESC' },
        take: 2,
      });

      const prevGps = lastTwoGps.length > 1 ? lastTwoGps[1] : null;

      const isMoving =
        prevGps &&
        (Number(prevGps.lat) !== Number(lastGps.lat) ||
          Number(prevGps.lng) !== Number(lastGps.lng));

      const status = isMoving ? 'En movimiento' : 'Detenido';

      results.push({
        vehicle_id: vehicle.vehicle_id,
        last_lat: lastGps.lat,
        last_lng: lastGps.lng,
        last_seen: lastSeen.toISOString(),
        status,
      });
    }

    return results;
  }

  async remove(id: string) {
    const vehicle = await this.vehicleRepo.findOne({
      where: { vehicle_id: id },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehículo "${id}" no encontrado`);
    }

   
    await this.vehicleRepo.remove(vehicle);

    return { message: `Vehículo "${id}" eliminado` };
  }
}
