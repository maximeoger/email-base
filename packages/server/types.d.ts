import { Request } from 'express'

declare module "express" {
  export interface Request {
    session?: {
      userId: string;
    };
  }
}