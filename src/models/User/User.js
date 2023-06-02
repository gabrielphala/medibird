const Model = require('../Model');

class User extends Model {
    constructor(mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            fullname: { type: String, required: true },
            username: { type: String, required: true },
            email: { type: String },
            password: { type: String },
            createdAt: { type: Date, default: Date.now }
        })

        super(mongoose, 'User', QueryBuilder, schema);
    };

    findUserByUsernameOrEmail (identifier) {
        return this.model.findWithOr({
            condition: [
                { username: identifier },
                { username: identifier }
            ]
        });
    }
};

module.exports = User;