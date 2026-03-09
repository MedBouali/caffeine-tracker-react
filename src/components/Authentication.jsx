import { useState } from "react"

export default function Authentication() {
    const [isRegistration, setIsRegistration] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    async function handleAuthentication() {
        
    }

    return (
        <div className="authentication-container">
            <h2 className="sign-up-text">{isRegistration ? "Sign Up" : "Login"}</h2>
            <p>{isRegistration ? "Create your account" : "Sign in to your account"}</p>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
            <button onClick={handleAuthentication} className="btn btn-primary">
                <p>{isRegistration ? "Sign Up" : "Login"}</p>
            </button>
            <div className="register-content">
                <p>
                    {isRegistration ? "Already have an account?" : "Don't have an account?"}
                    <button onClick={() => {setIsRegistration(!isRegistration)}} className="btn-link btn-link-primary">
                        {isRegistration ? "Login" : "Sign up"}
                    </button>
                </p>
            </div>
        </div>
    )
}