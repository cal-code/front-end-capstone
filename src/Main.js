/* global submitAPI */

import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import ConfirmedBookingPage from './pages/ConfirmedBookingPage';
import { useReducer } from "react";
import { updateTimes, initializeTimes } from './utils/timesReducer';

function Main() {
    const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
    const navigate = useNavigate();
    function submitForm(formData) {
        // Use the API to submit the form data
        if (typeof submitAPI !== 'undefined') {
            const success = submitAPI(formData);
            if (success) {
                // Redirect to the confirmation page
                navigate('/booking-confirmed');
            }
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
                    />}>
                </Route>
                <Route path="/booking-confirmed" element={<ConfirmedBookingPage />}></Route>
            </Routes>
        </main>
    )
}

export default Main;
