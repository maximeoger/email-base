import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
class AuthService {

  private readonly logger = new Logger(AuthService.name)

  constructor(private prisma: PrismaService) {}

  async verifySession (sessionToken: string) : Promise<boolean> {
    const results = await this.getSession(sessionToken)

    if(!results) return false

    //if (results.expires > new Date().getTime()) 

    return true
    
  }

  async getSession (sessionToken: string) : Promise<any> {
    return await this.prisma.sessions.findUnique({
      where: {
        sessionToken
      },
      select: {
        id: true,
        expires: true,
        sessionToken: true,
        userId: true,
        users: true 
      }
    })
  }

}

export default AuthService;
