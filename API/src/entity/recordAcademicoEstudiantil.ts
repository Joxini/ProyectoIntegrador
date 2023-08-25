import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Estudiante } from "./estudiante";
import { BoletaMatricula } from "./boletaMatricula";


@Entity()

export class RecordAcademico{

    @Column({primary: true, nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL ESTUDIANTE'})
    IdEstudiante: number; 

    //Recordar que devuelve un longblob
    @Column({primary: true, nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA BOLETA'})
    Boleta: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LOS CRÉDITOS MATRICULADOS'})
    CreditosMatriculados: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LOS CRÉDITOS PÉRDIDOS'})
    CreditosPerdidos: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LOS CRÉDITOS APROBADOS'})
    CreditosAprobados: number; 

    // Relación con entidad de Estudiante
    @ManyToOne(() => Estudiante, (estudiante) => estudiante.recordAcademico)
    @JoinColumn({name: "IdEstudiante"})
    estudiante: Estudiante

    // Relación con entidad de Boleta Matricula
    @ManyToOne(() => BoletaMatricula, (boletaMatri) => boletaMatri.recordAcademico)
    @JoinColumn({name: "Boleta"})
    boletaMatri: BoletaMatricula
}