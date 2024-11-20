import { defineStore } from 'pinia';
import { DateUtils } from 'src/utils/dateUtils';

const dateUtils = DateUtils();

export const useDateStore = defineStore('dateStore', {
    state: () => ({
        choosenDate: "",
    }),

    actions: {
        setChoosenDate(date) {
            const userTimeZone = dateUtils.getUserTimeZone();
            const adjustedDate = dateUtils.adjustDateToUserTimeZone(date, userTimeZone);

            this.choosenDate = adjustedDate.toISOString({ timeZone: 'auto' }).substr(0, 10);
        }
    },
});