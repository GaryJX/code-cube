import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import { connectToDatabase } from 'util/db'
import Link from 'next/link'
// import { useAxios } from '@/util/axiosConfig'
import axios from 'axios'

const CodeListPage: React.FC<any> = () => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Example to connect to backend server
    axios
      .get('/api/codeblocks')
      .then((response) => {
        console.log({ data: response.data })
        setData(response.data)
      })
      .catch((err) => {
        console.error({ err: err.response })
      })
  }, [])

  return (
    <div>
      {data.map((data) => (
        <div key={data._id}>
          <Link href={`/codeblock/${data._id}`}>
            <a>
              <h1>{data.name}</h1>
            </a>
          </Link>
          <div>
            HTML: <pre>{data.html}</pre>
          </div>
          <div>
            CSS: <pre>{data.css}</pre>
          </div>
          <div>
            JS: <pre>{data.js}</pre>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CodeListPage
