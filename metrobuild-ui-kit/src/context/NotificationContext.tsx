import { createContext, useContext, useState } from "react"

type NotificationContextProviderProps = {
  children: React.ReactNode
}

type Notification = {
  type: 'success' | 'error'
  message: string
}

type NotificationContextType = {
  notification: Notification[]
  setNotification: React.Dispatch<React.SetStateAction<Notification[]>>
  addNotification: ( type: 'success' | 'error', message: string) => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export const NotificationContextProvider = ({children}: NotificationContextProviderProps) => {
  const [notification, setNotification] = useState<Notification[]>([])

  const addNotification = (type: 'success' | 'error', message: string) => {
    setNotification((prevNotification) => [{type, message}, ...prevNotification])
  }

  return (
    <NotificationContext.Provider value={{notification, setNotification, addNotification}}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const data = useContext(NotificationContext);

  if(!data) throw new Error('useNotification must be used within a NotificationContextProvider');

  return data
}

