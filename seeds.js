const mongoose = require('mongoose'),
    Song = require('./models/song'),
    Artist = require('./models/artist');

const SongDB1 = [
    {
        name: "Happier Than Ever",
        image: "/apicture/Happier_Than_Ever.jpg",
        lyrics: `When I'm away from you
        I'm happier than ever
        Wish I could explain it better
        I wish it wasn't true
        
        Give me a day or two
        To think of something clever
        To write myself a letter
        To tell me what to do
        
        Do you read my interviews?
        Or do you skip my avenue?
        When you said you were passing through
        Was I even on your way?
        
        I knew when I asked you to
        Be cool about what I was telling you
        You'd do the opposite of what you said you'd do
        And I'd end up more afraid
        
        Don't say it isn't fair
        You clearly weren't aware that you
        Made me miserable
        So if you really wanna know
        
        When I'm away from you
        I'm happier than ever
        Wish I could explain it better
        I wish it wasn't true
        
        You call me again, drunk in your Benz
        Driving home under the influence
        You scared me to death but I'm wasting my breath
        'Cause you only listen to your fucking friends
        
        I don't relate to you
        I don't relate to you, no
        'Cause I'd never treat me this shitty
        You made me hate this city
        
        And I don't talk shit about you on the internet
        Never told anyone anything bad
        'Cause that shit's embarrassing, you were my everything
        And all that you did was make me fucking sad
        
        So don't waste the time I don't have
        And don't try to make me feel bad
        
        I could talk about every time that you showed up on time
        But I'd have an empty line 'cause you never did
        Never paid any mind to my mother or friends so I
        Shut 'em all out for you 'cause I was a kid
        
        You ruined everything good
        Always said you were misunderstood
        Made all my moments your own
        Just fucking leave me alone`
    },
    {
        name: "everything i want",
        image: "/apicture/everything_i_wanted.jpg",
        lyrics: ""
    },
    {
        name: "bad guy",
        image: "/apicture/bad_guy.png",
        lyrics: ""
    }
];

const ArtistDB = [
    {
        artistname: "Jessie J",
        descriptartist: "This is Jessie J",
        image: "/apicture/Jesssie_J3.jpg"
    },
    {
        artistname: "Bruno Mars",
        descriptartist: "This is Bruno mars",
        image: "/apicture/Bruno_mars.png"
    },
    {
        artistname: "Billie Ellish",
        descriptartist: "This is Billie Ellish",
        image: "/apicture/Billie_Eilish.jpg"
    }
];

function seedDB() {
    Artist.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            ArtistDB.forEach(function (seed) {
                Artist.create(seed, function (err, artist) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('New artist added');
                    }
                });
            });
            Song.remove({}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('song remove');
                    SongDB1.forEach(function (seed) {
                        Song.create(seed, function (err, song) {
                            if (err) {
                                console.log(err);
                            } else {
                                Artist.findOne().where('artistname').equals('Billie Ellish').exec(function (err, artist) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        song.artist = artist;
                                        song.save();
                                        artist.song.push(song)
                                        artist.save();
                                    }
                                }) 
                            }
                        });
                    });
                    SongDB2.forEach(function (seed) {
                        Song.create(seed, function (err, song) {
                            if (err) {
                                console.log(err);
                            } else {
                                Artist.findOne().where('artistname').equals('Bruno Mars').exec(function (err, artist) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        song.artist = artist;
                                        song.save();
                                        artist.song.push(song)
                                        artist.save();
                                    }
                                })
                                
                            }
                        });
                    });
                    SongDB3.forEach(function (seed) {
                        Song.create(seed, function (err, song) {
                            if (err) {
                                console.log(err);
                            } else {
                                Artist.findOne().where('artistname').equals('Jessie J').exec(function (err, artist) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        song.artist = artist;
                                        song.save();
                                        artist.song.push(song)
                                        artist.save();
                                    }
                                })
                            }
                        });
                    });
                }
            });
        }
    });
}

const SongDB2 = [
    {
        name: "Locked out of Heaven",
        image: "/apicture/locked_out_of_heaven.jpg",
        lyrics: ""
    },
    {
        name: "Leave The Door Open",
        image: "/apicture/Leave_The_Door_Open.jpg",
        lyrics: ""
    },
    {
        name: "When I Was Your Man",
        image: "/apicture/When_I_Was_Your_Man.jpg",
        lyrics: ""
    }
];

// function seedDB() {
//     Artist.remove({}, function (err) {
//         if (err) {
//             console.log(err);
//         } else {
//             ArtistDB.forEach(function (seed) {
//                 Artist.create(seed, function (err, artist) {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         console.log('New artist added');
//                     }
//                 });
//             });
//             Song.remove({}, function (err) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log('song remove');
//                     SongDB2.forEach(function (seed) {
//                         Song.create(seed, function (err, song) {
//                             if (err) {
//                                 console.log(err);
//                             } else {
//                                 Artist.findOne().where('artistname').equals('Bruno Mars').exec(function (err, artist) {
//                                     if (err) {
//                                         console.log(err);
//                                     } else {
//                                         song.artist = artist;
//                                         song.save();
//                                         artist.song.push(song)
//                                         artist.save();
//                                     }
//                                 })
                                
//                             }
//                         });
//                     });
//                 }
//             });
//         }
//     });
// }

const SongDB3 = [
    {
        name: "Flashlight",
        image: "/apicture/Flashlight.png",
        lyrics: ""
    },
    {
        name: "Domino",
        image: "/apicture/domino.jpg",
        lyrics: ""
    },
    {
        name: "Masterpiece",
        image: "/apicture/masterpiece.png",
        lyrics: ""
    }
];
// function seedDB() {
//     Artist.remove({}, function (err) {
//         if (err) {
//             console.log(err);
//         } else {
//             ArtistDB.forEach(function (seed) {
//                 Artist.create(seed, function (err, artist) {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         console.log('New artist added');
//                     }
//                 });
//             });
//             Song.remove({}, function (err) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log('song remove');
//                     SongDB3.forEach(function (seed) {
//                         Song.create(seed, function (err, song) {
//                             if (err) {
//                                 console.log(err);
//                             } else {
//                                 Artist.findOne().where('artistname').equals('Jessie J').exec(function (err, artist) {
//                                     if (err) {
//                                         console.log(err);
//                                     } else {
//                                         song.artist = artist;
//                                         song.save();
//                                         artist.song.push(song)
//                                         artist.save();
//                                     }
//                                 })
                                
//                             }
//                         });
//                     });
//                 }
//             });
//         }
//     });
// }

module.exports = seedDB; //export ในรูปของโมเดลให้ file อื่นใช้งานได้