import { calculateCurrentCaffeineLevel, getCaffeineAmount, timeSinceConsumption } from '../utils';
import { useAuth } from '../context/AuthContext';

export default function History() {
    const {globalData} = useAuth()

    return (
        <div className="history-section">
            <div className="history-header">
                <h2>History</h2>
            </div>
            <p><i>Hover for more information</i></p>
            <div className="coffee-history">
                {Object.keys(globalData).sort((a, b) => b - a).map((utcTime, coffeeIndex) => {
                    const coffee = globalData[utcTime]
                    const timeSinceConsume = timeSinceConsumption(utcTime)
                    const originalAmount = getCaffeineAmount(coffee.name)
                    const remainingAmount = calculateCurrentCaffeineLevel({
                        [utcTime]: coffee
                    })
                    const summary = `- Coffee: ${coffee.name}\n` +
                    `- Time Since Consumption: ${timeSinceConsume}\n` +
                    `- Cost: $${coffee.cost}\n` +
                    `- Caffeine Remaining: ${remainingAmount}mg / ${originalAmount}mg.`
                    
                    return (
                        <div className='tooltip-container' key={coffeeIndex} title={summary}>
                            <i className="fa-solid fa-coffee" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}