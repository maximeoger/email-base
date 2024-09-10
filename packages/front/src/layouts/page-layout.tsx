import { PropsWithChildren } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import RootLayout from "src/app/layout";

export default function PageLayout ({ children }: PropsWithChildren) {
  return (
    <RootLayout>
      <Header/>
      <main className="min-h-screen bg-gray-100 p-6 pt-[100px]">
        {children}
      </main>
      <Footer/>
    </RootLayout>
  )
} 