import { useState } from 'react'
import { login } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
    const navigate = useNavigate()
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(mail, password)   
            navigate('/')
        } catch (err) {
            alert(err.message)
        }

    }
    return (
  <div>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>

      <label>Email</label>
      <input 
        type="email" 
        value={mail}
        onChange={e => setMail(e.target.value)}
      />

      <label>Mot de passe</label>
      <input 
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit">Se connecter</button>
    </form>
  </div>
    )

    
}


