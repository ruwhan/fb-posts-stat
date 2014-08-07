
var FacebookStrategy = require('passport-facebook').Strategy,
    User = require('../app/models/user');

module.exports = function(passport, config) {
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
        // clientID: "782234481792343",
        // clientSecret: "de48e94254f83af7ceb121311e8e6f00",
        // callbackURL: "/auth/facebook/callback"
    }, 
    function(accessToken, refreshToken, profile, done) {
        User.findOne({ "providers.name": "facebook", "providers.userId": profile.id }, function(err, user) {
                if (err) {
                    console.error(err);
                    return done(err, null);
                };

                if (!user) {
                    var newUser = new User({
                        username: profile.username,
                        emails: profile._json.email,
                        providers: [{ name: 'facebook', userId: profile.id, currentAccessToken: accessToken }]
                    });

                    newUser.save(function(err, user, docAffected) {
                        if (err) {
                            return done(err);
                        };

                        return done(null, user);
                    });
                }
                else {
                    return done(null, user);
                }

                if (user) {
                    for (var i = 0; i < user.providers.length; i++) {

                        if (user.providers[i].name === "facebook" && user.providers[i].currentAccessToken !== accessToken) {
                            User.update(
                                { "providers._id": user.providers[i]._id }, 
                                { "providers.$.currentAccessToken": accessToken, "lastModifiedDate": Date.now }, 
                                function(err, updatedUser) {
                                    if (err) {
                                        console.error(err);
                                        return done(err, null);
                                    };
                                    return done(null, updatedUser);
                                });

                            break;
                        };
                    };
                };

                // return done(null, user);
            });

        // done(null, profile);
    }));

    passport.serializeUser(function(user, done) {
        // console.log("serializing user");
        // console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            // console.log("deserializing user");
            // console.log(user);
            done(err, user);
        });
    });
}