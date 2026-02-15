import { render, screen, fireEvent, within } from "@testing-library/react";
import BookingForm from './BookingForm';

describe('BookingForm', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const availableTimes = ["17:00", "18:00", "19:00", "20:00"];

    beforeEach(() => {
        mockDispatch.mockClear();
        mockSubmitForm.mockClear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Renders the BookingForm heading', () => {
        render(<BookingForm availableTimes={availableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
        const makeReservationElement = screen.getByText("Make Your Reservation");
        expect(makeReservationElement).toBeInTheDocument();
    });

    test('Form can be submitted', () => {
        render(<BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />);
        const submitButton = screen.getByRole('button', { name: /submit reservation/i });
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveAttribute('type', 'submit');
    });

    test('All form fields are rendered with correct labels', () => {
        render(<BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />);

        expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    });

    test('Date input accepts user input and dispatches action', () => {
        render(<BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />);
        const dateInput = screen.getByLabelText(/choose date/i);

        fireEvent.change(dateInput, { target: { value: '2026-02-20' } });

        expect(dateInput.value).toBe('2026-02-20');
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'dateChanged',
            date: '2026-02-20'
        });
    });

    test('Time select accepts user input', () => {
        render(<BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />);
        const timeSelect = screen.getByLabelText(/choose time/i);

        fireEvent.change(timeSelect, { target: { value: '19:00' } });

        expect(timeSelect.value).toBe('19:00');
    });

    test('Guests input accepts valid numbers within range', () => {
        render(<BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />);
        const guestsInput = screen.getByLabelText(/number of guests/i);

        fireEvent.change(guestsInput, { target: { value: '5' } });

        expect(guestsInput.value).toBe('5');
    });

    test('Occasion select accepts user input', () => {
        render(<BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />);
        const occasionSelect = screen.getByLabelText(/occasion/i);

        fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });

        expect(occasionSelect.value).toBe('Birthday');
    });

    test('All available times are rendered as options', () => {
        render(<BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />);
        const timeSelect = screen.getByLabelText(/choose time/i);
        const options = within(timeSelect).getAllByRole('option');

        expect(options).toHaveLength(availableTimes.length);
        availableTimes.forEach((time, index) => {
            expect(options[index]).toHaveValue(time);
        });
    });

    test('All occasion options are rendered', () => {
        render(<BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />);
        const occasionSelect = screen.getByLabelText(/occasion/i);
        const options = within(occasionSelect).getAllByRole('option');

        expect(options).toHaveLength(3);
        expect(options[0]).toHaveValue('None');
        expect(options[1]).toHaveValue('Birthday');
        expect(options[2]).toHaveValue('Anniversary');
    });

    test('Form has required fields marked correctly', () => {
        render(<BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />);

        const dateInput = screen.getByLabelText(/choose date/i);
        const timeSelect = screen.getByLabelText(/choose time/i);
        const guestsInput = screen.getByLabelText(/number of guests/i);

        expect(dateInput).toBeRequired();
        expect(timeSelect).toBeRequired();
        expect(guestsInput).toBeRequired();
    });

    test('Guests input has correct min and max attributes', () => {
        render(<BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />);
        const guestsInput = screen.getByLabelText(/number of guests/i);

        expect(guestsInput).toHaveAttribute('min', '1');
        expect(guestsInput).toHaveAttribute('max', '10');
    });

    test('Form fields have proper ARIA labels', () => {
        render(<BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />);
        const form = screen.getByRole('form', { name: /table reservation form/i });

        expect(form).toBeInTheDocument();
    });

    test('Form submission calls submitForm callback with form data', () => {
        render(<BookingForm availableTimes={availableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);

        const dateInput = screen.getByLabelText(/choose date/i);
        const guestsInput = screen.getByLabelText(/number of guests/i);
        const submitButton = screen.getByRole('button', { name: /submit reservation/i });

        // Fill out form
        fireEvent.change(dateInput, { target: { value: '2026-03-15' } });
        fireEvent.change(guestsInput, { target: { value: '4' } });

        // Submit form
        fireEvent.click(submitButton);

        // Verify submitForm callback was called with form data
        expect(mockSubmitForm).toHaveBeenCalledTimes(1);
        expect(mockSubmitForm).toHaveBeenCalledWith(
            expect.objectContaining({
                date: '2026-03-15',
                guests: '4'
            })
        );
    });
});