import fetch from "../helpers/fetch.js";
import { showError } from "../helpers/error.js";

export default class Disease {
    static async signUp () {
        const response = await fetch('/user/sign-up', {
            body: {
                fullname: $('#fullname').val(),
                username: $('#username').val(),
                email: $('#email-address').val(),
                password: $('#password').val(),
                passwordAgain: $('#password-again').val()
            }
        })

        if (response.successful) {
            return location.href = '/'
        }

        showError('auth', response.error);
    }
    
    static async signIn () {
        const response = await fetch('/user/sign-in', {
            body: {
                identifier: $('#identifier').val(),
                password: $('#password').val()
            }
        })

        if (response.successful) {
            return location.href = '/'
        }

        showError('auth', response.error);
    }
}