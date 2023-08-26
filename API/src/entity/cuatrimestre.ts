import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Estudiante } from "./estudiante";
import { Carrera } from "./carrera";
import { AdecuacionCurricular } from "./adecuacionCurricular";


/* La clase Cuatrimestre es una entidad en TypeScript. */
@Entity()
export class  Cuatrimestre{

    @Column({primary: true, nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL DEL ESTUDIANTE'})
    IdEstudiante: number; 

    @Column({primary: true, nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL DE LA CARRERA'})
    IdCarrera: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL CUATRIMESTRE'})
    @MaxLength(45, {message: 'El máximo de palabras es 45'})
    Cuatrimestre: string; 


     // Relación con entidad de Carrera
     @ManyToOne(() => Carrera, (carrera) => carrera.cuatrimestres)
     @JoinColumn({name: "IdCarrera"})
     carrera: Carrera;

     // Relación con entidad de Estudiante
     @ManyToOne(() => Estudiante, (estudiante) => estudiante.cuatrimestres)
     @JoinColumn({name: "IdEstudiante"})
     estudiante: Estudiante;

     @OneToMany(() => AdecuacionCurricular, adeCurricular => adeCurricular.cuatrimestre)
     adeCurriculars: AdecuacionCurricular[];
}