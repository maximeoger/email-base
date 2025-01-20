export class CreateCollectionDto {
  name: string;
  description?: string;
}

export class CollectionDto {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  emailIds: Array<number>;
}

export class UpdateCollectionDto {
  name?: string;
  description?: string;
}