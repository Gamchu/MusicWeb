const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    profileImage: String,
    favsong: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }],
    favartist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }],
    isAdmin: {type: Boolean, default: false}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema); //export ในรูปของโมเดลให้ file อื่นใช้งานได้