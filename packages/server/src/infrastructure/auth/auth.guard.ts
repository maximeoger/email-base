import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from "@nestjs/common";
import AuthService from "./auth.service";
import { Request } from "express";
import util from "node:util";

@Injectable()
class AuthGuard implements CanActivate {

  private readonly logger = new Logger()

  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    // @ts-ignore
    const { authorization } = request.headers;

    const token = authorization.split('Bearer ')[1];

    if (!token) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }
    
    const verifiedToken = await this.authService.verifyToken(token)

    if (verifiedToken === false) {
      throw new UnauthorizedException('Token invalide ou expiré');
    }

    // @ts-ignore
    request.session = verifiedToken;

    return true;
  }
}

export default AuthGuard;