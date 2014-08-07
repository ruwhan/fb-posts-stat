var fbRequest = require('../helpers/fbRequest');

var searchProvider = function(currentUser, providerName) {
    var providers = currentUser.providers;
    for (var i = 0; i < providers.length; i++) {
        if (providers[i].name === providerName) {
            return providers[i];
        }
    };
    return false;    
}

module.exports.index = function(req, res) {
    var fbProvider = searchProvider(req.user, 'facebook');
    fbRequest.graph('/me/posts', fbProvider.currentAccessToken, 'v2.0', function(posts) {
        return res.json(posts);
    });
}

module.exports.detail = function(req, res) {
    var fbProvider = searchProvider(req.user, 'facebook');
    var postId = req.params['id'];

    fbRequest.graph('/' + postId, fbProvider.currentAccessToken, 'v2.0', function(post) {
        return res.json(post);
    });
}

module.exports.more = function(req, res) {
    var url = req.body.nextUrl;
    fbRequest.graphGetByUrl(url, function(posts) {
        return res.json(posts);
    });
}