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
    const [errors, setErrors] = useState({});

    // HTML attributes should handle most of the validation, but this adds extra checks and error messages
    function validateForm() {
        const newErrors = {};

        // Validate date
        if (!formData.date) {
            newErrors.date = 'Please select a date';
        } else {
            const selectedDate = new Date(formData.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                newErrors.date = 'Cannot book for past dates';
            }
        }

        // Validate guests
        const guestCount = parseInt(formData.guests);
        if (!formData.guests || guestCount < 1) {
            newErrors.guests = 'At least 1 guest required';
        } else if (guestCount > 10) {
            newErrors.guests = 'Maximum 10 guests allowed';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleDateChange(e) {
        const selectedDate = e.target.value;
        setFormData(prev => ({
            ...prev,
            date: selectedDate
        }));
        // Dispatch the date change to update available times
        dispatch({ type: "dateChanged", date: selectedDate });
        // Clear date error
        if (errors.date) {
            setErrors(prev => ({ ...prev, date: '' }));
        }
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
        // Clear guests error
        if (errors.guests) {
            setErrors(prev => ({ ...prev, guests: '' }));
        }
    }

    function handleOccasionChange(e) {
        setFormData(prev => ({
            ...prev,
            occasion: e.target.value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Submit the form data using the API
        submitForm(formData);

        // Clear form after submission
        setFormData({
            date: new Date().toISOString().split('T')[0],
            time: availableTimes[0],
            guests: 1,
            occasion: occasions[0]
        });
        setErrors({});
    }

    return (
        <form aria-label="Table reservation form" onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="res-date">Choose date</label>
                <div className="form-field-error">
                    <input
                        type="date"
                        id="res-date"
                        name="date"
                        value={formData.date}
                        onChange={handleDateChange}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.date}
                        aria-describedby={errors.date ? "date-error" : undefined}
                        min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.date && <span id="date-error" className="form-error">⚠️ {errors.date}</span>}
                </div>
            </div>

            <div className="form-field">
                <label htmlFor="res-time">Choose time</label>
                <select id="res-time" name="time" value={formData.time} onChange={handleTimeChange} required aria-required="true">
                    {availableTimes.map((time) => (
                        <option key={time} value={time}>
                            {time}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-field">
                <label htmlFor="guests">Number of guests</label>
                <div className="form-field-error">
                    <input
                        type="number"
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleGuestsChange}
                        placeholder="1"
                        min="1"
                        max="10"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.guests}
                        aria-describedby={errors.guests ? "guests-error" : undefined}
                    />
                    {errors.guests && <span id="guests-error" className="form-error">{errors.guests}</span>}
                </div>
            </div>

            <div className="form-field">
                <label htmlFor="occasion">Occasion</label>
                <select id="occasion" name="occasion" value={formData.occasion} onChange={handleOccasionChange}>
                    {occasions.map((occasion) => (
                        <option key={occasion} value={occasion}>
                            {occasion}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" aria-label="Submit reservation">Make Your Reservation</button>
        </form>
    )
}

export default BookingForm
