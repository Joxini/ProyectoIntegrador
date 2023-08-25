import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne} from "typeorm";
import { Persona } from "./persona";
import * as bcrypt from 'bcryptjs';

@Entity()

export class InicioSesion{

    @Column({ primary: true })
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ID DE LA PERSONA'})
    IdPersona: number;

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR EL ROL'})
    @MaxLength(45, {message: 'EL MÁXIMO DE PALABRAS ES DE 45'})
    Rol:string; 

    @Column({nullable: false})
    @IsNotEmpty({message:'ESTE CAMPO SE ENCUENTRA VACIO, DEBES DE INDICAR LA CLAVE'})
    @MaxLength(25, {message: 'EL MÁXIMO DE PALABRAS ES DE 25'})
    Clave: string; 

    // Relación con entidad de persona
    @OneToOne(() => Persona)
    @JoinColumn({name: "IdPersona"})
    persona: Persona;


    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10);
        this.Clave = bcrypt.hashSync(this.Clave, salt);
    }
    
    checkPassword(Clave: string): boolean {
      return bcrypt.compareSync(Clave, this.Clave);
    }
}