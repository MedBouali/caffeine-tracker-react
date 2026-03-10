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
        </div>
        {globalUser ? (
            <button onClick={logout} className="btn btn-outline-primary">
                Logout
            </button>
        ) : (
            <button onClick={() => {
                setShowModal(true)
            }} className="btn btn-outline-primary">
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