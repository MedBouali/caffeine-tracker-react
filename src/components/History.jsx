import { calculateCurrentCaffeineLevel, getCaffeineAmount, timeSinceConsumption } from '../utils';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function History() {
    const {globalData} = useAuth()
    const [coffeeSummary, setCoffeeSummary] = useState(null)
    const [selectedCoffee, setSelectedCoffee] = useState(null)

    return (
        <div className="history-section">
            <div className="history-header">
                <h2>History</h2>
            </div>
            <p><i>Click for more information</i></p>
            <div className="coffee-history">
                {Object.keys(globalData).sort((a, b) => b - a).map((utcTime, coffeeIndex) => {
                    const coffee = globalData[utcTime]
                    const timeSinceConsume = timeSinceConsumption(utcTime)
                    const originalAmount = getCaffeineAmount(coffee.name)
                    const remainingAmount = calculateCurrentCaffeineLevel({
                        [utcTime]: coffee
                    })

                    const summary = {
                        name: coffee.name,
                        timeSinceConsume: timeSinceConsume,
                        cost: coffee.cost,
                        remainingAmount: remainingAmount,
                        originalAmount: originalAmount
                    }

                    return (
                        <div className='tooltip-container' key={coffeeIndex} title={coffee.name}>
                            <button
                                key={coffeeIndex}
                                onClick={() => {
                                    setCoffeeSummary(summary)
                                    setSelectedCoffee(coffeeIndex)
                                }}
                                className={"btn-rounded btn-rounded-primary " + (coffeeIndex === selectedCoffee ? 'btn-rounded-primary-selected' : '')} 
                            >
                                <i className="fa-solid fa-coffee" />
                            </button>
                        </div>
                    )
                })}
            </div>
            {coffeeSummary && (
                <div className="coffee-details">
                    <p>You drank a <strong>{coffeeSummary.name}</strong> {coffeeSummary.timeSinceConsume} ago. 
                    It cost <strong>${coffeeSummary.cost}</strong>, and currently about <strong>{coffeeSummary.remainingAmount}mg</strong> 
                    of caffeine remains in your system out of the original <strong>{coffeeSummary.originalAmount}mg</strong>.</p>
                </div>
            )}
        </div>
    )
}