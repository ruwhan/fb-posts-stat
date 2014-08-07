var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var socmed = {
  facebook: {
      clientID: "{YOUR-FB-APP-CLIENT-ID}",
      clientSecret: "{YOUR-FB-APP-CLIENT-SECRET}",
      callbackURL: "/auth/facebook/callback"
  }
}

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'fb-posts-stat'
    },
    port: 3000,
    db: 'mongodb://localhost/fb-posts-stat-development'  },
    socmed: socmed

  test: {
    root: rootPath,
    app: {
      name: 'fb-posts-stat'
    },
    port: 3000,
    db: 'mongodb://localhost/fb-posts-stat-test',
    socmed: socmed

  },

  production: {
    root: rootPath,
    app: {
      name: 'fb-posts-stat'
    },
    port: 3000,
    db: 'mongodb://localhost/fb-posts-stat-production',
    socmed: socmed

  },
};

module.exports = config[env];
