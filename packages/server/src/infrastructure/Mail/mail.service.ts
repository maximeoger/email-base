import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js'
import { Database } from 'common/types'
import MailRepository from './mail.repository';

@Injectable()
export class MailService {
  async getEmails(cursor: string ): Promise<any> {
   
    const { SUPABASE_PROJECT_URL, SUPABASE_PROJECT_ANON_KEY } = process.env;

    const from = Number(cursor)
    const to = from + 20

    const supabase = createClient<Database>(SUPABASE_PROJECT_URL as string, SUPABASE_PROJECT_ANON_KEY as string)

    const mailRepository = MailRepository.init(supabase)

    const data = await mailRepository.getWithinRange(from, to)

    return {
      results: data,
      nextCursor: to
    }
  }
}
