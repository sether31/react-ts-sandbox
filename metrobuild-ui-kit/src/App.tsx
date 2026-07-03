import { useState } from "react";
import CustomButton from "./components/CustomButton"
import { useNotification } from "./context/NotificationContext"


type UserInfoTypes = {
  name: string
  email: string
}

function App() {
  const [user, setUser] = useState<UserInfoTypes>({
  name: "",
  email: ""
  });
  const {notification, addNotification} = useNotification();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setUser((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!user.name || !user.email) {
      return addNotification('error', 'Please fill out all fields!')
    }

    addNotification('success', `Success! Welcome to MetroBuild, ${user.name}.`)
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      
      <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1000 }}>
        {notification.map((notif, index) => (
          <div
            key={index}
            style={{
              padding: "12px 24px",
              marginBottom: "10px",
              borderRadius: "4px",
              color: "#fff",
              fontWeight: "bold",
              backgroundColor: notif.type === "success" ? "darkgreen" : "crimson",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
            }}
          >
            {notif.message}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "10px", width: "100vw" }}>
        <h2>Registration Sandbox</h2>
        
        <input 
          type="text" 
          name="name" 
          placeholder="Enter Name" 
          value={user.name}
          onChange={(e) => handleChange(e)}
        />
        
        <input 
          type="email" 
          name="email" 
          placeholder="Enter Email"
          value={user.email}
          onChange={(e) => handleChange(e)}
        />

        <CustomButton type="submit" variant="primary">
          Submit
        </CustomButton>
      </form>

    </div>
  )
}

export default App
