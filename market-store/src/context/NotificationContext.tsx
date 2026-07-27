import { createContext, useContext, useState } from "react"

type NotificationContextProviderTypes = {
  children: React.ReactNode
}

type Notification = {
  id: number
  status: 'success' | 'error'
  message: string
}

type NotificationContextTypes = {
  notification: Notification[]
  setNotification: React.Dispatch<React.SetStateAction<Notification[]>>
  addNotification: (status: 'success' | 'error', message: string) => void
}

const NotificationContext = createContext<NotificationContextTypes | null>(null);

export const NotificationContextProvider = ({children}: NotificationContextProviderTypes) => {
  const [notification, setNotification] = useState<Notification[]>([]);

  const addNotification = (status: 'success' | 'error', message: string) => {
    const id = Date.now();

    setNotification((prev) => [...prev, {id, status, message}])

    setTimeout(() => {
      setNotification((prev) => prev.filter((n) => n.id !== id))
    }, 3000)
  }

  return (
    <NotificationContext.Provider value={{notification, setNotification, addNotification}}>
      {children}
    </NotificationContext.Provider>
  )
}



export const useNotification = () => {
  const data = useContext(NotificationContext);

  if(!data) throw new Error("useNotification must be use within the NotificationContextProvider")

  return data
}