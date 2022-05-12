const express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    path = require('path'),
    Artist = require('../models/artist'),
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
    Song = require('../models/song');

//รับตัวแปรที่ เรารับมจากตัว form
router.post("/new", middleware.isLoggedIn, upload.single('image'), function (req, res) {
    let image = '/upload/' + req.file.filename;
    let newsongname = req.body.newsongname;
    let lyric = req.body.newsonglyrics;
    let dessong = req.body.newsongdescriptsong;
    let artist = req.body.newsongartist;
    let newsong = { image: image, name: newsongname, lyrics: lyric, descriptsong: dessong }
    Artist.findOne().where('artistname').equals(artist).exec(function (err, foundArtist) {
        if (err) {
            console.log(err)
        }
        else {
            Song.create(newsong, function (err, newlyAdded) {
                if (err) {
                    console.log(err);
                } else {
                    foundArtist.song.push(newlyAdded)
                    foundArtist.save();
                    newlyAdded.artist = foundArtist;
                    newlyAdded.save();
                    res.redirect("back"); //redirext is route(เส้นทาง) ไม่ใช่ตำแหน่ง file
                }
            }
            )
        }
    })
});

router.get('/new', function (req, res) {
    Artist.find({}).exec(function (err, allartistname) {
        if (err) {
            console.log(err);
        } else {
            res.render('new.ejs', { artistih: allartistname }); //รายละเอียดเพลง
        }
    });
});

router.get('/detail/:id', function (req, res) {
    Song.findById(req.params.id).populate('artist').exec(function (err, songdetail) {
        if (err) {
            console.log(err);
        } else {
            res.render('songdetail.ejs', { songde: songdetail }); //รายละเอียดเพลง
            // console.log(songdetail.artist);
        }
    });
});

router.get('/edit', function (req, res) {
    Artist.find({}).exec(function (err, allartistname) {
        if (err) {
            console.log(err);
        } else {
            Song.find({}).populate('artist').exec(function (err, allsongsedit){
                if (err) {
                    console.log(err);
                } else {
                    res.render('edit.ejs', { songedit: allsongsedit ,artistedit: allartistname});
                    // console.log(allsongsedit);
                }
            })
        }
    })
})

//Edit 
router.post("/edit/:id", middleware.isLoggedIn, upload.single('image'), function (req, res) {
    let newsongname = req.body.song_edit_name;
    let lyric = req.body.song_edit_lyrics;
    let dessong = req.body.song_edit_description;
    let artist = req.body.song_edit_artist;
    let editsong = {name: newsongname, lyrics: lyric, descriptsong: dessong }
    if(req.file){
        editsong.image = '/upload/' + req.file.filename;
    }
    Artist.findOne().where('artistname').equals(artist).exec(function (err, foundArtist) {
        if (err) {
            console.log(err)
        }
        else {
            Song.findByIdAndUpdate(req.params.id, editsong, function (err, neweditAdded) {
                if (err) {
                    console.log(err);
                } else {
                    neweditAdded.artist = foundArtist;
                    neweditAdded.save();
                    res.redirect("back"); //redirext is route(เส้นทาง) ไม่ใช่ตำแหน่ง file
                }
            })
        }
    })
});

router.delete('/:id', function(req,res){
    Song.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect('/songs/edit');
        } else {
            req.flash('success', "Song had been remove.");
            res.redirect('/songs/edit');
        }
    });
});

module.exports = router;