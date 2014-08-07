var request = require('supertest'),
    should = require('chai').should(),
    app = require('../../app'),
    agent = request.agent(app);