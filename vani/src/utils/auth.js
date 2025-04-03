const SESSION_KEY = "user_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const isSessionValid = () => {
    const session = localStorage.getItem(SESSION_KEY);
    
    if (!session) return false; // No session stored

    try {
        const { lastLogin, credentials } = JSON.parse(session);

        if (Date.now() - lastLogin < SESSION_DURATION) {
            // Session is still valid → update lastLogin timestamp
            localStorage.setItem(
                SESSION_KEY,
                JSON.stringify({ lastLogin: Date.now(), credentials })
            );
            return true;
        } else {
            // Session expired → remove credentials
            localStorage.removeItem(SESSION_KEY);
            return false;
        }
    } catch (error) {
        console.error("Invalid session data:", error);
        localStorage.removeItem(SESSION_KEY);
        return false;
    }
};

export const setUserSession = (userData) => {
    const sessionData = {
        lastLogin: Date.now(),
        credentials: userData, // Storing entire credentials object
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
};

export const clearUserSession = () => {
    localStorage.removeItem(SESSION_KEY);
};
