import React from 'react'
import { RingLoader } from 'react-spinners'
import styles from './Loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.loading}>
      <RingLoader color="#2F80ED" />
    </div>
  )
}

export default Loading
