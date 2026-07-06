import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { NotificationContextProvider } from './context/Notification.tsx'
import { CartContextProvider } from './context/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </CartContextProvider>
  </StrictMode>,
)
