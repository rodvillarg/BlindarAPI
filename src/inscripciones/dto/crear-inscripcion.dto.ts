import { IsInt, IsPositive } from "class-validator";

export class CrearInscripcionDto {
  @IsInt()
  @IsPositive()
  horarioId!: number;

  @IsInt()
  @IsPositive()
  miembroId!: number;
}