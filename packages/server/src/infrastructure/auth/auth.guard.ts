import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from "@nestjs/common";
import AuthService from "./auth.service";
import { Request } from "express";

@Injectable()
class AuthGuard implements CanActivate {

  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    // @ts-ignore
    const sessionToken = request.raw.cookies['authjs.session-token'];

    if (!sessionToken) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }

    const isValidSession = await this.authService.verifySession(sessionToken)

    if (!isValidSession) {
      throw new UnauthorizedException('Session invalide ou expirée');
    }

    return true;
  }
}

export default AuthGuard;