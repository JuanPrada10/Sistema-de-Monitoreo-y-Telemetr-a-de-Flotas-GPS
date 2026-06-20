import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [VehiclesModule, ConfigModule.forRoot(),TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'gpsdb',
      autoLoadEntities:true,
      synchronize: true,
    }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
