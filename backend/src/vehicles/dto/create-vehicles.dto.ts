import { IsDateString, IsNotEmpty, IsString } from "class-validator"

class CreateVehicleDto{

    @IsString()
    @IsNotEmpty()
    vehicle_id:string

    @IsDateString()
    created_at:Date

}