import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Estudiante } from "./estudiante";


@Entity()

export class EvaluacionServicioEstudiantil{

    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE LA EVALUACIÓN'})
    IdEvaluacion: number; 

    @Column({primary: true, nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL ESTUDIANTE'})
    IdEstudiante: number; 


    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA FECHA'})
    Fecha: Date; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL PERIODO'})
    Periodo: Boolean; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LOS COMENTARIOS'})
    @MaxLength(250, {message: 'EL MÁXIMO DE PALABRAS ES DE 250'})
    ComententarioEstudiante: string; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA CALIFICACIÓN'})
    @MaxLength(100, {message: 'El máximo de palabras es 100'})
    CalificacionEstudiante: string; 

    //Relacion con la entidad de Estudiante.
    @ManyToOne(() => Estudiante, (estudiante) => estudiante.EvaluaServEst)
    @JoinColumn({name: "IdEstudiante"})
    estudiante: Estudiante
}