var crypto = require('crypto'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true },
    emails: { type: [String], required: true },
    salt: { type: String },
    password: { type: String },
    providers: { type: [{ name: String, userId: String, currentAccessToken: String }] },
    createdDate: { type: Date, default: Date.now },
    lastModifiedDate: { type: Date, default: Date.now }
});

var hashPassword = function(plain, salt) { cdv 
    return crypto.pbkdf2Sync(plain, salt, 1000, 128).toString('base64');
};

// UserSchema.path('username').validate(function(value) {
//     if (value) {
//         return !(/[!-.]|[:-@]|\/|\\|\^\|/gi.test(value)) && value.length >= 3;
//     };

//     return false;
// }, "Invalid username");

// UserSchema.path('email').validate(function(value) {
//     if (value) {
//         return /\w+\.?\w+@\w+.\w+\.?\w+/gi.test(value);
//     };

//     return false;
// }, "Invalid email");

// UserSchema.path('password').set(function(value) {
//     var me = this;
//     me.salt = crypto.randomBytes(8).toString('base64');
//     return hashPassword(value, me.salt);
// });

UserSchema.static('validateCredentials', function(email, password, callback) {
    var me = this;

    me.findOne({ email: email }, function(err, user) {
        if (err) {
            return callback(err, false);
        };

        if (!user) {
            return callback(null, false);
        };

        var isAuthenticated = user.password == hashPassword(password, user.salt);

        if (callback) {
            callback(null, isAuthenticated, user);
        };
    });
});

var model = mongoose.model('users', UserSchema);

module.exports = model;