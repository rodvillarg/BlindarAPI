import { IsOptional, IsString, MaxLength } from "class-validator";

// Todo opcional: un PATCH manda solo lo que cambia.
export class ActualizarClaseDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  nombre?: string;
}
