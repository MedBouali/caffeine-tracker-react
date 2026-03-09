import { calculateCurrentCaffeineLevel, coffeeConsumptionHistory, getCaffeineAmount, timeSinceConsumption } from '../utils';

export default function History() {
    return (
        <div className="history-section">
            <div className="history-header">
                <h2>History</h2>
            </div>
            <p><i>Hover for more information</i></p>
            <div className="coffee-history">
                {Object.keys(coffeeConsumptionHistory).sort((a, b) => b - a).map((utcTime, coffeeIndex) => {
                    const coffee = coffeeConsumptionHistory[utcTime]
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