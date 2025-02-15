export class AddMailToCollectionDto {
  mailId!: number;
  collectionId!: number;
}

export class CreateEmailDTO {
  uid!: string;
  subject!: string;
  senderId!: number;
  bodyHtml!: string;
}