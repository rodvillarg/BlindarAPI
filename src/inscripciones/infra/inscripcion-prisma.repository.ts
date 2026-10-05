import { Injectable } from '@nestjs/common';
import { Horario, Inscripcion, Miembro, NuevaInscripcion } from '../dominio/entidades';
import { InscripcionRepository } from '../dominio/inscripcion.repository';
import { PrismaService } from '../../prisma/prisma.service';

// En la Practica 9, InscripcionPrismaRepository reemplaza al de memoria.
// Las reglas de cupo y duplicados NO viven aqui, siguen en el Service.
@Injectable()
export class InscripcionPrismaRepository implements InscripcionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listar(): Promise<Inscripcion[]> {
    return this.prisma.inscripcion.findMany();
  }

  async buscarPorId(id: number): Promise<Inscripcion | null> {
    return this.prisma.inscripcion.findUnique({ where: { id } });
  }

  async buscarPorHorario(horarioId: number): Promise<Inscripcion[]> {
    return this.prisma.inscripcion.findMany({ where: { horarioId } });
  }

  async buscarHorario(horarioId: number): Promise<Horario | null> {
    return this.prisma.horario.findUnique({ where: { id: horarioId } });
  }

  async buscarMiembro(miembroId: number): Promise<Miembro | null> {
    return this.prisma.miembro.findUnique({ where: { id: miembroId } });
  }

  async guardar(datos: NuevaInscripcion): Promise<Inscripcion> {
    return this.prisma.inscripcion.upsert({
      where: {
        horarioId_miembroId: { horarioId: datos.horarioId, miembroId: datos.miembroId },
      },
      create: { horarioId: datos.horarioId, miembroId: datos.miembroId },
      update: { estado: 'confirmada' },
    });
  }

  async cancelar(id: number): Promise<Inscripcion | null> {
    const existe = await this.prisma.inscripcion.findUnique({ where: { id } });
    if (!existe) return null;
    return this.prisma.inscripcion.update({
      where: { id },
      data: { estado: 'cancelada' },
    });
  }
}