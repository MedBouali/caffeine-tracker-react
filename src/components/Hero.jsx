export default function Hero() {
    return (
        <section className="hero">
            <h1>Track Your Caffeine, Understand Your Habits.</h1>

            <div className="benefits-list">
                <h3>
                    Use <strong>CaffeineLog</strong> to start...
                </h3>
                <p><i className="fa-solid fa-check"></i> Logging every coffee, tea, or energy drink</p>
                <p><i className="fa-solid fa-check"></i> Tracking caffeine levels in your body over time</p>
                <p><i className="fa-solid fa-check"></i> Understanding your daily caffeine habits</p>
            </div>

            <button className="btn btn-primary">Get Started</button>
            <span className="wave"></span>
            <span className="wave"></span>
            <span className="wave"></span>
        </section> 
    )
}