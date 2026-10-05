import { Injectable } from '@nestjs/common';
import { Clase } from '../dominio/entidades';
import { ClaseRepository } from '../dominio/clase.repository';
import { CrearClaseDto } from '../dto/crear-clase.dto';
import { ActualizarClaseDto } from '../dto/actualizar-clase.dto';
import { PrismaService } from '../../prisma/prisma.service';

// En la Practica 8, ClasePrismaRepository implementa la misma
// interfaz contra MySQL.
@Injectable()
export class ClasePrismaRepository implements ClaseRepository {

    constructor(private readonly prisma: PrismaService){}


  async listar(): Promise<Clase[]> {
    return this.prisma.clase.findMany();
  }

  async buscarPorId(id: number): Promise<Clase | null> {
    return this.prisma.clase.findUnique({ where : {  id  }});
  }

  async crear(datos: CrearClaseDto): Promise<Clase> {
    return this.prisma.clase.create({ data: datos});
  }

  async actualizar(id: number, datos: ActualizarClaseDto): Promise<Clase | null> {
    const existe = await this.prisma.clase.findUnique({where: {id}});
    if(!existe) return null;
    return this.prisma.clase.update({where: {id:id}, data: datos});
  }

  async eliminar(id: number): Promise<Clase | null> {
    const existe = await this.prisma.clase.findUnique({where: {id}});
    if(!existe) return null;
    return this.prisma.clase.delete({where: {id}});
  }
}
