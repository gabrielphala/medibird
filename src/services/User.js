const User = require("../models/User")

const jwt = require("../helpers/Jwt");

const v = require("../helpers/Validation");
const { hash, isSame } = require("../helpers/Hasher");

module.exports = class UserService {
    static async signUp (res_wrap, body) {
        try {
            v.validate({
                'Full name': { value: body.fullname, min: 5, max: 50 },
                'Username': { value: body.username, min: 3, max: 16 },
                'Email address': { value: body.email, min: 3, max: 30 },
                'Password': { value: body.password, min: 8, max: 16 },
                'Password confirmation': { value: body.passwordAgain, is: ['Password'] }
            });

            if (await User.exists({ username: body.username })) throw 'Username already exists!';

            else if (await User.exists({ email: body.email })) throw 'Email address already exists!';

            const newUser = await User.add({
                fullname: body.fullname,
                username: body.username,
                email: body.email,
                password: await hash(body.password)
            })

            delete newUser.password;

            const tokens = jwt.get_cookie_tokens(newUser.toJSON());
            res_wrap.set_cookie('med_user', tokens);

            res_wrap.successful = true;
        } catch (e) { throw e; }

        return res_wrap;
    }

    static async signIn (res_wrap, body) {
        try {
            v.validate({
                'Username or Email address': { value: body.identifier, min: 3, max: 50 },
                'Password': { value: body.password }
            });

            const userDetails = await User.findUserByUsernameOrEmail(body.identifier);

            if (!userDetails) throw 'Username / Email address or Password is incorrect';

            if (!isSame(userDetails.password, body.password)) throw 'Username / Email address or Password is incorrect';

            const tokens = jwt.get_cookie_tokens(userDetails.toJSON());
            res_wrap.set_cookie('med_user', tokens);

            res_wrap.successful = true;
        } catch (e) { throw e; }

        return res_wrap;
    }
}