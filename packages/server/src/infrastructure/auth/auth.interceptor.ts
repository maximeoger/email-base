import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import AuthService from './auth.service';
import util from 'node:util';

@Injectable()
export default class AuthInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  constructor(private readonly authService: AuthService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const { email, name, sub } = request.session;

    const user = await this.authService.getUser(email) ?? await this.authService.createUser(name, email, sub);

    this.logger.debug(user)

    request.user = user;

    return next.handle();
  }
}
