module.exports = function(app, passport){

	var home = require('../app/controllers/home');
    
    //home route
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['user_status', 'read_stream'] }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/postLogin', failureRedirect: '/' }));
	app.get('/', home.index);
    app.get('/postLogin', home.postLogin);

    // Facebook posts route
    var fbPosts = require('../app/controllers/fbPosts');
    app.get('/posts/fb', fbPosts.index);
    app.get('/posts/fb/:id', fbPosts.detail);
    app.post('/posts/more', fbPosts.more);
};
