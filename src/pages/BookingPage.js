import BookingForm from "../BookingForm";

export default function BookingPage({ availableTimes, dispatch }) {
  return (
    <>
        <div className="green-banner">
            <h1>Little Lemon</h1>
            <h2>Reserve a Table</h2>
        </div>
        <BookingForm
            availableTimes={availableTimes}
            dispatch={dispatch}
        />
    </>
  )
}
