import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cita } from "./cita";
import { Estudiante } from "./estudiante";
import { Servicios } from "./servicio";
import { IsNotEmpty, MaxLength } from "class-validator";


@Entity()

export class SolicitarCita{

    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE SOLICITA'})
    IdSolicita: number; 

    @Column({ nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL ESTUDIANTE'})
    IdEstudiante: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL SERVICIO'})
    IdServicio: number;

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR SI POSSE TRABAJO'})
    Trabaja: Boolean; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL NOMBRE DE LA EMPRESA'})
    @MaxLength(45, {message: 'EL MÁXIMO DE PALABRAS ES DE 45'})
    NombreEmpresa: string; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR SI POSEE SEGURO'})
    Asegurado: Boolean; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE LA MATERIA'})
    @MaxLength(45, {message: 'EL MÁXIMO DE PALABRAS ES DE  45'})
    NombreEmergencia: string; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL NÚMERO DE TELÉFONO DE EMERGENCIA'})
    TelefonoEmergencia: number; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA DESCRIPCIÓN'})
    @MaxLength(150, {message: 'EL MÁXIMO DE PALABRAS ES DE 150'})
    Descripcion: string; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL MOTIVO'})
    @MaxLength(100, {message: 'EL MÁXIMO DE PALABRAS ES DE 100'})
    Motivo: string; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LAS OBSERVACIONES'})
    @MaxLength(400, {message: 'EL MÁXIMO DE PALABRAS ES DE  400'})
    Observaciones: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA FECHA'})
    Fecha: Date; 


    // Relacion con la entidad de Cita
    @OneToMany(() => Cita, (cita) => cita.solicitaCita)
    citas: Cita[];

    //Relacion con la entidad de Estudiante.
    @ManyToOne(() => Estudiante, (estudiante) => estudiante.solicitaCitas)
    @JoinColumn({name: "IdEstudiante"})
    estudiante: Estudiante

    //Relacion con la entidad de Servicios.
    @ManyToOne(() => Servicios, (servicio) => servicio.solicitaCitas)
    @JoinColumn({name: "IdServicio"})
    servicio: Servicios
}