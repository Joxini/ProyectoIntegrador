import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApoyoEstudiante } from "./apoyoEstudiante";
import { Estudiante } from "./estudiante";
import { Cuatrimestre } from "./cuatrimestre";
import { Materias } from "./materia";


@Entity()
export class Carrera{

    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE CARRERA'})
    IdCarrera: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID ESTUDIANTE'})
    IdEstudiante: number; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL NOMBRE DE LA CARRERA'})
    @MaxLength(45, {message: 'EL MÁXIMO DE PALABRAS ES DE 45'})
    NomCarrera: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE LA MAETERIA'})
    IdMateria: number; 

    // Relacion con la entidad de Apoyo al Estudiante
    @OneToMany(() => ApoyoEstudiante, (apoyoEstudiante) => apoyoEstudiante.carrera)
    apoyoEstudiantes: ApoyoEstudiante[];

    // Relación con entidad de Estudiante
    @ManyToOne(() => Estudiante, (estudiante) => estudiante.carreras)
    @JoinColumn({name: "IdEstudiante"})
    estudiante: Estudiante

    // Relacion con la entidad de Cuatrimestres
    @OneToMany(() => Cuatrimestre, (cuatrimestre) => cuatrimestre.carrera)
    cuatrimestres: Cuatrimestre[];

    // Relación con entidad de Materia
    @ManyToOne(() => Materias, (materia) => materia.carreras)
    @JoinColumn({name: "IdMateria"})
    materia: Materias
}