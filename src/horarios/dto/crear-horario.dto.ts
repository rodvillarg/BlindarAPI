// Validacion minima a mano. En la Sesion 9 (Blindar la API) la hace

import { IsInt, IsNotEmpty, IsPositive, IsString, Matches, MaxLength, Min } from "class-validator";

export class CrearHorarioDto {
  @IsInt()
  @IsPositive()
  claseId!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  dia!: string;

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/)
  horaInicio!: string;

  @IsInt()
  @Min(1)
  cupoMaximo!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  entrenador!: string;
}