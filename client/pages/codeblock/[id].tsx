import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const CodeBlockPage: React.FC = (props) => {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/codeblock/${id}`)
        .then((response) => {
          console.log({ data: response.data })
          setData(response.data)
        })
        .catch((err) => {
          console.error({ err: err.response })
        })
    }
  }, [id])

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default CodeBlockPage
