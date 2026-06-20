import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGpsDto } from './dto/create-gps.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gps } from './entities/gps.entity';
import { Repository } from 'typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';


@Injectable()
export class GpsService {

  @InjectRepository(Gps)
  private readonly gpsRepository: Repository<Gps>

  @InjectRepository(Vehicle)
  private readonly vehicleRepository: Repository<Vehicle>

  async create(createGpDto: CreateGpsDto) {
    try {
      let vehicle = await this.vehicleRepository.findOne({
        where: {
          vehicle_id: createGpDto.vehicle_id
        }
      });

      if (!vehicle) {
        vehicle = this.vehicleRepository.create({
          vehicle_id: createGpDto.vehicle_id
        });
        await this.vehicleRepository.save(vehicle);
      }

      const gps = this.gpsRepository.create({
        ...createGpDto,
        vehicle,
      });
      return await this.gpsRepository.save(gps);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Problemas con el servidor')

    }
  }


}
