export const isSessionValid = () => {
    const user = localStorage.getItem('user');
    const lastLogin = localStorage.getItem('lastLogin');
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours

    return user && lastLogin && (Date.now() - lastLogin < sessionDuration);
};

export const setUserSession = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('lastLogin', Date.now().toString());
};

export const clearUserSession = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('lastLogin');
};