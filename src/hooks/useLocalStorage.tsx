import * as React from 'react'

export interface IUseLocalStorageProps {}

export function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item =
        typeof window !== 'undefined' ? localStorage.getItem(key) : null
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}
