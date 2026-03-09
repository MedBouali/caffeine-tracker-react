import Modal from "./Modal"
import Authentication from "./Authentication"
import { useState } from "react"

export default function Layout(props) {
    const { children } = props
    const [showModal, setShowModal] = useState(false)

    const header = <header className="header">
        <div>
            <h1>CaffeineLog</h1>
        </div>
        <button onClick={() => {
            setShowModal(true)
        }} className="btn btn-outline-primary">
            Login
        </button>
    </header>
    const footer = <footer className="footer">
        <p><strong>CaffeineLog</strong> was made by <a href="https://github.com/MedBouali" target="_blank" rel="noopener noreferrer">Mohammed Bouali</a>.</p>
    </footer>

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={() => setShowModal(false)}>
                    <Authentication />
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