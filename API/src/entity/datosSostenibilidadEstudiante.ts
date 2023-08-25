
import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Estudiante } from "./estudiante";


@Entity()

export class DatosSostenibilidadEstudiante{

    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE SOSTENIBILIDAD'})
    IdSostenibilidad: number; 

    @Column({primary: true,nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL ESTUDIANTE'})
    IdEstudiante: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LOS TRASLADOS'})
    Traslados: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL MONTO DE LA ALIMENTACIÓN'})
    Alimentacion: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL MONTO DE LOS GASTOS'})
    GastosVarios: number;  

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL MONTO DE APOYO FAMILIAR'})
    ApoyoFamiliar: number;


    // Relación con entidad de Estudiante
    @ManyToOne(() => Estudiante, (estudiante) => estudiante.DatosSosEstu)
    @JoinColumn({name: "IdEstudiante"})
    estudiante: Estudiante;

}