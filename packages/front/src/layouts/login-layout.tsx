import { PropsWithChildren } from "react";
import RootLayout from "src/app/layout";
import Header from "src/components/header";
import Footer from "src/components/footer";

export default function LoginLayout({ children }: PropsWithChildren) {
  return (
    <RootLayout>
      <Header/>
      <main className="bg-gray-100 pt-[66px] flex flex-1">
        {children}
      </main>
      <Footer/>
    </RootLayout>
  )
}
