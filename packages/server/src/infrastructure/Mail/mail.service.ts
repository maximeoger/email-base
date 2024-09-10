import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js'
import { Database } from 'common/types'

const getPagination = (page: number, limit: number) => {
  const itemPerPages = limit;
  
  let from = page * itemPerPages;

  const to = from + itemPerPages;

  if (page > 0) {
    from += 1
  }

  return { from, to }
}

@Injectable()
export class MailService {
  async getEmails(page: string, limit: string): Promise<any[]> {
   
    const { SUPABASE_PROJECT_URL, SUPABASE_PROJECT_ANON_KEY } = process.env;

    const supabase = createClient<Database>(SUPABASE_PROJECT_URL as string, SUPABASE_PROJECT_ANON_KEY as string)

    const { from, to } = getPagination(Number(page), Number(limit))

    const { data, error } = await supabase.from('email').select(`
        id,
        subject,
        uid,
        received_date,
        screenshot: screenshot_id (
          base_64
        ),
        sender: sender_id (
          name,
          address
        )
    `).range(from, to)

    if (error) throw error

    return data.map((mail, i) => ({
      ...mail
    }))
  }
}
