import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,  } from "typeorm";
import { Cuatrimestre } from "./cuatrimestre";
import { ExpedienteEstudiante } from "./ExpedienteEstudiante";
import { EstudianteSalud } from "./estudianteSalud";

@Entity()
export class AdecuacionCurricular{

    
    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE LA ADECUACIÓN CURRICULAR'})
    IdAdecuacion: number;

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL ESTUDIANTE'})
    IdEstudiante: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE LA CARRERA'})
    IdCarrera: number; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA ADECUACIÓN RENOVACIÓN'})
    AdecuacionRenovacion: Boolean;

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA ADECUACIÓN DE PRIMERA VEZ'})
    AdecuacionPrimeraVez: Boolean; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL NÚMERO DE TELÉFONO'})
    @MaxLength(45, {message: 'El máximo de palabras es 45'})
    Telefono: number; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL EXPEDIENTE'})
    IdExpediente: number; 

    @Column({nullable:false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE SALUD'})
    IdSaludEst: number; 

    @Column({nullable: false })
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR UNA EXPLICACIÓN'})
    @MaxLength(250, {message: 'El máximo de palabras es 250'})
    Explicacion: string;

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR OTRA INFORMACIÓN'})
    @MaxLength(250, {message: 'El máximo de palabras es 250'})
    OtraInformacion: string; 

    // Relacion con la entidad de Cuatrimestre
    @ManyToOne(() => Cuatrimestre, cuatrimestre => cuatrimestre.adeCurriculars)
    @JoinColumn([{name: 'IdEstudiante', referencedColumnName: 'IdEstudiante'},{ name: "IdCarrera" , referencedColumnName: 'IdCarrera'}])
    cuatrimestre: Cuatrimestre;

    // Relacion con la entidad de Estudiante Salud
    @ManyToOne(() => EstudianteSalud, cuatrimestre => cuatrimestre.AdecuacionCurri)
    @JoinColumn({name: 'IdSaludEst', referencedColumnName: 'IdSaludEst'})
    saludEst: EstudianteSalud;

    // Relacion con la entidad de Expendiente Estudiante 
    @ManyToOne(() => ExpedienteEstudiante, ExpeEstu => ExpeEstu.AdecuacionCurri)
    @JoinColumn({ name: "IdExpediente" , referencedColumnName: 'IdExpediente'})
    ExpendienteEstudiante: ExpedienteEstudiante;




}