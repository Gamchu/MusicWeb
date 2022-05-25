const express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    Song = require('../models/song'),
    Artist = require('../models/artist'),
    passport = require('passport'),
    // facebookStrategy = require('passport-facebook').Strategy
    middleware = require('../middleware');

//ทุกคนที่เข้ามาจะเข้ามาหน้านี้
router.get("/", function (req, res) {
    Song.find({}).populate('artist').exec(function (err, allsong) {
        if (err) {
            console.log(err);
        } else {
            Artist.find({}).exec(function (err, allartist) {
                if (err) {
                    console.log(err);
                } else {
                    Artist.aggregate([{ $sample: { size: 5 } }]).exec(function (err, someartist) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (req.isAuthenticated()) {
                                User.findById(req.user._id, function (err, founduser) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.render("landing.ejs", { otherartist: someartist, fsuser: founduser.favsong, fauser: founduser.favartist, allsong: allsong, allartist: allartist });
                                    }
                                });
                            } else {
                                res.render("landing.ejs", { otherartist: someartist, allsong: allsong, allartist: allartist });
                            }
                        }
                    });
                }
            });
        }
    });
});

//login and register part
router.get('/login-register', function (req, res) {
    res.render('login-register.ejs');
});

router.post('/login-register/register', function (req, res) {
    let newUser = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        // password: req.body.password
    });
    if (req.body.adminCode === 'Admin') {
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/login-register');
        } else {
            passport.authenticate('local')(req, res, function () {
                req.flash('success', user.username + ', Welcome to GracePrint');
                res.redirect('/');
            });
        }
    });
});

router.post('/login-register/login', passport.authenticate('local',
    {   //ส่วนตรงกลางที่จะทำงานก่อนการเกิด call back function ETC. check
        successRedirect: '/',
        failureRedirect: '/login-register',
        successFlash: true,
        failureFlash: true,
        successFlash: 'Successfully login',
        failureFlash: 'Invalid username or password'
    }), function (req, res) {
    });

router.get('/logout', function (req, res) {
    req.logOut();
    req.flash('success', 'Log you out successfully');
    res.redirect('/');
})

//fav song artist
router.get('/follow', middleware.isLoggedIn, function (req, res) {
    User.findById(req.user._id).populate('favsong favartist').exec(function (err, Foundusersong) {
        if (err) {
            console.log(err);
        } else {
            Song.find({ _id: { $in: Foundusersong.favsong } }).populate('artist').exec(function (err, followlikesong) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('Follow.ejs', { followlikesong: followlikesong, followlikeartist: Foundusersong.favartist });
                }
            })
        }
    })
});

router.post('/follow/song/:id', middleware.isLoggedIn, function (req, res) {
    User.findByIdAndUpdate(req.user._id, { $push: { favsong: req.params.id } }, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('back');
        }
    })
});

router.post('/follow/artist/:id', middleware.isLoggedIn, function (req, res) {
    User.findByIdAndUpdate(req.user._id, { $push: { favartist: req.params.id } }, function (err) {
        if (err) {
            console.log(err);
        } else {
            // console.log("favartist");
            res.redirect('back');
        }
    })
});

router.post('/unfollow/song/:id', middleware.isLoggedIn, function (req, res) {
    User.findByIdAndUpdate(req.user._id, { $pull: { favsong: req.params.id } }, function (err) {
        if (err) {
            console.log(err);
        } else {
            // console.log("favartist");
            res.redirect('back');
        }
    })
});

router.post('/unfollow/artist/:id', middleware.isLoggedIn, function (req, res) {
    User.findByIdAndUpdate(req.user._id, { $pull: { favartist: req.params.id } }, function (err) {
        if (err) {
            console.log(err);
        } else {
            // console.log("favartist");
            res.redirect('back');
        }
    })
});

module.exports = router;