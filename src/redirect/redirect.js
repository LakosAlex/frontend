import useSessionStore from "src/store/sessionStore";

export function isLoggedIn(to, from, next) {
    const sessionStore = useSessionStore();
    sessionStore.loadFromLocalStorage();
    const isLoggedIn = sessionStore.username !== "";
    if (isLoggedIn) {
        // User is logged in, redirect to the shell page
        next({ name: 'shell' });
    } else {
        // User is not logged in, continue to the login page
        next();
    }
}

export function isLoggedOut(to, from, next) {
    const sessionStore = useSessionStore();
    sessionStore.loadFromLocalStorage();
    const isLoggedOut = sessionStore.username === "";
    if (isLoggedOut) {
        // User is logged in, redirect to the shell page
        next({ name: 'home' });
    } else {
        // User is not logged in, continue to the login page
        next();
    }
}
