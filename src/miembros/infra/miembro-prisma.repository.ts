import { Injectable } from '@nestjs/common';
import { Miembro } from '../dominio/entidades';
import { MiembroRepository } from '../dominio/miembro.repository';
import { CrearMiembroDto } from '../dto/crear-miembro.dto';
import { ActualizarMiembroDto } from '../dto/actualizar-miembro.dto';
import { PrismaService } from '../../prisma/prisma.service';

// En la Practica 9, MiembroPrismaRepository reemplaza al de memoria.
@Injectable()
export class MiembroPrismaRepository implements MiembroRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listar(): Promise<Miembro[]> {
    return this.prisma.miembro.findMany();
  }

  async buscarPorId(id: number): Promise<Miembro | null> {
    return this.prisma.miembro.findUnique({ where: { id } });
  }

  async crear(datos: CrearMiembroDto): Promise<Miembro> {
    return this.prisma.miembro.create({ data: { ...datos, activo: true } });
  }

  async actualizar(id: number, datos: ActualizarMiembroDto): Promise<Miembro | null> {
    const existe = await this.prisma.miembro.findUnique({ where: { id } });
    if (!existe) return null;
    return this.prisma.miembro.update({ where: { id }, data: datos });
  }

  async eliminar(id: number): Promise<Miembro | null> {
    const existe = await this.prisma.miembro.findUnique({ where: { id } });
    if (!existe) return null;
    return this.prisma.miembro.delete({ where: { id } });
  }
}