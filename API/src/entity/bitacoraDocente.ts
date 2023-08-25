import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Estudiante } from "./estudiante";
import { Profesor } from "./profesor";


@Entity()
export class BitacoraDocente{

    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE BITACORA'})
    IdBitacora: number; 

    @Column()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL ESTUDIANTE'})
    IdEstudiante: number; 

    @Column()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL PROFESOR'})
    IdProfesor: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL REGISTRO DE ASISTENCIAS'})
    @MaxLength(45, {message: 'EL MÁXIMO DE PALABRAS ES DE 45'})
    RegistroAsistencias: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL AVANCE DE MATERIAS'})
    @MaxLength(45, {message: 'EL MÁXIMO DE PALABRAS ES DE 45'})
    AvanceMaterias: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA FECHA'})
    FechaHora: Date; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LOS COMPORTAMIENTOS'})
    @MaxLength(300, {message: 'EL MÁXIMO DE PALABRAS ES DE 300'})
    Comportamientos: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL PERIODO'})
    @MaxLength(45, {message: 'EL MÁXIMO DE PALABRAS ES DE 45'})
    Periodo: string; 


    // Relación con entidad de Estudiante
    @OneToOne(() => Estudiante)
    @JoinColumn({name: "IdEstudiante"})
    estudiante: Estudiante;

    // Relación con entidad de Profesor
    @ManyToOne(() => Profesor, (profesor) => profesor.bitacoraDocentes)
    @JoinColumn({name: "IdProfesor"})
    profesor: Profesor
}