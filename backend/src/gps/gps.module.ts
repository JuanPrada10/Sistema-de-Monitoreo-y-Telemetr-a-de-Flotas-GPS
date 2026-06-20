import { Module } from '@nestjs/common';
import { GpsService } from './gps.service';
import { GpsController } from './gps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gps } from './entities/gps.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

@Module({
  controllers: [GpsController],
  providers: [GpsService],
  imports:[TypeOrmModule.forFeature([Gps, Vehicle])],
  exports: [TypeOrmModule],
})
export class GpsModule {}
