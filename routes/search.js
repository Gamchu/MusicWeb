const express = require('express'),
    Song = require('../models/song'),
    Artist = require('../models/artist'),
    User = require('../models/user'),
    middleware = require('../middleware'),
    router = express.Router({ mergeParams: true }),
    bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', middleware.isLoggedIn, function (req, res) {
    res.render('search.ejs');
});

router.get("/Allsong/:keyword", function (req, res) {
    let keyword = req.params.keyword;
    Song.find({ name: { $regex: req.params.keyword, $options: "i" } }).populate('artist').exec(function (err, SearchSong) {
        if (err) {
            console.log(err);
        } else {
            Artist.find({ artistname: { $regex: req.params.keyword, $options: "i" } }).exec(function (err, SearchArtist) {
                if (err) {
                    console.log(err);
                } else {
                    if (req.isAuthenticated()) {
                        User.findById(req.user._id, function (err, FoundUser) {
                            if (err) {
                                console.log(err);
                            } else {
                                // console.log(FoundUser.favsong);
                                res.render('searchallsong.ejs', { keyword: keyword, SearchSong: SearchSong, SearchArtist: SearchArtist, usersong: FoundUser.favsong});
                            }
                        });
                    }
                }
            });
        }
    });
});


router.get("/:keyword", function (req, res) {
    let keyword = req.params.keyword;
    Song.find({ name: { $regex: keyword, $options: "i" } }).populate('artist').exec(function (err, SearchSong) {
        if (err) {
            console.log(err);
        } else {
            Song.find({ name: { $regex: keyword, $options: "i" } }).limit(4).populate('artist').exec(function (err, SomeSong) {
                if (err) {
                    console.log(err);
                } else {
                    Artist.find({ artistname: { $regex: keyword, $options: "i" } }).exec(function (err, SearchArtist) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (req.isAuthenticated()) {
                                User.findById(req.user._id, function (err, FoundUser) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        // console.log(FoundUser.favsong);
                                        res.render('showsearch.ejs', { keyword: keyword, SearchSong: SearchSong, SearchArtist: SearchArtist, usersong: FoundUser.favsong, SomeSong: SomeSong });
                                    }
                                });
                            }
                        }
                    });
                }
            });
        };
    });
});

router.post("/", function (req, res) {
    let keyword = req.body.keyword;
    res.redirect("/search/" + keyword);
});

module.exports = router;