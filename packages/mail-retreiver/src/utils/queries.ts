import { Database } from 'shared/types'
import { createClient } from '@supabase/supabase-js'

const { SUPABASE_PROJECT_URL, SUPABASE_PROJECT_ANON_KEY } = process.env;

const supabase = createClient<Database>(SUPABASE_PROJECT_URL as string, SUPABASE_PROJECT_ANON_KEY as string)

export async function getEmailsHTMLBody () {
  const { data, error } = await supabase.from("email").select("id, body_html")
  if (error) throw error
  return data
}

export async function upsertEmail(payload: any) {
  const { error } = await supabase.from("email").upsert(payload, { onConflict: "uid" })
  if (error) throw error
}

export async function updateEmail(payload: any, id: number) {
  const { data, error } = await supabase.from("email").update(payload).eq("id", id)
  if (error) throw error
  return data
}

export async function upsertSender(payload: { name: string; address: string; created_at: string }) {
  const { error } = await supabase.from("sender").upsert(payload, { onConflict: "address" })
  if (error) throw error
}

export async function getSenders(payload: Record<string, any>) {
  const { data, error } = await supabase.from("sender").select("id").eq("address", payload)
  if (error) throw error
  return data
}

export async function upsertEmailScreenshot(payload: any) {
  const { data, error } = await supabase.from("email_screenshot").upsert(payload, { onConflict: "email_id" }).select('id')
  if(error) throw error
  return data
}