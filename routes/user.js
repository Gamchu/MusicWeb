const express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    path = require('path'),
    storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/upload/');
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }),
    imageFilter = function (req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
            return callback(new Error('Only jpg, jpeg, png and gif.'), false);
        }
        callback(null, true);
    },
    upload = multer({ storage: storage, fileFilter: imageFilter }),
    User = require('../models/user'),
    Song = require('../models/song'),
    Artist = require('../models/artist'),
    passport = require('passport'),
    middleware = require('../middleware');

router.get("/:id", function (req, res) {
    User.findById(req.params.id).populate('favsong').exec(function (err, userdetail) {
        if (err) {
            console.log(err);
        } else {
            res.render('profile/profile.ejs', { Userde: userdetail, favsong: userdetail.favsong });
        }
    });
});

router.post("/edit/:id", middleware.isLoggedIn, upload.single('image'), function (req, res) {
    let image = '/upload/' + req.file.filename;
    let firstname = req.body.first_name;
    let lastname = req.body.last_name;
    let email = req.body.email;
    let edituser = { image: image, firstname: firstname, lastname: lastname, email: email }
    if (req.file) {
        edituser.image = '/upload/' + req.file.filename;
    }
    User.findById(req.params.id).exec(function (err, Edituser) {
        if (err) {
            console.log(err)
        } else {
            User.findByIdAndUpdate(req.params.id, edituser, function (err, neweditAdded) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("back"); //redirext is route(เส้นทาง) ไม่ใช่ตำแหน่ง file
                }
            })
        }
    });
});

module.exports = router;