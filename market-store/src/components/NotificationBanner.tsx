import React from 'react'
import { useNotification } from '../context/NotificationContext'

const NotificationBanner = () => {
  const { notification } = useNotification()

  return (
    <div className="fixed top-10 right-10 z-1000">
      {notification.map((data, index) => {
        return(
          <div
            key={index}
            className={`
              py-3 px-6 rounded-sm shadow-lg text-white mb-2 max-w-max ml-auto block
              ${data.status === "success" ? "bg-green-700" : "bg-red-900"}
            `}
          >
            {data.message}
          </div>
        )
      })}
    </div>
  )
}

export default NotificationBanner
