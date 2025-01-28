import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import jwt from 'jsonwebtoken';
import { DecodedAuthenticationToken } from 'shared/types/auth';
import { user } from "@prisma/client"

interface DecodedToken {
  data: DecodedAuthenticationToken;
  iat: string;
}

@Injectable()
class AuthService {
  constructor(private prisma: PrismaService) {}

  async verifyToken(token: string): Promise<DecodedToken['data'] | false> {
    try {
      const { data } = jwt.verify(
        token,
        process.env.CUSTOM_JWT_SECRET,
      ) as jwt.JwtPayload & DecodedToken;

      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (data.exp < currentTimestamp) {
        return false;
      }

      return data;
    } catch (err: unknown) {
      return false;
    }
  }

  async getUser(email: string): Promise<user | null> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      }
    });
  }

  async createUser(name: string, email: string, sub: string): Promise<user> {
    return await this.prisma.user.create({
      data: { name, email, sub }
    })
  }
}

export default AuthService;
