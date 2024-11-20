export function DateUtils() {
    return {
        getUserTimeZone() {
           return new Date().getTimezoneOffset();
        },

        adjustDateToUserTimeZone(date, userTimeZone) {
            return new Date(date.getTime() - (userTimeZone * 60 * 1000));
        },

        convertUnixDateToISOStringFormat(timestamp) {
            return new Date(timestamp).toLocaleString();
        }
    }
}

