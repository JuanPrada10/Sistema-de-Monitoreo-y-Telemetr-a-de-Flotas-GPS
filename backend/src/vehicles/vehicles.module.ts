import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gps } from 'src/gps/entities/gps.entity';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService],
 imports:[TypeOrmModule.forFeature([Gps, Vehicle])],
 exports: [TypeOrmModule],
})
export class VehiclesModule {}
