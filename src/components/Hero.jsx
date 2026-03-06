export default function Hero() {
    return (
        <section className="hero">
            <h1>Track Your Caffeine, Master Your Energy <i class="fa-solid fa-mug-hot"></i></h1>

            <div className="benefits-list">
                <h3>
                    Use <strong>CaffeineLog</strong> to start...
                </h3>
                <p><i className="fa-solid fa-check"></i> Logging every coffee, tea, or energy drink</p>
                <p><i className="fa-solid fa-check"></i> Tracking caffeine levels in your body over time</p>
                <p><i className="fa-solid fa-check"></i> Understanding your daily caffeine habits</p>
            </div>

            <div className="info-section">
                <h3>
                    <i className="fa-solid fa-info"></i> Did you know?
                </h3>
                <h5>Caffeine stays in your system longer than you think.</h5>
                <p>
                Caffeine has an average half-life of about 5 hours. That means
                five hours after drinking coffee, about half of the caffeine is
                still active in your body. For example, if you drink 200 mg of
                caffeine, roughly 100 mg may still be affecting you five hours later.
                </p>
            </div>
        </section> 
    )
}