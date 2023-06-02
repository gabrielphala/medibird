const mongoose = require('mongoose');

mongoose.connect(decodeURIComponent(process.env.DATABASE_URL), {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', error => console.log('DB Err: ' + error));

module.exports = Object.freeze({
    db: mongoose.connection,
    mongoose: mongoose
}); 