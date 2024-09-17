import { PropsWithChildren } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import RootLayout from "src/app/layout";

export default function PageLayout ({ children }: PropsWithChildren) {
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