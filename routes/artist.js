const express = require('express'),
    multer = require('multer'),
    router = express.Router(),
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
    middleware = require('../middleware'),
    Song = require('../models/song'),
    Artist = require('../models/artist');

router.get('/new', function (req, res) {
    res.render('newartist.ejs');
})

//รับตัวแปรที่ เรารับมจากตัว form
router.post("/new", middleware.isLoggedIn, upload.single('image'), function (req, res) {
    let image;
    if (req.file) { image = '/upload/' + req.file.filename; }
    let newartistname = req.body.nameartist;
    let descriptartist = req.body.descriptartist;
    let newArtist = { image: image, artistname: newartistname, descriptartist: descriptartist }
    Artist.create(newArtist, function (err, newlyAdded) {
        if (err) {
            console.log(err);
        } else {
            newlyAdded.save();
            res.redirect("back"); //redirext is route(เส้นทาง) ไม่ใช่ตำแหน่ง file
        }
    })
});

router.get('/detail/:id', function (req, res) {
    Artist.findById(req.params.id).exec(function (err, artistdetail) {
        if (err) {
            console.log(err);
        } else {
            res.render('artistdetail.ejs', { artistde: artistdetail }); //รายละเอียด artist
            // console.log(songdetail.artist);
        }
    });
});

//Edit 
router.post("/edit/:id", middleware.isLoggedIn, upload.single('image'), function (req, res) {
    let newartistnew = req.body.artist_edit_name;
    let dessong = req.body.artist_edit_description;
    let image;
    if (req.file) {
        image = '/upload/' + req.file.filename;
    }
    let editartist = { artistname: newartistnew, descriptartist: dessong, image: image }
    Artist.findByIdAndUpdate(req.params.id, editartist, function (err, updateartist) {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect("back"); //redirext is route(เส้นทาง) ไม่ใช่ตำแหน่ง file
        }
    });
});

router.delete('/:id', function (req, res) {
    Artist.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            res.redirect('back');
        } else {
            Song.deleteMany().where('artist').equals(req.params.id).exec(function (err){
                if (err) {
                    console.log(err);
                } else {
                    req.flash('success', "Artist had been remove.");
                    res.redirect('back');
                }
            })
        }
    });
});


module.exports = router;