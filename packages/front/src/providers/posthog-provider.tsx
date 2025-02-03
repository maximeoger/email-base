'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { PropsWithChildren } from 'react'

if (typeof window !== 'undefined') {
  posthog.init(
    process.env.NEXT_PUBLIC_POSTHOG_KEY as string, 
    {
      api_host: `${window.location.origin}/ingest`,
      ui_host: "https://eu.posthog.com",
      person_profiles: 'always',
      loaded: function (ph) {
        if (process.env.NEXT_PUBLIC_ENV == 'development') {
            ph.opt_out_capturing();
            ph.set_config({ disable_session_recording: true });
        }
      }
    }
  )
}

export function CSPostHogProvider({ children }: PropsWithChildren) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
