/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Injectable,
  NestInterceptor,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ForbiddenInterceptor implements NestInterceptor {
  intercept(): Observable<any> {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
