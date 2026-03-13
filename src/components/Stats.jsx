import { calculateCoffeeStats, calculateCurrentCaffeineLevel, getTopThreeCoffees, statusLevels } from "../utils"
import { useAuth } from "../context/AuthContext"

function StatCard(props) {
    const {lg, icon, iconClass, title, children} = props

    return (
        <div className={"card " + (lg ? "col-span-2" : "")}>
            <div className={iconClass}>
                <i className={icon}></i>
            </div>
            <h4>{title}</h4>
            {children}
        </div>
    )
}

export default function Stats() {
    const { globalData } = useAuth()
    const stats = calculateCoffeeStats(globalData)

    const caffeineLevel = calculateCurrentCaffeineLevel(globalData)
    const warningLevel = caffeineLevel < statusLevels['low'].maxLevel ?
        'low' :
        caffeineLevel < statusLevels['moderate'].maxLevel ?
            'moderate' :
            'high'

    return (
        <div className="stats-section">
            <div className="stats-header">
                <h2>Stats</h2>
            </div>
            <div className="stats-grid">
                <StatCard
                    lg
                    icon="fa-solid fa-bolt"
                    iconClass="icon icon-primary"
                    title="Active Caffeine Level"
                >
                    <div className="status">
                        <p>
                            <span className="stat-text">
                                {caffeineLevel}
                            </span>mg
                        </p>
                        <h5 style={{ color: statusLevels[warningLevel].color, background: 
                            statusLevels[warningLevel].background, borderRadius: '20%', padding: '0 0.5rem' }}>{warningLevel.charAt(0).toUpperCase() + warningLevel.slice(1)}</h5>
                    </div>
                    <p>{statusLevels[warningLevel].description}</p>
                </StatCard>
                <StatCard
                    icon="fa-solid fa-mug-hot"
                    iconClass="icon icon-secondary"
                    title="Daily Caffeine Intake"
                >
                    <p>
                        <span className="stat-text">
                            {stats.daily_caffeine}
                        </span>mg
                    </p>
                </StatCard>
                <StatCard
                    icon="fa-solid fa-layer-group"
                    iconClass="icon icon-compliment"
                    title="Avg # of Coffees"
                >
                    <p>
                        <span className="stat-text">
                            {stats.average_coffees}
                        </span>
                    </p>
                </StatCard>
                <StatCard
                    icon="fa-solid fa-calendar-day"
                    iconClass="icon icon-success"
                    title="Daily Cost ($)"
                >
                    <p>
                        $ <span className="stat-text">
                            {stats.daily_cost}
                        </span>
                    </p>
                </StatCard>
                <StatCard
                    icon="fa-solid fa-wallet"
                    iconClass="icon icon-danger"
                    title="Total Cost ($)"
                >
                    <p>
                        $ <span className="stat-text">
                            {stats.total_cost}
                        </span>
                    </p>
                </StatCard>
            </div>
            
            <h4>Top 3 Most Consumed Coffees</h4>
            <div className="card-table">
                <table className="stat-table">
                    <thead>
                        <tr>
                            <th>Coffee Name</th>
                            <th>Number of Purchases</th>
                            <th>Percentage of Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getTopThreeCoffees(globalData).map((coffee, index) => {
                            return (
                                <tr key={index}>
                                    <td>{coffee.coffeeName}</td>
                                    <td>{coffee.count}</td>
                                    <td>{coffee.percentage}</td>
                                </tr>
                        )})}
                    </tbody>
                </table>
            </div>
        </div>
    )
}