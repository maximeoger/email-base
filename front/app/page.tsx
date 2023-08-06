'use client'
import {useEffect} from "react";
import useRequest from "./helpers/useRequest";
import MailsGallery from "./components/MailsGallery/MailsGallery";
import Pagination from "./components/Pagination/Pagination";
import usePagination from "./helpers/usePagination";

const LIMIT = 8;

export default function Page() {
  const { page, setPage, setTotalItems, totalPages } = usePagination(0, LIMIT);

  return (
    <>
      <div className="mx-auto px-2 sm:px-4 lg:px-8">
        <span className="leading-9">EmailTemplate.fr</span>
      </div>

      <section className="bg-gray-100 text-black p-6">
        <div className="px-44">
          <h1 className="font-bold text-5xl leading-normal">Le premier moteur de recherche <br/>de newsletters 100% français  💌 🇫🇷</h1>
          <p className="mt-5 font-light">Grâce à notre outil, trouvez l’inspiration en un clin d’oeil !
            Que vous soyez une agence, freelance ou une marque, restez informé des nouvelles tendances de votre marché en matière d’email marketing.
          </p>
          <p className="mt-5 font-light">
            Vous êtes une marque ? Contactez-nous sur <a className="text-blue-600" href="mailto:hello@emailtemplate.fr">hello@emailtemplate.fr</a> pour vous référencer ou toute autre demande.
          </p>
        </div>
      </section>

      <div className="min-h-screen bg-gray-100">
        <MailsGallery page={page} limit={LIMIT} setTotalItems={setTotalItems}/>
        <div className="mt-4">
          <div className="my-0 mx-auto w-fit">
            <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
          </div>
        </div>
      </div>
    </>
  )
}
