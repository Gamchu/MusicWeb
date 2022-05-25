const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    name: String,
    descriptsong:String,
    image: String,
    lyrics: String,
    mp3: String,
    date: {type: Date, default:new Date()},
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Artist'
    }
});

module.exports = mongoose.model('Song', songSchema); //export ในรูปของโมเดลให้ file อื่นใช้งานได้