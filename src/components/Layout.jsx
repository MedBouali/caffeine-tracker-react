import Modal from "./Modal"
import Authentication from "./Authentication"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Layout(props) {
    const { children } = props
    const [showModal, setShowModal] = useState(false)

    const {globalUser, logout} = useAuth()

    const header = <header className="header">
        <div>
            <h1>CaffeineLog</h1>
            <p>Track Your Caffeine, Understand Your Habits</p>
        </div>
        {globalUser ? (
            <div className="user-info">
                <div className="user-email">
                    <h5>{globalUser.email}</h5>
                </div>
                <button onClick={logout} className="btn btn-outline-primary">
                    Logout
                </button>
            </div>
        ) : (
            <button onClick={() => {
                setShowModal(true)
            }} className="btn btn-primary">
                Login
            </button>
        )}
    </header>
    const footer = <footer className="footer">
        <p><strong>CaffeineLog</strong> was made by <a href="https://github.com/MedBouali" target="_blank" rel="noopener noreferrer">Mohammed Bouali</a>.</p>
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