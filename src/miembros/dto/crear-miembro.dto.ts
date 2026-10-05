// Validacion minima a mano. En la Sesion 9 (Blindar la API) la hace
// ValidationPipe.

import { IsEmail, IsIn, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CrearMiembroDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string = "";

  @IsEmail()
  @MaxLength(150)
  correo: string = "";

  @IsIn(['basica', 'plus', 'premium'])
  membresia: string = "";
}
