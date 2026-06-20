
import { Gps } from "src/gps/entities/gps.entity";
import { CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Vehicle {

    @PrimaryColumn({ unique: true})
    vehicle_id!:string

   @CreateDateColumn({ type: 'timestamptz' })
    created_at!:Date
    
    @OneToMany(()=> Gps,(gps)=>gps.vehicle, {cascade:true})
    gps!:Gps[]

}
