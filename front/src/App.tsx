import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/mails?min=1&max=3')
        const data = await response.json()
        setData(data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setError(true)
        console.log(err)
      }
    }

    fetchData().catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <>
      <div className="mx-auto px-2 sm:px-4 lg:px-8">
        <span className="leading-9">e-mail base</span>
      </div>

      <div className="min-h-screen bg-gray-100 p-6">

        <div className="mt-0 mx-auto w-fit grid gap-4 grid-cols-4">
          {loading && (<p>Loading ...</p>)}
          {error && (<p>Une erreur est survenue :(</p>)}
          {
            data.map(mail => (
              <div className="w-64 rounded-lg bg-white">
                <div className="px-4 py-2">
                  <span className="text-xs text-slate-400">{mail.date}</span>
                  <p className="font-semibold text-sm">{mail.subject}</p>
                </div>
                <div className="mt-4 p-4">
                  <img
                    className="w-64 h-64 object-cover object-top"
                    src={mail.screenshot} alt={mail.subject}
                  />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App
