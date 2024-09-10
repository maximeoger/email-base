
import PageLayout from "src/layouts/page-layout"
import { SessionProvider } from "next-auth/react"
import HomePage from "src/components/home-page"
import "../index.css"


export default async function Home() {
  return (
    <SessionProvider>
      <PageLayout>
        <HomePage/>
      </PageLayout>
    </SessionProvider>
  )
}