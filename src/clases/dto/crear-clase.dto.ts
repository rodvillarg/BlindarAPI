// Validacion minima a mano. En la Sesion 9 (Blindar la API) la hace

import { IsNotEmpty, IsString, MaxLength } from "class-validator";

// ValidationPipe.
export class CrearClaseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  nombre: string = "";

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  descripcion: string = "";
}
