import { createContext, useContext, useState } from "react"


type NotificationType = {
  status: 'success' | 'error'
  message: string
}

type NotificationContextProviderProps = {
  children: React.ReactNode
}

type NotificationContextType = {
  notification: NotificationType[]
  setNotification: React.Dispatch<React.SetStateAction<NotificationType[]>>
  addNotification: ( type: 'success' | 'error', message: string) => void
}

export const NotificationContext = createContext<NotificationContextType | null>(null)

export const NotificationContextProvider = ({children}: NotificationContextProviderProps) => {
  const [notification, setNotification] = useState<NotificationType[]>([]);

  const addNotification = (status: 'success' | 'error', message: string) => {
    setNotification((prevNotification) => [{status, message}, ...prevNotification])
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
