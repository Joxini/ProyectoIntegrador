import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Persona } from "./persona";
import { Profesor } from "./profesor";
import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";
import { Ubicacion } from "./ubicacion";
import { SolicitarCita } from "./solicitarCita";
import { EvaluacionServicioEstudiantil } from "./evaluacionServicioEstudiantil";
import { BoletaMatricula } from "./boletaMatricula";
import { ApoyoEstudiante } from "./apoyoEstudiante";
import { Carrera } from "./carrera";
import { Cuatrimestre } from "./cuatrimestre";
import { DatosSostenibilidadEstudiante } from "./datosSostenibilidadEstudiante";
import { EstudianteSalud } from "./estudianteSalud";
import { RecordAcademico } from "./recordAcademicoEstudiantil";


@Entity()

export class Estudiante{

    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL ESTUDIANTE'})
    IdEstudiante: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE LA PERSONA'})
    IdPersona: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DEL PROFESOR'})
    IdProfesor: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE LA UBICACIÓN'})
    IdUbicacion: number; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA NACIONALIDAD'})
    @MaxLength(30, {message: 'EL MÁXIMO DE PALABRAS ES DE 30'})
    Nacionalidad: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL CORREO INSTITUCIONAL '})
    @IsEmail()
    CorreoInstitucional: string;

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ESTADO CIVIL'})
    @MaxLength(1, {message: 'EL MÁXIMO DE PALABRAS ES DE 1'})
    EstadoCivil: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL NÚMERO DE TELÉFONO'})
    @MaxLength(45, {message: 'EL MÁXIMO DE PALABRAS ES DE 45'})
    Telefono: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA CARRERA'})
    @MaxLength(45, {message: 'EL MÁXIMO DE PALABRAS ES DE 45'})
    Carrera: string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL NIVEL'})
    @MaxLength(1, {message: 'EL MÁXIMO DE PALABRAS ES DE 1'})
    Nivel: string; 




    // Relación con entidad de persona
    @OneToOne(() => Persona)
    @JoinColumn({name: "IdPersona"})
    persona: Persona;

    // Relación con entidad de profesor
    @ManyToOne(() => Profesor, (profesor) => profesor.estudiantes)
    @JoinColumn({name: "IdProfesor"})
    profesor: Profesor;

    // Relación con entidad de ubicacion
    @ManyToOne(() => Ubicacion, (ubicacion) => ubicacion.estudiantes)
    @JoinColumn({name: "IdUbicacion"})
    ubicacion: Ubicacion

    // Relacion con la entidad de SolicitarCita
    @OneToMany(() => SolicitarCita, (solicita) => solicita.estudiante)
    solicitaCitas: SolicitarCita[];

    // Relacion con la entidad de EvaluacionServicioEstudiante
    @OneToMany(() => EvaluacionServicioEstudiantil, (EvaSoliEstudiante) => EvaSoliEstudiante.estudiante)
    EvaluaServEst: EvaluacionServicioEstudiantil[];

    // Relacion con la entidad de Boleta matricula
    @OneToMany(() => BoletaMatricula, (boletasmatricula) => boletasmatricula.estudiante)
    BoletasMatriculas: BoletaMatricula[];

    // Relacion con la entidad de Apoyo al Estudiante
    @OneToMany(() => ApoyoEstudiante, (apoyoEstudiante) => apoyoEstudiante.estudiante)
    apoyoEstudiantes: ApoyoEstudiante[];

    // Relacion con la entidad de Carrera
    @OneToMany(() => Carrera, (carrera) => carrera.estudiante)
    carreras: Carrera[];

    // Relacion con la entidad de Cuatrimestres
    @OneToMany(() => Cuatrimestre, (cuatrimestre) => cuatrimestre.estudiante)
    cuatrimestres: Cuatrimestre[];

    // Relacion con la entidad de Datos Sostenibilidad Estudiante
    @OneToMany(() => DatosSostenibilidadEstudiante, (DatosSosEstu) => DatosSosEstu.estudiante)
    DatosSosEstu: DatosSostenibilidadEstudiante[];

    // Relacion con la entidad de Estudiante Salud 
    @OneToMany(() => EstudianteSalud, (estudiantesSalud) => estudiantesSalud.estudiante)
    estudiantesSalud: EstudianteSalud[];

    // Relacion con la entidad de Record Academico Estudiante
    @OneToMany(() => RecordAcademico, (recordAcademico) => recordAcademico.estudiante)
    recordAcademico: RecordAcademico[];
}
