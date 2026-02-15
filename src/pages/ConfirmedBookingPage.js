import { useNavigate } from "react-router-dom";

export default function ConfirmedBookingPage() {
    const navigate = useNavigate();
  return (
    <>
        <div className="green-banner">
            <h1>Little Lemon</h1>
            <h2>Table Reservation Confirmed</h2>
        </div>
        <p className="confirmation-message">Thank you for your reservation! We look forward to welcoming you to Little Lemon.</p>
        <button onClick={() => navigate('/')} aria-label="Return to homepage">Return to Homepage</button>
    </>
  )
}
