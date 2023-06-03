const Admin = require("../models/Admin")

const jwt = require("../helpers/Jwt");

const v = require("../helpers/Validation");
const { isSame } = require("../helpers/Hasher");

module.exports = class AdminService {
    static async signIn (res_wrap, body) {
        try {
            v.validate({
                'Email address': { value: body.email, min: 3, max: 50 },
                'Password': { value: body.password }
            });

            const adminDetails = await Admin.getByEmail(body.email);

            if (!adminDetails) throw 'Email address or Password is incorrect';

            if (!isSame(adminDetails.password, body.password)) throw 'Email address or Password is incorrect';

            const tokens = jwt.get_cookie_tokens(adminDetails.toJSON());
            res_wrap.set_cookie('med_admin', tokens);

            res_wrap.successful = true;
        } catch (e) { throw e; }

        return res_wrap;
    }
}