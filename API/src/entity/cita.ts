import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Encargado } from "./encargado";
import { SolicitarCita } from "./solicitarCita";


@Entity()
export class Cita{

    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE LA CITA'})
    IdCita: number; 
    
    @Column({ nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE SOLICITA'})
    IdSolicita: number; 

    @Column({ nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL ENCARGADO'})
    IdEncargado: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ESTADO'})
    Estado: Boolean; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA FECHA DE LA CITA'})
    FechaCita: Date; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA DESCRIPCIÓN'})
    @MaxLength(150, {message: 'El máximo de palabras es de 150'})
    Descripcion: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LAS OBSERVACIONES DEL ENCARGADO'})
    @MaxLength(200, {message: 'El máximo de palabras es 200'})
    ObservacionEncargado: string; 


    //Relacion con la entidad de Encargado.
    @ManyToOne(() => Encargado, (encargado) => encargado.citas)
    @JoinColumn({name: "IdEncargado"})
    encargado: Encargado

    //Relacion con la entidad de SolicitarCita.
    @ManyToOne(() => SolicitarCita, (solicita) => solicita.citas)
    @JoinColumn({name: "IdSolicita"})
    solicitaCita: SolicitarCita

}