import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Estudiante } from "./estudiante";
import { Carrera } from "./carrera";


@Entity()

export class ApoyoEstudiante{

    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL APOYO'})
    IdApoyo: number; 

    @Column({primary: true})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL ESTUDIANTE'})
    IdEstudiante: number; 

    @Column({primary: true})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE LA CARRERA'})
    IdCarrera: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR SI POSEE BECA'})
    Beca: boolean; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL TIPO DE BECA'})
    @MaxLength(1, {message: 'EL MÁXIMO DE NÚMEROS ES 1'})
    TipoBeca: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR SI POSEE RESIDENCIA'})
    @MaxLength(1, {message: 'EL MÁXIMO DE CARACTERES ES 1'})
    Residencia: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR SI POSEE APOYO ECONÓMICO'})
    ApoyoEconomico: boolean;  


    // Relación con entidad de Estudiante
    @ManyToOne(() => Estudiante, (estudiante) => estudiante.apoyoEstudiantes)
    @JoinColumn({name: "IdEstudiante"})
    estudiante: Estudiante


    // Relación con entidad de Carrera
    @ManyToOne(() => Carrera, (carrera) => carrera.apoyoEstudiantes)
    @JoinColumn({name: "IdCarrera"})
    carrera: Carrera

}