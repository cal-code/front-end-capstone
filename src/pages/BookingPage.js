import BookingForm from "../BookingForm";

export default function BookingPage({ availableTimes, dispatch, submitForm, submissionError, setSubmissionError }) {
  return (
    <>
        <div className="green-banner">
            <h2>Little Lemon</h2>
            <h3>Reserve a Table</h3>
        </div>
        {submissionError && (
            <div className="error-message" role="alert">
                <span>{submissionError}</span>
                <button onClick={() => setSubmissionError(null)} aria-label="Close error message">x</button>
            </div>
        )}
        <BookingForm
            availableTimes={availableTimes}
            dispatch={dispatch}
            submitForm={submitForm}
        />
    </>
  )
}
