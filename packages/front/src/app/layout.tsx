import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import React, { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import Header from "src/components/header";
import Footer from "src/components/footer";
import "../index.css";

export default async function RootLayout({ children }: PropsWithChildren) {

  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <SessionProvider>
            <div className="fixed z-[40] left-0 right-0">
              <Header />
            </div>
            <main className="bg-gray-100 pt-[66px] flex flex-1">{children}</main>
            <Footer />
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
