import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SolicitarCita } from "./solicitarCita";


@Entity()

export class Servicios{

    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL SERVICIO'})
    IdServicio: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL NOMBRE DEL SERVICIO'})
    @MaxLength(45, {message: 'EL MÁXIMO DE PALABRAS ES DE 45'})
    NombreServicio: string; 

    // Relacion con la entidad de SolicitarCita
    @OneToMany(() => SolicitarCita, (solicita) => solicita.servicio)
    solicitaCitas: SolicitarCita[];
}