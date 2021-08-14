import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const LOCAL_STORAGE_PREFIX = 'code-cube-'

const useLocalStorage = (
  key: string,
  initialValue: string | (() => string)
): [string, Dispatch<SetStateAction<string>>] => {
  const prefixedKey = `${LOCAL_STORAGE_PREFIX}${key}`
  const [value, setValue] = useState('')

  useEffect(() => {
    const jsonValue = localStorage.getItem(prefixedKey)
    let newValue: string
    if (jsonValue != null) {
      newValue = JSON.parse(jsonValue)
    } else if (typeof initialValue === 'function') {
      newValue = initialValue()
    } else {
      newValue = initialValue
    }
    setValue(newValue)
  }, [])

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}

export default useLocalStorage
