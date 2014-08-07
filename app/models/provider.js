var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProviderSchema = new Schema({
    providerName: { type: String },
    providerUserId: { type: String },
    _user: { type: Schema.Types.ObjectId, ref: 'users' }
});

var providerModel = mongoose.model('providers', ProviderSchema);

module.exports = providerModel;