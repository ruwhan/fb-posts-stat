var mongoose = require('mongoose');

var Repository = function(modelName) {
    var me = this;

    me.Model = require('../models/' + modelName);

    me.findById = function(id, callback) {
        me.Model.findById(id, function(err, entity) {
            if (err) {
                console.error(err);
            };

            callback(err, entity);
        });
    }

    me.findOne = function(params, callback) {

        me.Model.findOne(params, function(err, entity) {
            if (err) {
                console.error(err.message);
            };

            callback(err, entity);
        });
    }

    me.findAll = function(callback) {
        me.Model.find({}).exec(function(err, entities) {
            if (err) {
                console.log(err.message);
            };

            callback(err, entities);
        });
    }

    me.findMany = function(params, lean, callback) {

        if (typeof lean === "function") {
            callback = lean;
        };

        if (lean === true) {

            me.Model.find(params).lean().exec(function(err, entities) {
                if (err) {
                    console.error(err.message);
                };

                callback(err, entities);
            });  
        }
        else {
            me.Model.find(params).exec(function(err, entities) {
                if (err) {
                    console.error(err.message);
                };

                callback(err, entities);
            });
        }
    }

    me.save = function(obj, callback) {
        var entity = new me.Model(obj);
        entity.save(function(err, entity, numberAffected) {
            if (err) {
                callback(err, entity, numberAffected);
                return console.error(err.message);
            };

            callback(err, entity, numberAffected);
        });
    }

    me.update = function(modifiedEntity, callback) {

        me.Model.findOne({ "_id": modifiedEntity._id }, function(err, entity) {
            if (err) {
                return console.error(err);
            };

            for (key in modifiedEntity) {
                entity[key] = modifiedEntity[key];
            };

            entity.increment();
            entity.save(callback);
        });
    }

    me.remove = function(entity, callback) {
        me.Model.findOne({ "_id": entity._id }, function(err, entity) {
            if (err) {
                return console.error(err);
            };

            entity.remove(callback);
        });
    }
}

Repository.GetModel = function(modelName) {
    return mongoose.model(modelName);
}

module.exports.Repository = Repository;