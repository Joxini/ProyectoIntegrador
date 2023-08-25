import { Router } from "express";

import Expediente  from "./ExpedienteEstudiante";

import Apoyo  from "./ApoyoEstudiante";

import Bitacora  from "./BitacoraDocente";

import Boleta  from "./BoletaMatricula";

import Carreras  from "./Carreras";

import Citas  from "./Citas";

import Cuatrimestres  from "./Cuatrimestres";

import Datos  from "./DatosSostenibilidadEst";

import Encargado  from "./Encargado";

import Estudiante  from "./Estudiante";

import Salud  from "./EstudianteSalud";

import Evaluacion  from "./EvaluacionServicioEstudiantil";

import Inicio  from "./InicioSesion";

import Materias  from "./Materias";

import Persona  from "./Persona";

import Profesores  from "./Profesores";

import Record  from "./RecordAcademicoEst";

import Servicios  from "./Servicios";

import Solicitar  from "./SolicitarCita";

import Ubicacion  from "./Ubicacion";

import Ajuste  from "./AjusteAcademico";

import Adecuacion  from "./AdecuacionCurricular";



const routes = Router();

routes.use('/ExpedienteEstudiante',Expediente);
routes.use('/ApoyoEstudiante',Apoyo);
routes.use('/BitacoraDocente',Bitacora);
routes.use('/BoletaMatricula',Boleta);
routes.use('/Carreras',Carreras);
routes.use('/Citas',Citas);
routes.use('/Cuatrimestres',Cuatrimestres);
routes.use('/DatosSostenibilidadEst',Datos);
routes.use('/Encargado',Encargado);
routes.use('/Estudiante',Estudiante);
routes.use('/EstudianteSalud',Salud);
routes.use('/EvaluacionServicioEstudiantil',Evaluacion);
routes.use('/InicioSesion',Inicio);
routes.use('/Materias',Materias);
routes.use('/Persona',Persona);
routes.use('/Profesores',Profesores);
routes.use('/RecordAcademicoEst',Record);
routes.use('/Servicios',Servicios);
routes.use('/SolicitarCita',Solicitar);
routes.use('/Ubicacion',Ubicacion);
routes.use('/AjusteAcademico',Ajuste);
routes.use('/AdecuacionCurricular',Adecuacion);


export default routes;