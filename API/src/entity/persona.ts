import { IsDate, IsEmail, IsNotEmpty, MaxLength, isDate } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Persona{
    
    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE LA PERSONA'})
    IdPersona: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA IDENTIFICACIÓN'})
    @MaxLength(20, {message: 'EL MÁXIMO DE PALABRAS ES DE 20'})
    Identificacion: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL NOMBRE'})
    @MaxLength(50, {message: 'EL MÁXIMO DE PALABRAS ES DE50'})
    Nombre: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL APELLIDO UNO'})
    @MaxLength(50, {message: 'EL MÁXIMO DE PALABRAS ES DE 50'})
    Apellido1: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL APELLIDO DOS'})
    @MaxLength(50, {message: 'EL MÁXIMO DE PALABRAS ES DE 50'})
    Apellido2: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL GÉNERO'})
    @MaxLength(10, {message: 'EL MÁXIMO DE PALABRAS ES DE 10'})
    Genero: string; 

    @Column({nullable: false, type: "date"})
    @IsDate()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA FECHA DE NACIMIENTO'})
    FechaNacimiento: Date; 

    @Column({default: true})
    Estado: boolean;

    

 
}