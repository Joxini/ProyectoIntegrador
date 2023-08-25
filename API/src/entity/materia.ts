import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Carrera } from "./carrera";


@Entity()

export class Materias{

    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE LA MATERIA'})
    IdMateria: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL NOMBRE DE LA MATERIA'})
    @MaxLength(55, {message: 'El máximo de palabras es 55'})
    NombreMateria: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA CANTIDAD DE CRÉDITOS'})
    Credito: number; 

    // Relacion con la entidad de Cuatrimestres
    @OneToMany(() => Carrera, (carrera) => carrera.materia)
    carreras: Carrera[];
}