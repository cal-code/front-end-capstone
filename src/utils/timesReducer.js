/* global fetchAPI */

export function updateTimes(state, action) {
    if (action.type === 'dateChanged' && action.date) {
        // Use fetchAPI to get available times for the selected date
        const response = typeof fetchAPI !== 'undefined' ? fetchAPI(new Date(action.date)) : state;
        return response;
    }
    return state;
}

export function initializeTimes() {
    // Get today's date and fetch available times for it
    const today = new Date();
    if (typeof fetchAPI !== 'undefined') {
        return fetchAPI(today);
    }
    else {
        return [];
    }
}