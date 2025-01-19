import { Request } from 'express'
import { DecodedAuthenticationToken } from 'shared/types/auth'

declare module "express" {
  export interface Request {
    session?: DecodedAuthenticationToken
  }
}