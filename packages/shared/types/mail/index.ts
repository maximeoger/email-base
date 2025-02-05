export class AddMailToCollectionDto {
  mailId: number;
  collectionId: number;
}

export class CreateEmailDTO {
  uid!: string;
  subject!: string;
  sender_id!: number;
  body_html!: string;
}