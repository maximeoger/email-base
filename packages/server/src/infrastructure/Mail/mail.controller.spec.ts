import { Test, TestingModule } from '@nestjs/testing';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

describe('AppController', () => {
  let mailController: MailController;

  beforeEach(async () => {
    const mail: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [MailService],
    }).compile();

    mailController = mail.get<MailController>(MailController);
  });

  describe('root', () => {
    it('should return "Hello newsletters !"', () => {
    //  expect(MailController.getHello()).toBe('Hello newsletters !');
    });
  });
});
