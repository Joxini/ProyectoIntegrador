import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Persona } from "./persona";
import { Cita } from "./cita";

@Entity()

export class Encargado{

    @PrimaryGeneratedColumn()
    IdEncargado: number; 

    @Column({ nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE PERSONA'})
    IdPersona: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL CORREO INSTITUCIONAL '})
    @IsEmail()
    CorreoInstitucional: string;


    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID EL ÁREA DE TRABAJO'})
    @MaxLength(45, {message: 'EL MÁXIMO DE PALABRAS ES DE 45'})
    AreaTrabajo: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA RESPONSABILIDAD'})
    @MaxLength(45, {message: 'EL MÁXIMO DE PALABRAS ES DE 45'})
    Responsabilidad: string; 


    // Relación con entidad de Persona
    @OneToOne(() => Persona)
    @JoinColumn({name: "IdPersona"})
    persona: Persona;

    // Relacion con la entidad de Cita
    @OneToMany(() => Cita, (cita) => cita.encargado)
    citas: Cita[]

}