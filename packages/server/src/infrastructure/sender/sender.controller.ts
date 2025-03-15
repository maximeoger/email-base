import { Controller, Get, Param } from "@nestjs/common";
import { SenderService } from "./sender.service";

@Controller('api/senders')
export class SenderController {
  constructor (private readonly senderService: SenderService) {}

  @Get(':id')
  getSender(@Param('id') id: number) {
    return this.senderService.getSenderDetails({ id: Number(id) })
  }
}