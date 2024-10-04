import MailResults from "src/components/mail-results"
import { Button, Link } from "@nextui-org/react"

export default async function Home() {
  return (
    <div className="w-full">
      <section className="h-[333px] w-full bg-main px-16 flex flex-col justify-around">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-black text-white">
            Explore <span className="text-black">15K+</span> 
            original emails <br/> of many online brands
          </h1>  
          <Link href={"/login"}>
            <Button className="bg-white text-main">Get Started</Button>   
          </Link>     
        </div>
      </section>
      <section className="mt-16">
        <MailResults/>
      </section>
    </div>
  )
}