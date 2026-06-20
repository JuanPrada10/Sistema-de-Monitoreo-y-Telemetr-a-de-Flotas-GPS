import { Controller, Post, Body } from '@nestjs/common';
import { GpsService } from './gps.service';
import { CreateGpsDto } from './dto/create-gps.dto';


@Controller('gps')
export class GpsController {
  constructor(private readonly gpsService: GpsService) {}

  @Post()
  create(@Body() createGpDto: CreateGpsDto) {
    return this.gpsService.create(createGpDto);
  }
  
}
