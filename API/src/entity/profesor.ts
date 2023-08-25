import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Persona } from "./persona";
import { BitacoraDocente } from "./bitacoraDocente";
import { Estudiante } from "./estudiante";


@Entity()

export class Profesor{

    @PrimaryGeneratedColumn()
    IdProfesor: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE PERSONA'})
    IdPersona: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL CORREO INSTITUACIONAL'})
    @IsEmail()
    CorreoInstitucional: string;

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA CARRERA'})
    @MaxLength(45, {message: 'El máximo de palabras es 45'})
    Carrera: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA ESPECIALIZACIÓN'})
    @MaxLength(45, {message: 'El máximo de palabras es 45'})
    Especialización: string; 


    // Relación con entidad de Persona
    @OneToOne(() => Persona)
    @JoinColumn({name: "IdPersona"})
    persona: Persona;

    // Relacion con la entidad de Bitacora Docente
    @OneToMany(() => BitacoraDocente, (bitacoraDocentes) => bitacoraDocentes.profesor)
    bitacoraDocentes: BitacoraDocente[];

    // Relacion con la entidad de Estudiante
    @OneToMany(() => Estudiante, (estudiantes) => estudiantes.profesor)
    estudiantes: Estudiante[];
}