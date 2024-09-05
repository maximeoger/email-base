import { Injectable } from '@nestjs/common';
import { Mail } from './mail.interface';
import { createClient } from '@supabase/supabase-js'
import { Database } from '../../database.types'

@Injectable()
export class MailService {
  async getEmails(min: number, max: number): Promise<any[]> {
   
    const { SUPABASE_PROJECT_URL, SUPABASE_PROJECT_ANON_KEY } = process.env;

    console.log({ SUPABASE_PROJECT_URL, SUPABASE_PROJECT_ANON_KEY })

    const supabase = createClient<Database>(SUPABASE_PROJECT_URL as string, SUPABASE_PROJECT_ANON_KEY as string)

    const { data, error } = await supabase.from('email').select("*").range(min, max)

    if (error) throw error

    return data;
  }
}
