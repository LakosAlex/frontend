import { defineStore } from 'pinia';
import { AuthorizationApi } from 'src/api/authorizationApi';
import { RoleUtils } from 'src/utils/rolesUtils';
import { UserApi } from 'src/api/userApi';

const authorizationApi = new AuthorizationApi();
const roleUtils = new RoleUtils();
const userApi = UserApi();

export const useUserSessionStore = defineStore('userSessionStore', {
    state: () => ({
        fullName: "",
        email: "",
        phoneNumber: "",
        department: "",
        roles: [],
        profilePicture: ""
    }),

    actions: {
        async getLoggedInUserInfoAndSetStates() {
            const userInfo = await authorizationApi.getLoggedInUserInfo();
            const userRoles = await authorizationApi.getLoggedInUserRoles();
            await this.refreshProfilePicture();
            this.setStates(userInfo, userRoles);
        },

        setStates(info, roles, userProfilePicture) {
            this.fullName = info.fullName;
            this.email = info.email;
            this.phoneNumber = info.phoneNumber;
            this.department = info.department.departmentName;
            this.roles = roleUtils.processRoles(roles);
            console.log(this.roles);
        },

        async logoutUserAndRedirectToLoginPage() {
            await authorizationApi.logout();
            await authorizationApi.getLoggedInUserInfo();
        },

        async refreshProfilePicture() {
            this.profilePicture = await userApi.getLoggedInUserProfilePicture();
        },

        userHasRole(role) {
            return this.roles.includes(role);
        },

        async getUserById(userId) {
            return await userApi.getUserByUserId(userId);
        }
    }
})