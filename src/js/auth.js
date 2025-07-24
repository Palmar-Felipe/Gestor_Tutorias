import CryptoJS from 'crypto-js';
import { renderStart } from '../views/start';

const USER_KEY = 'user';
const TOKEN_KEY = 'token';
const SECRET = 'riwi.doe2';

export const auth = {
    login(token, user) {

        // Encript and save
        const encryptedToken = CryptoJS.AES.encrypt(token, SECRET).toString();
        const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), SECRET).toString();

        localStorage.setItem(TOKEN_KEY, encryptedToken);
        localStorage.setItem(USER_KEY, encryptedUser);
    },

    logout() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        renderStart();
    },

    isAuthenticated() {
        return !!localStorage.getItem(USER_KEY);
    },

    getUser() {
        const encrypted = localStorage.getItem(USER_KEY);
        if (!encrypted) return null;

        try {
            const bytes = CryptoJS.AES.decrypt(encrypted, SECRET);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (e) {
            return null;
        }
    },

    getToken() {
        const encrypted = localStorage.getItem(TOKEN_KEY);
        if (!encrypted) return null;

        try {
            const bytes = CryptoJS.AES.decrypt(encrypted, SECRET);
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (e) {
            return null;
        }
    }
};