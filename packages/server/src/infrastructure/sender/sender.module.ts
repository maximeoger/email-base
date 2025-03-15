import { Module } from "@nestjs/common";
import { SenderController } from "./sender.controller";
import { AuthModule } from "../auth/auth.module";
import { SenderService } from "./sender.service";
import { PrismaService } from "src/core/prisma/prisma.service";

@Module({
  imports: [],
  controllers: [SenderController],
  providers: [SenderService, PrismaService]
})
export class SenderModule {}