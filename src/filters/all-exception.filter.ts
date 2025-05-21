import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

interface ResponseErrorException {
  message: string[];
  error: string;
  data?: unknown;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const response =
      exception instanceof HttpException
        ? (exception.getResponse() as string | ResponseErrorException)
        : {
            error: exception.toString(),
            message: [],
          };

    if (httpStatus === 500) httpStatus = HttpStatus.BAD_REQUEST;
    this.logger.error(response);
    this.logger.error(exception);

    const responseBody = {
      statusCode: httpStatus,
      message: typeof response === 'object' ? response.message : [],
      error: typeof response === 'object' ? response.error : 'Error unknown',
      data: typeof response === 'object' ? response.data : null,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
