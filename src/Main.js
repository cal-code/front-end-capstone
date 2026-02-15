import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import { useReducer } from "react";

function Main() {
    const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

    function updateTimes(state, action) {
        // For now, this function just returns the initial times.
        return initializeTimes();
    }

    function initializeTimes() {
        return [
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00"
        ];
    }

    return (
        <main>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/booking" element={
                    <BookingPage
                        availableTimes={availableTimes}
                        dispatch={dispatch}
                    />}>
                </Route>
            </Routes>
        </main>
    )
}

export default Main;
