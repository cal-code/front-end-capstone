/* global submitAPI */

import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import ConfirmedBookingPage from './pages/ConfirmedBookingPage';
import { useReducer, useState } from "react";
import { updateTimes, initializeTimes } from './utils/timesReducer';

function Main() {
    const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
    const [bookingData, setBookingData] = useState(null);
    const [submissionError, setSubmissionError] = useState(null);
    const navigate = useNavigate();

    function submitForm(formData) {
        // Use the API to submit the form data
        if (typeof submitAPI !== 'undefined') {
            const success = submitAPI(formData);
            if (success) {
                // Store booking data for confirmation page
                setBookingData(formData);
                setSubmissionError(null);
                // Redirect to the confirmation page
                navigate('/booking-confirmed');
            } else {
                // Handle API failure
                setSubmissionError('Booking failed. Please try again.');
            }
        } else {
            setSubmissionError('Booking service unavailable. Please try again later.');
        }
    }

    return (
        <main>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/booking" element={
                    <BookingPage
                        availableTimes={availableTimes}
                        dispatch={dispatch}
                        submitForm={submitForm}
                        submissionError={submissionError}
                        setSubmissionError={setSubmissionError}
                    />}>
                </Route>
                <Route path="/booking-confirmed" element={<ConfirmedBookingPage bookingData={bookingData} />}></Route>
            </Routes>
        </main>
    )
}

export default Main;
