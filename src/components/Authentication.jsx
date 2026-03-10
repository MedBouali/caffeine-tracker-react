import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Authentication(props) {
    const { handleCloseModal } = props
    const [isRegistration, setIsRegistration] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [error, setError] = useState(null)

    const {signUp, login} = useAuth()

    async function handleAuthentication() {
        if (!email || !email.includes("@") || !password || password.length < 6 || isAuthenticating) {
            return
        }

        try {
            setIsAuthenticating(true)
            setError(null)

            if (isRegistration) {
                signUp(email, password)
            } else {
                await login(email, password)
            }

            handleCloseModal()
        } catch(err) {
            console.log(err.message)
            setError(err.message)
        } finally {
            setIsAuthenticating(false)
        }
    }

    return (
        <div className="authentication-container">
            <h2 className="sign-up-text">{isRegistration ? "Sign Up" : "Login"}</h2>
            <p>{isRegistration ? "Create your account" : "Sign in to your account"}</p>
            {error && <div className="error-card">{error}</div>}
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
            <button onClick={handleAuthentication} className="btn btn-primary">
                <p>{isAuthenticating ? "Authenticating..." : "Submit"}</p>
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