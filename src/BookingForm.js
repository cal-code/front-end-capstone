import { useState } from "react";

function BookingForm({ availableTimes, dispatch, submitForm }) {
    const occasions = [
        "None",
        "Birthday",
        "Anniversary"
    ];
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0], // Default to today's date
        time: availableTimes[0],
        guests: 1,
        occasion: occasions[0]
    });

    function handleDateChange(e) {
        const selectedDate = e.target.value;
        setFormData(prev => ({
            ...prev,
            date: selectedDate
        }));
        // Dispatch the date change to update available times
        dispatch({ type: "dateChanged", date: selectedDate });
    }

    function handleTimeChange(e) {
        setFormData(prev => ({
            ...prev,
            time: e.target.value
        }));
    }

    function handleGuestsChange(e) {
        setFormData(prev => ({
            ...prev,
            guests: e.target.value
        }));
    }

    function handleOccasionChange(e) {
        setFormData(prev => ({
            ...prev,
            occasion: e.target.value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Submit the form data using the API
        submitForm(formData);
    }

    return (
        <form aria-label="Table reservation form" onSubmit={handleSubmit}>
            <label htmlFor="res-date">Choose date</label>
            <input type="date" id="res-date" name="date" value={formData.date} onChange={handleDateChange} required aria-required="true" />

            <label htmlFor="res-time">Choose time</label>
            <select id="res-time" name="time" value={formData.time} onChange={handleTimeChange} required aria-required="true">
                {availableTimes.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                ))}
            </select>

            <label htmlFor="guests">Number of guests</label>
            <input type="number" id="guests" name="guests" value={formData.guests} onChange={handleGuestsChange} placeholder="1" min="1" max="10" required aria-required="true" />
            <label htmlFor="occasion">Occasion</label>
            <select id="occasion" name="occasion" value={formData.occasion} onChange={handleOccasionChange}>
                {occasions.map((occasion) => (
                    <option key={occasion} value={occasion}>
                        {occasion}
                    </option>
                ))}
            </select>

            <button type="submit" aria-label="Submit reservation">Make Your Reservation</button>
        </form>
    )
}

export default BookingForm
