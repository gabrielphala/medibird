const { hash } = require("../helpers/Hasher");
const Admin = require("../models/Admin");

module.exports = () => {
    (async () => {
        if (await Admin.exists({ email: 'joe@medibird.com' })) return;

        await Admin.add({
            firstname: 'John',
            lastname: 'Doe',
            email: 'joe@medibird.com',
            password: await hash('Password123')
        });
    })()
}