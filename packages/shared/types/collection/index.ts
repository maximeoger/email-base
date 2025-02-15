export class CreateCollectionDto {
  name!: string;
  description?: string;
}

export class CollectionDto {
  id!: number;
  name!: string;
  description!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
  emailIds!: Array<number>;
  screenshots!: Array<{ path: string; filename: string; }>;
}

export class UpdateCollectionDto {
  name?: string;
  description?: string;
}
