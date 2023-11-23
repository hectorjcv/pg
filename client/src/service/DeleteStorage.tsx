export const DeleteStorage = () => {
    
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('session');
    
    return null;
}