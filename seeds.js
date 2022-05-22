const mongoose = require('mongoose'),
    Song = require('./models/song'),
    Artist = require('./models/artist');
const { UserExistsError } = require('passport-local-mongoose/lib/errors');

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
        Just fucking leave me alone`,
        mp3: "/mp3/Happier_Than_Ever.mp3"
    },
    {
        name: "everything i want",
        image: "/apicture/everything_i_wanted.jpg",
        lyrics: `I had a dream
        I got everything I wanted
        Not what you'd think
        And if I'm being honest
        It might've been a nightmare
        To anyone who might care
        Thought I could fly (fly)
        So I stepped off the Golden, hmm
        Nobody cried
        Nobody even noticed
        I saw them standing right there
        Kinda thought they might care
        I had a dream
        I got everything I wanted
        But when I wake up, I see
        You with me
        And you say
        "As long as I'm here, no one can hurt you"
        Don't wanna lie here, but you can learn to
        If I could change the way that you see yourself
        You wouldn't wonder why here
        They don't deserve you
        I tried to scream
        But my head was underwater
        They called me weak
        Like I'm not just somebody's daughter
        Could've been a nightmare
        But it felt like they were right there
        And it feels like yesterday was a year ago
        But I don't wanna let anybody know
        'Cause everybody wants something from me now
        And I don't wanna let 'em down
        I had a dream
        I got everything I wanted
        But when I wake up, I see
        You with me
        And you say
        As long as I'm here, no one can hurt you
        Don't wanna lie here, but you can learn to
        If I could change the way that you see yourself
        You wouldn't wonder why here
        They don't deserve you
        If I knew it all then, would I do it again?
        Would I do it again?
        If they knew what they said would go straight to my head
        What would they say instead?
        If I knew it all then, would I do it again?
        Would I do it again?
        If they knew what they said would go straight to my head
        What would they say instead?`,
        mp3: "/mp3/everything_i_wanted.mp3"
    },
    {
        name: "bad guy",
        image: "/apicture/bad_guy.png",
        lyrics: `White shirt now red, my bloody nose
        Sleepin', you're on your tippy toes
        Creepin' around like no one knows
        Think you're so criminal
        Bruises on both my knees for you
        Don't say thank you or please
        I do what I want when I'm wanting to
        My soul? So cynical
        So you're a tough guy
        Like it really rough guy
        Just can't get enough guy
        Chest always so puffed guy
        I'm that bad type
        Make your mama sad type
        Make your girlfriend mad tight
        Might seduce your dad type
        I'm the bad guy, duh
        I'm the bad guy
        I like it when you take control
        Even if you know that you don't
        Own me, I'll let you play the role
        I'll be your animal
        My mommy likes to sing along with me
        But she won't sing this song
        If she reads all the lyrics
        She'll pity the men I know
        So you're a tough guy
        Like it really rough guy
        Just can't get enough guy
        Chest always so puffed guy
        I'm that bad type
        Make your mama sad type
        Make your girlfriend mad tight
        Might seduce your dad type
        I'm the bad guy, duh
        I'm the bad guy, duh
        I'm only good at being bad, bad
        I like when you get mad
        I guess I'm pretty glad that you're alone
        You said she's scared of me?
        I mean, I don't see what she sees
        But maybe it's 'cause I'm wearing your cologne
        I'm a bad guy
        I'm, I'm a bad guy
        Bad guy, bad guy
        I'm a bad`,
        mp3: "/mp3/bad_guy.mp3"
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

const SongDB2 = [
    {
        name: "Locked out of Heaven",
        image: "/apicture/locked_out_of_heaven.jpg",
        lyrics: `One, two, one, two, three
        Oh, yeah, yeah
        Oh, yeah, yeah, yeah, yeah (ooh)
        Oh, yeah, yeah
        Oh, yeah, yeah, yeah, yeah (ooh)
        Never had much faith in love or miracles (ooh)
        Never wanna put my heart on the line (ooh)
        But swimmin' in your water's something spiritual (ooh)
        I'm born again every time you spend the night (ooh)
        'Cause your sex takes me to paradise
        Yeah, your sex takes me to paradise
        And it shows, yeah, yeah, yeah
        'Cause you make me feel like
        I've been locked out of heaven
        For too long, for too long
        Yeah, you make me feel like
        I've been locked out of heaven
        For too long, for too long
        Oh, yeah, yeah, yeah, yeah (ooh)
        Oh, yeah, yeah
        Oh, yeah, yeah, yeah, yeah (ooh)
        You bring me to my knees, you make me testify (ooh)
        You can make a sinner change his ways (ooh)
        Open up your gates 'cause I can't wait to see the light (ooh)
        And right there is where I wanna stay (ooh)
        'Cause your sex takes me to paradise
        Yeah, your sex takes me to paradise
        And it shows, yeah, yeah, yeah
        'Cause you make me feel like
        I've been locked out of heaven
        For too long, for too long
        Yeah, you make me feel like
        I've been locked out of heaven
        For too long, for too long
        Oh-whoa-whoa-whoa, yeah, yeah, yeah
        Can I just stay here?
        Spend the rest of my days here?
        Oh-whoa-whoa-whoa, yeah, yeah, yeah
        Can I just stay here?
        Spend the rest of my days here?
        Cause you make me feel like
        I've been locked out of heaven
        For too long, for too long
        Yeah, you make me feel like
        I've been locked out of heaven
        For too long, for too long
        Oh, yeah, yeah, yeah, yeah (ooh)
        Oh, yeah, yeah
        Oh, yeah, yeah, yeah, yeah (ooh)`,
        mp3: "/mp3/Locked_Out_Of_Heaven.mp3"
    },
    {
        name: "Leave The Door Open",
        image: "/apicture/Leave_The_Door_Open.jpg",
        lyrics: `Said baby, said baby, said baby
        What you doing? (What you doing?)
        Where you at? (Where you at?)
        Oh, you got plans? (You got plans?)
        Don't say that (shut your trap)
        I'm sipping wine (sip, sip) in a robe (drip, drip)
        I look too good (look too good) to be alone (woo-woo)
        My house clean (house clean), my pool warm (pool warm)
        Just shaved (smooth like a newborn)
        We should be dancing, romancing
        In the east wing and the west wing
        Of this mansion, what's happening?
        I ain't playing no games
        Every word that I say is coming straight from the heart
        So if you tryna lay in these arms
        I'ma leave the door open
        (I'ma leave the door open)
        I'ma leave the door open, girl
        (I'ma leave the door open, hoping)
        That you feel the way I feel
        And you want me like I want you tonight, baby
        (Tell me that you're coming through)
        Ooh, you're so sweet (so sweet), so tight (so tight)
        I won't bite (ah-ah), unless you like (unless you like)
        If you smoke (what you smoke?) I got the haze (Purple Haze)
        And if you're hungry, girl, I got filets (woo-woo)
        Ooh, baby, don't keep me (waiting)
        There's so much love we could be making (shamone)
        I'm talking kissing, cuddling
        Rose petals in the bathtub
        Girl, let's jump in, it's bubbling
        I ain't playing no games
        Every word that I say is coming straight from the heart
        So (if you) if you (tryna) tryna lay in these arms
        I'ma leave the door open
        (I'ma leave the door open)
        I'ma leave the door open, girl
        (I'ma leave the door open, hoping)
        That you feel the way I feel
        And you want me like I want you tonight, baby
        (Tell me that you're coming through) come on, girl
        La-la-la, la-la-la-la (I need you, baby)
        La-la-la, la-la-la-la (I gotta see you, baby)
        La-la-la, la-la-la-la (girl, I'm tryna give you this)
        Ah-ah-ah-ah, ah-ah
        Hey-hey, I'ma leave my door open, baby (I'ma leave the door open)
        I'ma leave, I'ma leave my door open, girl
        (I'ma leave the door open, hoping) and I'm hoping, hoping
        That you feel the way I feel
        And you want me like I want you tonight, baby
        (Tell me that you're coming through) woo!
        La-la-la, la-la-la-la (tell me)
        (Tell me that you're coming through)
        Woo-woo-woo-woo, woo-woo-woo, woo-woo-woo
        Woo-woo-woo-woo, woo-woo-woo, woo-woo
        La-la-la, la-la-la-la (la-la-la, la-la)
        (Tell me that you're coming through)
        Girl, I'm here just waiting for you (oh!)
        Come on over, I'll adore you (I gotta know!)
        La-la-la, la-la-la-la (I'm waiting, waiting, waiting)
        (Tell me that you're coming through) for you
        Girl, I'm here just waiting for you
        Come on over, I'll adore you
        La-la-la, la-la-la-la (la-la, la-la)`,
        mp3: "/mp3/Leave_the_Door_Open.mp3"
    },
    {
        name: "When I Was Your Man",
        image: "/apicture/When_I_Was_Your_Man.jpg",
        lyrics: `Same bed but it feels just a little bit bigger now
        Our song on the radio but it don't sound the same
        When our friends talk about you, all it does is just tear me down
        'Cause my heart breaks a little when I hear your name
        It all just sounds like ooh, ooh, ooh, hoo
        Mm, too young, too dumb to realize
        That I should have bought you flowers
        And held your hand
        Should have gave you all my hours
        When I had the chance
        Take you to every party 'cause all you wanted to do was dance
        Now my baby's dancing
        But she's dancing with another man
        My pride, my ego, my needs, and my selfish ways
        Caused a good strong woman like you to walk out my life
        Now I never, never get to clean up the mess I made, oh
        And that haunts me every time I close my eyes
        It all just sounds like ooh, ooh, ooh, hoo
        Mm, too young, too dumb to realize
        That I should have bought you flowers
        And held your hand
        Should have gave you all my hours
        When I had the chance
        Take you to every party 'cause all you wanted to do was dance
        Now my baby's dancing
        But she's dancing with another man
        Although it hurts
        I'll be the first to say that I was wrong
        Oh, I know I'm probably much too late
        To try and apologize for my mistakes
        But I just want you to know
        I hope he buys you flowers
        I hope he holds your hand
        Give you all his hours
        When he has the chance
        Take you to every party
        'Cause I remember how much you loved to dance
        Do all the things I should have done
        When I was your man
        Do all the things I should have done
        When I was your man`,
        mp3: "/mp3/When_I_Was_Your_Man.mp3"
    }
];

const SongDB3 = [
    {
        name: "Flashlight",
        image: "/apicture/Flashlight.png",
        lyrics: `When tomorrow comes
        I'll be on my own
        Feeling frightened of
        The things that I don't know
        When tomorrow comes
        Tomorrow comes
        Tomorrow comes
        And though the road is long
        I look up to the sky
        And in the dark I found,
        I lost hope that I won't fly
        And I sing along, I sing along
        And I sing along
        I got all I need when I got you and I
        I look around me, and see a sweet life
        I'm stuck in the dark but you're my flashlight
        You're getting me, getting me through the night
        Kick start my heart when you shine it in my eyes
        Can't lie, it's a sweet life
        I'm stuck in the dark but you're my flashlight
        You're getting me, getting me through the night
        'Cause you're my flashlight (flashlight)
        You're my flashlight (flashlight)
        You're my flashlight
        I see the shadows long beneath the mountain top
        I'm not afraid when the rain won't stop
        'Cause you light the way
        You light the way, you light the way
        I got all I need when I got you and I
        I look around me, and see a sweet life
        I'm stuck in the dark but you're my flashlight
        You're getting me, getting me through the night
        Kick start my heart when you shine it in my eyes
        I can't lie, it's a sweet life
        I'm stuck in the dark but you're my flashlight
        You're getting me, getting me through the night
        (Light light light you're my flashlight, light, light)
        Light light you're my flashlight
        Light light light light light, oh
        (Light light light you're my flashlight, light, light)
        You're my flash, oh
        I got all I need when I got you and I
        I look around me, and see a sweet life
        I'm stuck in the dark but you're my flashlight
        You're getting me, getting me through the night
        Can't stop my heart when you shinin' in my eyes
        I can't lie, it's a sweet life
        I'm stuck in the dark but you're my flashlight
        (You're my flashlight)
        You're getting me, getting me through the night
        'Cause you're my flashlight
        'Cause you're my flashlight
        You're my flashlight
        You're my flashlight
        Light light
        You're my flashlight
        Light light ye-yeah
        You're my flashlight`,
        mp3: "/mp3/Flashlight.mp3"
    },
    {
        name: "Domino",
        image: "/apicture/domino.jpg",
        lyrics: `I'm feeling sexy and free
        Like glitter's raining on me
        You're like a shot of pure gold
        I think I'm about to explode
        I can taste the tension like a cloud of smoke in the air
        Now I'm breathing like I'm running
        'Cause you're taking me there
        Don't you know
        You spin me out of control
        Ooh, ooh, ooh, ooh
        We can do this all night
        Damn, this love is skin tight
        Baby, come on
        Ooh, ooh, ooh, ooh
        Pull me like a bass drum
        Sparkin' up a rhythm
        Baby, come on
        Ooh, ooh, ooh, ooh
        Rock my world into the sunlight
        Make this dream the best I've ever known
        Dirty dancing in the moonlight
        Take me down like I'm a domino
        Every second is a highlight
        When we touch don't ever let me go
        Dirty dancing in the moonlight
        Take me down like I'm a domino
        You got me losing my mind
        My heart beats out of time
        I'm seeing Hollywood stars
        You strum me like a guitar
        I can taste the tension like a cloud of smoke in the air
        Now I'm breathing like I'm running
        'Cause you're taking me there
        Don't you know
        You spin me out of control
        Ooh, ooh, ooh, ooh
        We can do this all night
        Damn, this love is skin tight
        Baby, come on
        Ooh, ooh, ooh, ooh
        Pull me like a bass drum
        Sparkin' up a rhythm
        Baby, come on
        Ooh, ooh, ooh, ooh
        Rock my world into the sunlight
        Make this dream the best I've ever known
        Dirty dancing in the moonlight
        Take me down like I'm a domino
        Every second is a highlight
        When we touch don't ever let me go
        Dirty dancing in the moonlight
        Take me down like I'm a domino
        Oh baby, baby, got me feeling so right
        Oh baby, baby, dancing in the moonlight
        Oh baby, baby, got me feeling so right
        Oh baby, baby, dancing in the moonlight
        Oh baby, baby, got me feeling so right
        Oh baby, baby, dancing in the moonlight
        Oh baby, baby, got me feeling so right
        Oh baby, baby
        Ooh, ooh, ooh, ooh
        Rock my world into the sunlight
        Make this dream the best I've ever known
        Dirty dancing in the moonlight
        Take me down like I'm a domino
        Every second is a highlight
        When we touch don't ever let me go
        Dirty dancing in the moonlight
        Take me down like I'm a domino`,
        mp3: "/mp3/Domino.mp3"
    },
    {
        name: "Masterpiece",
        image: "/apicture/masterpiece.png",
        lyrics: `So much pressure, why so loud?
        If you don't like my sound, you can turn it down
        I gotta roll
        And I walk it alone
        Uphill battle, I look good when I climb
        I'm ferocious precocious
        I get braggadocios, I'm not gonna stop
        I like the view from the top
        You talk that
        Blah blah that la la, that rah rah sh
        And I'm so done, I'm so over it
        Sometimes I mess up, I eff up, I hit and miss
        But I'm okay, I'm cool with it
        I still fall on my face sometimes and I
        Can't color inside the lines 'cause
        I'm perfectly incomplete
        I'm still working on my masterpiece and I
        I wanna hang with the greatest gotta
        Way to go, but it's worth the wait, no
        You haven't seen the best of me
        I'm still working on my masterpiece and I
        Those who mind, don't matter
        Those who matter, don't mind
        If you don't catch what I'm throwing then I leave you behind
        Don't need a flash
        And I am leaving like that
        They talk that
        Blah blah that la la, that rah rah sh
        Go with the punches, and take the hits
        Sometimes I mess up, I eff up, I swing and miss
        But it's okay, I'm cool with this
        I still fall on my face sometimes and I
        Can't color inside the lines 'cause
        I'm perfectly incomplete
        I'm still working on my masterpiece and I
        I wanna hang with the greatest gotta
        Way to go, but it's worth the wait, no
        You haven't seen the best of me
        I'm still working on my masterpiece and I
        I still fall on my face sometimes and I
        Can't color inside the lines 'cause
        I'm perfectly incomplete
        I'm still working on my masterpiece
        Masterpiece, masterpiece
        I still fall on my face sometimes and I
        Can't color inside the lines 'cause
        I'm perfectly incomplete
        I'm still working on my masterpiece and I
        I wanna hang with the greatest gotta
        Way to go, but it's worth the wait, no
        You haven't seen the best of me
        I'm still working on my masterpiece and I
        Still workin' on my masterpiece`,
        mp3: "/mp3/Masterpiece.mp3"
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
                    // if(curren)
                    // User.remove({}, function(err){
                    //     if (err) {
                    //         console.log(err);
                    //     } else {

                    //     }
                    // })
                }
            });
        }
    });
}

module.exports = seedDB; //export ในรูปของโมเดลให้ file อื่นใช้งานได้