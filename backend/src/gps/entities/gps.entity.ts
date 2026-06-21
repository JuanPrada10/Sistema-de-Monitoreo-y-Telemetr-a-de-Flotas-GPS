import { Vehicle } from "src/vehicles/entities/vehicle.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Gps {

    @PrimaryGeneratedColumn('uuid')
    id!:string

    @Column('decimal', { precision: 10, scale: 7 })
    lat!:number

    @Column('decimal', { precision: 10, scale: 7 })
    lng!:number

    @Column()
    timestamp!: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at!: Date 

    @ManyToOne(()=>Vehicle, (vehicle)=> vehicle.vehicle_id,{onDelete: 'CASCADE'})
    vehicle!:Vehicle

}
