const express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    Song = require('../models/song'),
    Artist = require('../models/artist'),
    passport = require('passport');

router.get('/add/favsong/:song_id', function(req, res){
    
})

module.exports = router;