import {coffeeOptions} from "../utils"
import { useState } from "react"
import Modal from "./Modal"
import Authentication from "./Authentication"
import { useAuth } from "../context/AuthContext"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase"

export default function CoffeeForm(props) {
    const {isAuthenticated} = props
    const [showModal, setShowModal] = useState(false)
    const [selectedCoffee, setSelectedCoffee] = useState(null)
    const [showCoffeeTypes, setShowCoffeeTypes] = useState(false)
    const [coffeeCost, setCoffeeCost] = useState(0)
    const [hour, setHour] = useState(0)
    const [min, setMin] = useState(0)
    const [error, setError] = useState(null)

    const { globalData, setGlobalData, globalUser } = useAuth()

    async function handleSubmitForm() {
        setError(null)
        
        if (!isAuthenticated) {
            setShowModal(true)
            return
        }

        if (!selectedCoffee) {
            setError("Please select a coffee type.")
            return 
        }

        try {
            const newGlobalData = {
                ...(globalData || {})
            }

            const nowTime = Date.now()
            const timeToSubtract = (hour * 60 * 60 * 1000) + (min * 60 * 1000)
            const timestamp = nowTime - timeToSubtract

            const newData = {
                name: selectedCoffee,
                cost: coffeeCost
            }
            newGlobalData[timestamp] = newData
            console.log(timestamp, selectedCoffee, coffeeCost)

            setGlobalData(newGlobalData)

            const userRef = doc(db, "users", globalUser.uid)
            const res = await setDoc(userRef, {
                [timestamp]: newData
            }, { merge: true })

            setSelectedCoffee(null)
            setCoffeeCost(0)
            setHour(0)
            setMin(0)
        } catch (error) {
            console.log(error.message)
        }
    }

    function handleCloseModal() {
        setShowModal(false)
    }

    return (
        <section className="form-section">
            {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                    <Authentication handleCloseModal={handleCloseModal} />
                </Modal>
            )}
            <div className="form-header">
                <h2>Start Tracking Today</h2>
            </div>
            <h4>Select coffee type</h4>
            {error && (
                <div className="alert-danger">{error}</div>
            )}
            <div className="coffee-grid ">
                {coffeeOptions.slice(0, 5).map((option, optionIndex) => (
                    <button onClick={() => {
                        setSelectedCoffee(option.name)
                        setShowCoffeeTypes(false)
                    }} className={"btn-card " + (option.name === selectedCoffee ? 'btn-card-selected' : '')} key={optionIndex}>
                        <div className="btn-card-icon">
                            <i className="fa fa-coffee"></i>
                        </div>
                        <div className="btn-card-text">
                            <h4>{option.name}</h4>
                            <p>{option.caffeine} mg</p>
                        </div>
                    </button>
                ))}
                <button onClick={() => {
                    setShowCoffeeTypes(true)
                    setSelectedCoffee(null)
                }} className={"btn-card " + (showCoffeeTypes ? 'btn-card-selected' : '')}>
                    <div className="btn-card-icon">
                        <i className="fa fa-coffee"></i>
                    </div>
                    <div className="btn-card-text">
                        <h4>Other</h4>
                        <p>n/a</p>
                    </div>
                </button>
            </div>
            {showCoffeeTypes && (
                <select
                    value={selectedCoffee || ''} 
                    onChange={(e) => {
                        setSelectedCoffee(e.target.value)
                    }}
                    name="coffee-list"
                    id="coffee-list"
                >
                    <option value={null}>Select type</option>
                    {coffeeOptions.map((option, optionIndex) => (
                        <option key={optionIndex} value={option.name}>
                            {option.name} ({option.caffeine}mg)
                        </option>
                    ))}
                </select>
            )}
            <h4>Add the cost ($)</h4>
            <input type="number" value={coffeeCost} onChange={(e) => {
                setCoffeeCost(e.target.value)
            }} placeholder="4.50" />
            <h4>Time since consumption</h4>
            <div className="time-entry">
                <div>
                    <h6>Hours</h6>
                    <select
                        value={hour}
                        onChange={(e) => {
                            setHour(e.target.value)
                        }}
                        id="hours-select"
                    >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((hour, hourIndex) => {
                            return (
                                <option key={hourIndex} value={hour}>
                                    {hour}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <h6>Mins</h6>
                    <select
                        value={min}
                        onChange={(e) => {
                            setMin(e.target.value)
                        }}
                        id="mins-select"
                    >
                        {[0, 5, 10, 15, 30, 45].map((min, minIndex) => {
                            return (
                                <option key={minIndex} value={min}>
                                    {min}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <button onClick={handleSubmitForm} className="btn btn-primary">
                Add the entry
            </button>
        </section>
    )
}