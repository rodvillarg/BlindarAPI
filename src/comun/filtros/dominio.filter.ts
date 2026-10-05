import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import type { Request, Response } from 'express';
import {
  ErrorDeDominio,
  HorarioNoEncontradoError,
  MiembroNoEncontradoError,
} from '../../inscripciones/dominio/errores';

// Atrapa la clase base: cualquier error de dominio nuevo que se agregue
// despues cae aqui sin tocar el filtro.
@Catch(ErrorDeDominio)
export class DominioExceptionFilter implements ExceptionFilter {
  catch(error: ErrorDeDominio, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    // Los dos "no existe" son 404, los de reglas del gimnasio son 409.
    let estado = 409;
    if (error instanceof HorarioNoEncontradoError || error instanceof MiembroNoEncontradoError) {
      estado = 404;
    }

    res.status(estado).json({
      statusCode: estado,
      error: error.name,
      message: error.message,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}