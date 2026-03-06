export default function Layout(props) {
    const { children } = props
    const header = <header className="header">
        <div>
            <h1>CaffeineLog</h1>
            <p>Track your caffeine. Understand your habits.</p>
        </div>
        <button className="btn btn-primary">
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
            Login
        </button>
    </header>
    const footer = <footer className="footer">
        <p><strong>CaffeineLog</strong> was made by <a href="https://github.com/MedBouali" target="_blank" rel="noopener noreferrer">Mohammed Bouali</a>.</p>
    </footer>

    return (
        <>
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}