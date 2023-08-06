"use client"
import useSWR from "swr";
import fetcher from "../helpers/fetcher"

export default function Page({ params }: { params: { slug: string } }) {
  const { data, error, isLoading } = useSWR(`http://localhost:3000/mails/${params.slug}`, fetcher);

  if(isLoading) return <p>Chargement ...</p>;

  if(error) return <p>Une erreur est survenue :(</p>;

  return (
    <section>
      <div>
        <p>{data.subject}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.html}}></div>
    </section>
  )
}