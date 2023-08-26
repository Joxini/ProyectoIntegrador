import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Estudiante } from "./estudiante";
import { IsNotEmpty, MaxLength } from "class-validator";


@Entity()
/* La clase Ubicacion se utiliza para representar una ubicación. */
export class Ubicacion{

    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE LA UBICACIÓN'})
    IdUbicacion: number; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA DIRECCIÓN EXACTA'})
    @MaxLength(100, {message: 'EL MÁXIMO DE PALABRAS ES DE 100'})
    DirecExacta: string; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL LUGAR DE PROCEDENCIA'})
    @MaxLength(100, {message: 'EL MÁXIMO DE PALABRAS ES DE 100'})
    LugarProcedencia: string; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA PROVINCIA'})
    @MaxLength(20, {message: 'EL MÁXIMO DE PALABRAS ES DE 20'})
    Provinvia: string; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL CANTÓN'})
    @MaxLength(20, {message: 'EL MÁXIMO DE PALABRAS ES DE 20'})
    Canton: string; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL DISTRITO'})
    @MaxLength(20, {message: 'EL MÁXIMO DE PALABRAS ES DE  20'})
    Distrito: string; 

    // Relacion con la entidad de Estudiante
    @OneToMany(() => Estudiante, (estudiante) => estudiante.ubicacion)
    estudiantes: Estudiante[];
    
}