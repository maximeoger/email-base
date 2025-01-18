import { IsNumberString } from "class-validator";

export class AddMailToCollectionQueryDto {
  @IsNumberString()
  mailId: string;

  @IsNumberString()
  collectionId: string;
}