import { useNotification } from '../context/Notification'

const NotificationBanner = () => {
  const { notification } = useNotification();
  
  return (
    <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1000 }}>
      {notification.map((notif, index) => (
        <div
          key={index}
          style={{
            padding: "12px 24px",
            marginBottom: "10px",
            borderRadius: "4px",
            color: "#ffffffff",
            fontWeight: "bold",
            backgroundColor: notif.type === "success" ? "darkgreen" : "crimson",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
          }}
        >
        </div>
      ))}
    </div>
  )
}

export default NotificationBanner
