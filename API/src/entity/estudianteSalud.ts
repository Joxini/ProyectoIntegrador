import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Estudiante } from "./estudiante";
import { AdecuacionCurricular } from "./adecuacionCurricular";


@Entity()
export class EstudianteSalud{

    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE SALUD'})
    IdSaludEst: number; 

    @Column({ nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL ESTUDIANTE'})
    IdEstudiante:number; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL TRATAMIENTO PSICOLOGICO'})
    @MaxLength(45, {message: 'EL MÁXIMO DE PALABRAS ES DE 45'})
    TratamientoPsicologico: string;
    
    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL MEDICAMENTO'})
    @MaxLength(20, {message: 'EL MÁXIMO DE PALABRAS ES DE 20'})
    Medicamento: string; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA ENFERMEDADL'})
    @MaxLength(20, {message: 'EL MÁXIMO DE PALABRAS ES DE 20'})
    Enfermedad: string; 

    //Relacion con la entidad de Estudiante.
    @ManyToOne(() => Estudiante, (estudiante) => estudiante.estudiantesSalud)
    @JoinColumn({name: "IdEstudiante"})
    estudiante: Estudiante

    // Relacion con la entidad de Adecuacion Curricular
    @OneToMany(() => AdecuacionCurricular, (AdecuacionCurri) => AdecuacionCurri.saludEst)
    AdecuacionCurri: AdecuacionCurricular[];

}