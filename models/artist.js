const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    artistname: String,
    descriptartist: String,
    image: String,
    song: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Song'
    }]
});

module.exports = mongoose.model('Artist', artistSchema); //export ในรูปของโมเดลให้ file อื่นใช้งานได้