import { IsISO8601, IsLatitude, IsLongitude, IsNotEmpty, IsString, Max, Min } from "class-validator"

export class CreateGpsDto {

    @IsString()
    @IsNotEmpty()
    vehicle_id!:string;

    @IsLatitude()
    @Max(90)
    @Min(-90)
    lat!:number;

    @IsLongitude()
    @Max(180)
    @Min(-180)
    lng!:number;

    @IsISO8601()
    timestamp!:string;
}
