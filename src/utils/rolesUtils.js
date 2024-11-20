export function RoleUtils() {
    return {
        processRoles(roles) {
            const filteredRoles = filterRoles(roles);
            return formatRoles(filteredRoles);
        }
    }
}

const filterRoles = (roles) => {
    return roles.filter(role => role.startsWith("ROLE_officer-client_"));
};

const formatRoles = (roles) => {
    return roles.map(role => role.replace("ROLE_officer-client_", ""));
};