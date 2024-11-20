import { defineStore } from 'pinia';
import { RequestApi } from 'src/api/requestApi';
import { DateUtils } from 'src/utils/dateUtils';

const requestApi = new RequestApi();
const dateUtils = new DateUtils();

export const useRequestStore = defineStore('useRequestStore', {
    state: () => ({
        userRequests: [],
        allRequests: [],
        allRequesters: [],
        isRequestCreationModalVisible: false,
        isRequestCreationModalConflictMessageVisible: false
    }),

    actions: {
        async createUserRequest(date, reason) {
            const userTimeZone = dateUtils.getUserTimeZone();
            const adjustedDate = dateUtils.adjustDateToUserTimeZone(date, userTimeZone);

            const adjustedDateString = adjustedDate.toISOString({ timeZone: 'auto' }).substr(0, 10);
            const request = {
                requestedDay: adjustedDateString,
                reason: reason
            }
            const response = await requestApi.createRequest(request);
            console.log(response);
            console.log("STORE WAS CALLED")
            return response;
        },

        async getUserRequests() {
            return await requestApi.getRequests();
        },

        async fetchUserRequests() {
            this.userRequests = await requestApi.getRequests();
        },

        async cancelRequest(requestId) {
            return await requestApi.deleteRequest(requestId);
        },

        toggleRequestModalVisibility() {
            this.isRequestCreationModalVisible = !this.isRequestCreationModalVisible;
        },

        showRequestModalConflictMessageVisibility() {
            this.isRequestCreationModalConflictMessageVisible = true;
        },

        hideRequestModalConflictMessageVisibility() {
            this.isRequestCreationModalConflictMessageVisible = false;
        },

        async fetchAllRequests() {
            const response = await requestApi.getAllRequests();
            this.allRequests = response.homeOfficeRequestEntityList;
            this.allRequesters = response.requesterList;
        },

        getRequesterNameById(userId) {
            const requester = this.allRequesters.find(requester => requester.id === userId);
            return requester.fullName;
        },

        getRequesterEmailById(userId) {
            const requester = this.allRequesters.find(requester => requester.id === userId);
            return requester.email;
        },

        async acceptRequest(requestId) {
            return await requestApi.acceptRequest(requestId);
        },

        async rejectRequest(requestId) {
            return await requestApi.rejectRequest(requestId);
        }
    }
})