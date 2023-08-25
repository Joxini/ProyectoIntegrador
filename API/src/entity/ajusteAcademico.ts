import { Blob } from "buffer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()

export class AjusteAcademico{

    //Recordar que devuelve un longblob
    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA DECLARACIÓN JURADA'})
    DeclaracionJurada: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA FECHA'})
    Fecha: Date; 
}