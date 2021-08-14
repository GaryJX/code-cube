import React from 'react'
import { signOut } from 'next-auth/client'

const Editor: React.FC = () => {
  return (
    <div>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda quia
      similique id saepe quidem possimus recusandae earum nesciunt dolores!
      Consectetur tenetur eos ipsam eius libero, consequuntur molestiae sed amet
      incidunt molestias, doloribus, aliquid atque quisquam! Doloremque pariatur
      veniam libero officiis voluptatem nostrum perspiciatis voluptate! Nihil
      sit quae vel eum eveniet! Accusantium porro perspiciatis possimus nemo.
      Facere earum dolor veritatis hic voluptates rerum qui, cum atque
      temporibus eligendi quidem tempore, aliquam nisi id. Vero, quasi
      repellendus! Architecto odit dolores saepe molestiae ad, consequatur
      maiores similique, aspernatur iusto voluptatem temporibus provident dolore
      tempore reprehenderit! Perspiciatis, hic ducimus soluta nesciunt adipisci
      distinctio fugit odio, dicta assumenda, ratione deserunt nam molestias
      incidunt explicabo quae alias cum ut fugiat iste omnis accusantium esse
      architecto. Numquam ducimus nemo, rerum delectus voluptates eius minima
      reiciendis deserunt in esse! Libero consequatur odit reiciendis quas.
      Beatae nulla reiciendis eaque rem tempora perferendis?
      <button onClick={() => signOut()}>Sign out </button>
    </div>
  )
}

export default Editor
