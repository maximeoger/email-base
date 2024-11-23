import React, { PropsWithChildren } from "react"
import { SessionProvider } from "next-auth/react";
import Header from "src/components/header";
import Footer from "src/components/footer";
import "../index.css";

export const metadata = {
  title: 'EmailBase | Get inspiration',
  description: 'Find inspiration with this online email gallery',
}

export default function RootLayout({children}: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
          <div className="fixed z-[40] left-0 right-0">
            <Header/>
          </div>
          <main className="bg-gray-100 pt-[66px] flex flex-1">
            {children}
          </main>
          <Footer/>
        </SessionProvider>
      </body>
    </html>
  )
}
