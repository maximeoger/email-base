export class CreateSenderDTO {
  name!: string;
  address!: string;
}

export class SenderDTO {
  id!: number;
  createdAt!: string;
  updatedAt!: string;
  name!: string;
  address!: string;
  logo!: string | null; 
}