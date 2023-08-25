import { Blob } from "buffer";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Estudiante } from "./estudiante";
import { RecordAcademico } from "./recordAcademicoEstudiantil";


@Entity()

export class BoletaMatricula{

    @PrimaryGeneratedColumn()
    boleta: number; 

    @Column({ nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL ESTUDIANTE'})
    IdEstudiante: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL PERIODO'})
    @MaxLength(8, {message: 'EL MÁXIMO DE PALABRAS ES DE 8'})
    Periodo: string; 

    //Relacion con la entidad de Estudiante.
    @ManyToOne(() => Estudiante, (estudiante) => estudiante.BoletasMatriculas)
    @JoinColumn({name: "IdEstudiante"})
    estudiante: Estudiante

    // Relacion con la entidad de Record Academico Estudiante
    @OneToMany(() => RecordAcademico, (recordAcademico) => recordAcademico.boletaMatri)
    recordAcademico: RecordAcademico[];
    
}