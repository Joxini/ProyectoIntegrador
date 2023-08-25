import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Estudiante } from "./estudiante";
import { AdecuacionCurricular } from "./adecuacionCurricular";


@Entity()

export class ExpedienteEstudiante{

    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL EXPEDIENTE'})
    IdExpediente: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL ESTUDIANTE'})
    IdEstudiante: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL TIPO DE ADECUACIÓN'})
    @MaxLength(45, {message: 'EL MÁXIMO DE PALABRAS ES DE 45'})
    TipoAdecuacion: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA DIFICULTAD DE APRENDIZAJE'})
    @MaxLength(45, {message: 'EL MÁXIMO DE PALABRAS ES DE 45'})
    DificultadAprendizaje: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL APOYO TÉCNICO'})
    @MaxLength(1, {message: 'EL MÁXIMO DE PALABRAS ES DE 1'})
    ApoyoTecnico: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LOS TUTORES'})
    @MaxLength(45, {message: 'EL MÁXIMO DE PALABRAS ES DE  45'})
    Tutores: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL SEGUIMIENTO DEL ESTUDIANTE'})
    @MaxLength(100, {message: 'EL MÁXIMO DE PALABRAS ES DE 100'})
    SeguimientoEstudiante: string; 


    // Relación con entidad de Estudiante
    @OneToOne(() => Estudiante)
    @JoinColumn({name: "IdEstudiante"})
    estudiante: Estudiante;

    // Relacion con la entidad de Adecuacion Curricular
    @OneToMany(() => AdecuacionCurricular, (AdecuacionCurri) => AdecuacionCurri.ExpendienteEstudiante)
    AdecuacionCurri: AdecuacionCurricular[];
}