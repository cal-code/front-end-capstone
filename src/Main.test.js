import { initializeTimes, updateTimes } from './utils/timesReducer';

describe('Main component reducer functions', () => {
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
    });

    // This test is based on the current implementation of updateTimes, which simply returns the state that is provided to it. In the future, if the implementation of updateTimes is changed to actually update the times based on the action provided, this test will need to be updated accordingly.
    test('updateTimes returns the same value that is provided in the state', () => {
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
    });
});
