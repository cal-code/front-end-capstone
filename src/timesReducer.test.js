import { initializeTimes, updateTimes } from './utils/timesReducer';

describe('Main component reducer functions', () => {
    // Mock the global fetchAPI function
    beforeEach(() => {
        global.window.fetchAPI = jest.fn((date) => {
            return [
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00",
                "22:00"
            ];
        });
    });

    afterEach(() => {
        delete global.window.fetchAPI;
    });

    test('initializeTimes returns the correct expected value', () => {
        const expectedTimes = [
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00"
        ];

        const result = initializeTimes();

        expect(result).toEqual(expectedTimes);
        expect(result).toHaveLength(6);
        expect(window.fetchAPI).toHaveBeenCalledTimes(1);
    });

    test('updateTimes returns the same value that is provided in the state when fetchAPI is called', () => {
        const mockState = [
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00"
        ];
        const mockAction = { type: 'dateChanged', date: '2026-02-15' };

        const result = updateTimes(mockState, mockAction);

        expect(result).toEqual(mockState);
        expect(window.fetchAPI).toHaveBeenCalledTimes(1);
        expect(window.fetchAPI).toHaveBeenCalledWith(new Date('2026-02-15'));
    });
});
