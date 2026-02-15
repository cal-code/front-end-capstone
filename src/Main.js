import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import { useReducer } from "react";
import { updateTimes, initializeTimes } from './utils/timesReducer';

function Main() {
    const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

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
