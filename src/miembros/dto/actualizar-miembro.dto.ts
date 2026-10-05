// Todo opcional: un PATCH manda solo lo que cambia. "activo" es el
// campo pensado para dar de baja a un miembro sin borrar su historial.

import { IsBoolean, IsEmail, IsIn, IsOptional, IsString, MaxLength } from "class-validator";

export class ActualizarMiembroDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  correo?: string;

  @IsOptional()
  @IsIn(['basica', 'plus', 'premium'])
  membresia?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
