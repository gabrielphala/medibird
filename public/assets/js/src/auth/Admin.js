import fetch from "../helpers/fetch.js";
import { showError } from "../helpers/error.js";

export default class Disease {
    static async signIn () {
        const response = await fetch('/a/sign-in', {
            body: {
                email: $('#email-address').val(),
                password: $('#password').val()
            }
        })

        if (response.successful) {
            return location.href = '/a/symptoms'
        }

        showError('auth', response.error);
    }
}