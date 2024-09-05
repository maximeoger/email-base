import { PropsWithChildren } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function PageLayout ({ children }: PropsWithChildren) {
  return (
    <>
      <Header/>
      <main className="min-h-screen bg-gray-100 p-6 pt-[100px]">
        {children}
      </main>
      <Footer/>
    </>
  )
} 