import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import jwt from "jsonwebtoken";

interface DecodedToken {
  data: {
    name: string;
    email: string;
    picture: string;
    sub: string;
    iat: number;
    exp: number;
    jti: string;
  },
  iat: string;
}

@Injectable()
class AuthService {

  private readonly logger = new Logger(AuthService.name)

  constructor(private prisma: PrismaService) {}

  async verifyToken (token: string) : Promise<DecodedToken["data"] | boolean> {
    try {
      const { data } = jwt.verify(token, process.env.CUSTOM_JWT_SECRET) as jwt.JwtPayload & DecodedToken;

      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (data.exp < currentTimestamp) {
        return false
      }

      return data

    } catch (err: unknown) {
      return false
    }
  }

  async getUser (sub: string) : Promise<any> {
    return await this.prisma.user.findUnique({
      where: {
        sub
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })
  }
  
}

export default AuthService;
