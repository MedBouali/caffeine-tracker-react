import Modal from "./Modal"
import Authentication from "./Authentication"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Layout(props) {
    const { children } = props
    const [showModal, setShowModal] = useState(false)

    const {globalUser, logout} = useAuth()

    const header = <header className="header">
        <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="37" height="37">
                <path
                    fill="rgb(255, 255, 255)"
                    d="M99.7 235.1C52.8 281.1 52.8 358 99.7 404.9L235.6 540.8C281.6 587.7 
                    358.5 587.7 405.4 540.8L541.3 404.9C588.2 358 588.2 281.1 541.3 235.1L405.4 
                    99.2C358.5 52.3 281.6 52.3 235.6 99.2L99.7 235.1zM260 260.5C292.9 227.4 346.4 
                    227.1 379.5 260C412.6 292.9 412.9 346.4 380 379.5C347.1 412.6 293.6 412.9 
                    260.5 380C227.4 347.1 227.1 293.6 260 260.5z"/>
            </svg>
            <div>
                <h1>CaffeineLog</h1>
                <p>Track Your Caffeine, Understand Your Habits</p>
            </div>
        </div>
        {globalUser ? (
            <div className="user-info">
                <div className="user-email">
                    <h5>{globalUser.email}</h5>
                </div>
                <button onClick={logout} className="btn btn-outline-accent">
                    Logout
                </button>
            </div>
        ) : (
            <button onClick={() => {
                setShowModal(true)
            }} className="btn btn-accent">
                Login
            </button>
        )}
    </header>
    const footer = <footer className="footer">
        <p>CaffeineLog was made by <a href="https://github.com/MedBouali" target="_blank" rel="noopener noreferrer">Mohammed Bouali</a>.</p>
    </footer>

    function handleCloseModal() {
        setShowModal(false)
    }

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                    <Authentication handleCloseModal={handleCloseModal} />
                </Modal>
            )}
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}