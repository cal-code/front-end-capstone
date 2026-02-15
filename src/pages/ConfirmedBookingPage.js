import { useNavigate } from "react-router-dom";

export default function ConfirmedBookingPage({ bookingData }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="green-banner">
                <h2>Little Lemon</h2>
                <h3>Booking Confirmed!</h3>
            </div>
            <div className="confirmation-message">
                <p>Thank you for your reservation! We look forward to welcoming you to Little Lemon.</p>
                {bookingData && (
                    <div className="booking-details">
                        <h4>Reservation Details</h4>
                        <p><strong>Date:</strong> {new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><strong>Time:</strong> {bookingData.time}</p>
                        <p><strong>Guests:</strong> {bookingData.guests}</p>
                        {bookingData.occasion !== 'None' && <p><strong>Occasion:</strong> {bookingData.occasion}</p>}
                    </div>
                )}
            </div>
            <div className="confirmation-actions">
                <button onClick={() => navigate('/')} aria-label="Return to homepage">Return to Homepage</button>
                <button onClick={() => navigate('/booking')} aria-label="Make another reservation" className="secondary-button">Make Another Reservation</button>
            </div>
        </>
    )
}
