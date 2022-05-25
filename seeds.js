const mongoose = require('mongoose'),
    Song = require('./models/song'),
    User = require('./models/user'),
    Artist = require('./models/artist');
const { UserExistsError } = require('passport-local-mongoose/lib/errors');

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
    },
    {
        artistname: "Taylor Swift",
        descriptartist: "This is Taylor Swift",
        image: "/apicture/Taylor_Swift.jpg"
    },
    {
        artistname: "Ariana Grande",
        descriptartist: "This is Ariana Grande",
        image: "/apicture/Ariana_Grande.jpg"
    },
    {
        artistname: "Sabrina Carpenter",
        descriptartist: "This is sabrina Carpenter",
        image: "/apicture/sabrina_carpenter.jpg"
    },
    {
        artistname: "Adele",
        descriptartist: "This is Adele",
        image: "/apicture/Adele.jpg"
    }
];

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
    },
    {
        name: "idontwannabeyouanymore",
        image: "/apicture/idontwannabeyouanymore.jpg",
        lyrics: `Don't be that way
        Fall apart twice a day
        I just wish you could feel what you say
        Show, never tell
        But I know you too well
        Got a mood that you wish you could sell
        If teardrops could be bottled
        There'd be swimming pools filled by models
        Told "a tight dress is what makes you a whore"
        If "I love you" was a promise
        Would you break it, if you're honest?
        Tell the mirror what you know she's heard before
        I don't wanna be you, anymore
        Hand, hands getting cold
        Losing feeling is getting old
        Was I made from a broken mold?
        Hurt, I can't shake
        We've made every mistake
        Only you know the way that I break
        If teardrops could be bottled
        There'd be swimming pools filled by models
        Told "a tight dress is what makes you a whore"
        If "I love you" was a promise
        Would you break it, if you're honest?
        Tell the mirror what you know she's heard before
        I-I don't wanna be you
        I don't wanna be you
        I don't wanna be you, anymore`,
        mp3: "/mp3/idontwannabeyouanymore.mp3"
    },
    {
        name: "ocean eyes",
        image: "/apicture/ocean_eyes.jpg",
        lyrics: `I've been watchin' you for some time
        Can't stop starin' at those ocean eyes
        Burning cities and napalm skies
        Fifteen flares inside those ocean eyes
        Your ocean eyes
        No fair
        You really know how to make me cry
        When you gimme those ocean eyes
        I'm scared
        I've never fallen from quite this high
        Fallin' into your ocean eyes
        Those ocean eyes
        I've been walkin' through a world gone blind
        Can't stop thinkin' of your diamond mind
        Careful creature made friends with time
        He left her lonely with a diamond mind
        And those ocean eyes
        No fair
        You really know how to make me cry
        When you gimme those ocean eyes
        I'm scared
        I've never fallen from quite this high
        Fallin' into your ocean eyes
        Those ocean eyes
        Da, da-da, da-da
        Da-da-da, da, da
        Da, da, da, da, da-da-da-da
        Mm
        Mm
        Mm
        No fair
        You really know how to make me cry
        When you gimme those ocean eyes
        I'm scared
        I've never fallen from quite this high
        Fallin' into your ocean eyes
        Those ocean eyes`,
        mp3: "/mp3/ocean_eyes.mp3"
    },
    {
        name: "Bored",
        image: "/apicture/Bored.jpg",
        lyrics: `Ah
        Ah
        The games you played were never fun (mm)
        You'd say you'd stay but then you'd run (ah)
        Givin' you what you're beggin' for
        Givin' you what you say I need
        I don't want any settled scores
        I just want you to set me free
        Givin' you what you're beggin' for
        Givin' you what you say I need
        Say I need
        I'm not afraid anymore
        What makes you sure you're all I need?
        Forget about it
        When you walk out the door and leave me torn
        You're teachin' me to live without it
        Bored
        I'm so bored
        I'm so bored
        So bored
        I'm home alone, you're God-knows-where (mm)
        I hope you don't think that shit's fair (ah)
        Givin' you all you want and more
        Givin' you every piece of me
        I don't want love I can't afford
        I just want you to love for free
        Can't you see that I'm gettin' bored?
        Givin' you every piece of me
        Piece of me
        I'm not afraid anymore
        What makes you sure you're all I need?
        Forget about it
        When you walk out the door and leave me torn
        You're teachin' me to live without it
        Bored
        I'm so bored
        I'm so bored
        So bored
        Givin' you what you're beggin' for
        Givin' you what you say I need
        I don't want any settled scores
        I just want you to set me free
        Givin' you what you're beggin' for
        Givin' you what you say I need
        Say I need
        I'm not afraid anymore
        What makes you sure you're all I need?
        Forget about it
        And when you walk out the door and leave me torn
        You're teachin' me to live without it`,
        mp3: "/mp3/Bored.mp3"
    },
    {
        name: "i love you",
        image: "/apicture/i_love_you.jpg",
        lyrics: `It's not true
        Tell me I've been lied to
        Cryin' isn't like you
        Ooh
        What the hell did I do?
        Never been the type to
        Let someone see right through
        Ooh
        Maybe won't you take it back?
        Say you were tryna make me laugh
        And nothin' has to change today
        You didn't mean to say, "I love you"
        I love you and I don't want to
        Ooh
        Up all night on another red eye
        I wish we never learned to fly
        I
        Maybe we should just try
        To tell ourselves a good lie
        I didn't mean to make you cry
        I
        Maybe won't you take it back?
        Say you were tryna make me laugh
        And nothin' has to change today
        You didn't mean to say, "I love you"
        I love you and I don't want to
        Ooh
        The smile that you gave me
        Even when you felt like dyin'
        We fall apart as it gets dark
        I'm in your arms in Central Park
        There's nothin' you could do or say
        I can't escape the way I love you
        I don't want to, but I love you
        Ooh
        Ooh
        Ooh
        Ooh
        Ooh`,
        mp3: "/mp3/i_love_you.mp3"
    },
    {
        name: "lovely(with Khalid)",
        image: "/apicture/lovely.jpg",
        lyrics: `Thought I found a way
        Thought I found a way out (found)
        But you never go away (never go away)
        So I guess I gotta stay now
        Oh, I hope some day I'll make it out of here
        Even if it takes all night or a hundred years
        Need a place to hide, but I can't find one near
        Wanna feel alive, outside I can't fight my fear
        Isn't it lovely, all alone
        Heart made of glass, my mind of stone
        Tear me to pieces, skin to bone
        Hello, welcome home
        Walkin' out of town
        Lookin' for a better place (lookin' for a better place)
        Something's on my mind (mind)
        Always in my head space
        But I know some day I'll make it out of here
        Even if it takes all night or a hundred years
        Need a place to hide, but I can't find one near
        Wanna feel alive, outside I can't fight my fear
        Isn't it lovely, all alone
        Heart made of glass, my mind of stone
        Tear me to pieces, skin to bone
        Hello, welcome home
        Whoa, yeah
        Yeah, ah
        Whoa, whoa
        Hello, welcome home`,
        mp3: "/mp3/lovely.mp3"
    },
    {
        name: "wish you were gay",
        image: "/apicture/wish_you_were_gay.jpg",
        lyrics: `"Baby, I don't feel so good", six words you never understood
        "I'll never let you go", five words you'll never say (aww)
        I laugh along like nothing's wrong, four days has never felt so long
        If three's a crowd and two was us, one slipped away (hahahahaha)
        I just wanna make you feel okay
        But all you do is look the other way
        I can't tell you how much I wish I didn't wanna stay
        I just kinda wish you were gay
        Is there a reason we're not through?
        Is there a 12-step just for you?
        Our conversation's all in blue
        11 "heys" (Hey, hey, hey, hey)
        Ten fingers tearin' out my hair
        Nine times, you never made it there
        I ate alone at seven, you were six minutes away
        How am I supposed to make you feel okay
        When all you do is walk the other way?
        I can't tell you how much I wish I didn't wanna stay
        I just kinda wish you were gay
        To spare my pride
        To give your lack of interest, an explanation
        Don't say I'm not your type
        Just say that I'm not your preferred sexual orientation
        I'm so selfish
        But you make me feel helpless, yeah
        And I can't stand another day
        Stand another day
        I just wanna make you feel okay
        But all you do is look the other way, hmm
        I can't tell you how much I wish I didn't wanna stay
        I just kinda wish you were gay
        I just kinda wish you were gay
        I just kinda wish you were gay`,
        mp3: "/mp3/wish_you_were_gay.mp3"
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
    },
    {
        name: "Talking to the Moon",
        image: "/apicture/Talking_to_the_Moon.jpg",
        lyrics: `I know you're somewhere out there
        Somewhere far away
        I want you back, I want you back
        My neighbors think I'm crazy
        But they don't understand
        You're all I had, you're all I had
        At night, when the stars light up my room
        I sit by myself
        Talking to the moon
        Trying to get to you
        In hopes you're on the other side talking to me too
        Or am I a fool who sits alone talking to the moon?
        Oh-oh
        I'm feeling like I'm famous, the talk of the town
        They say I've gone mad
        Yeah, I've gone mad
        But they don't know what I know
        'Cause when the sun goes down, someone's talking back
        Yeah, they're talking back, oh
        At night, when the stars light up my room
        I sit by myself
        Talking to the moon
        Trying to get to you
        In hopes you're on the other side talking to me too
        Or am I a fool who sits alone talking to the moon?
        Ah-ah, ah-ah, ah-ah
        Do you ever hear me calling?
        (Ah-ah, ah-ah, ah-ah) oh-oh-oh, oh-oh-oh
        'Cause every night, I'm talking to the moon
        Still trying to get to you
        In hopes you're on the other side talking to me too
        Or am I a fool who sits alone talking to the moon?
        Oh-oh
        I know you're somewhere out there
        Somewhere far away`,
        mp3: "/mp3/Talking_to_the_Moon.mp3"
    },
    {
        name: "Just The Way You Are",
        image: "/apicture/just_the_way_you_are.jpg",
        lyrics: `Oh, her eyes, her eyes
        Make the stars look like they're not shinin'
        Her hair, her hair
        Falls perfectly without her tryin'
        She's so beautiful and I tell her everyday
        Yeah, I know, I know
        When I compliment her, she won't believe me
        And it's so, it's so
        Sad to think that she don't see what I see
        But every time she asks me, "Do I look okay?"
        I say
        When I see your face
        There's not a thing that I would change
        'Cause you're amazing
        Just the way you are
        And when you smile
        The whole world stops and stares for a while
        'Cause girl, you're amazing
        Just the way you are
        Yeah
        Her lips, her lips
        I could kiss them all day if she'd let me
        Her laugh, her laugh
        She hates, but I think it's so sexy
        She's so beautiful and I tell her everyday
        Oh, you know, you know
        You know I'd never ask you to change
        If perfect's what you're searchin' for, then just stay the same
        So don't even bother askin' if you look okay
        You know I'll say
        When I see your face
        There's not a thing that I would change
        'Cause you're amazing
        Just the way you are
        And when you smile
        The whole world stops and stares for a while
        'Cause girl, you're amazing
        Just the way you are
        The way you are
        The way you are
        Girl, you're amazing
        Just the way you are
        When I see your face
        There's not a thing that I would change
        'Cause you're amazing
        Just the way you are
        And when you smile
        The whole world stops and stares for a while
        'Cause girl, you're amazing
        Just the way you are
        Yeah`,
        mp3: "/mp3/just_the_way_you_are.mp3"
    },
    {
        name: "Smokin Out The Window",
        image: "/apicture/Smokin_Out_The_Window.jpg",
        lyrics: `Wait a minute, this love started off so tender, so sweet
        But now she got me smokin' out the window
        Mh, mh, mh
        Must've spent thirty five
        Forty five thousand up in Tiffany's (oh, no)
        Got her badass kids runnin' 'round my whole crib
        Like it's Chuck E. Cheese (whoa, whoa)
        Put me in a jam with her ex-man in the UFC
        Can't believe it (can't believe it)
        I'm in disbelief
        This bitch got me payin' her rent, payin' for trips
        Diamonds on her neck, diamonds on her wrist
        And here I am all alone (all alone), uh
        I'm so cold, I'm so cold
        You got me out here
        Smokin' out the window (smokin' out the window)
        Singin', "How could she do this to me?"
        (How could she do this to me?)
        Oh, I thought that girl belonged to only me (mmh)
        But I was wrong
        'Cause she belong to everybody, everybody, ooh
        Just the other night she was grippin' on me tight
        Screamin', "Hercules" (Hercules, Hercules)
        Got me in the club lookin' for a new love
        Someone help me please (help me please, help me please)
        Baby, why you doin' this? Why you doin' this to me, girl?
        Not to sound dramatic, but I wanna die
        This bitch got me payin' her rent, payin' for trips
        Diamonds on her neck, diamonds on her wrist
        And here I am all alone (all alone)
        I'm so cold, I'm so cold
        You got me out here
        Smokin' out the window
        (Smokin' out the window of the Benzo, the Benzo)
        Singin', "How could she do this to me?" (How? How could she do this?)
        Oh, I thought that girl belonged to only me (one thing's fasho)
        (One thing's fasho)
        But I was wrong (I was wrong)
        'Cause she belong (she belong)
        To everybody, everybody (yeah, she belong to everybody)
        That girl there, she belong to everybody, ooh
        Look here, baby, I hope you found whatever it is that you need
        But I also hope
        That your triflin' ass is walkin' 'round barefoot in these streets
        Look out
        Girl, it breaks my heart that you ain't right here with me
        Now I gotta give you back (gotta give you back)
        To the city, oh, you got me
        Smokin' out the window (hoo-ooh)
        Singin', "How could she do this to me?" (How could you?)
        (How could you do this, baby?)
        Oh, I thought that girl belonged to only me (woo-hoo, ooh)
        But I was wrong (I was wrong)
        'Cause she belong (she belong)
        To everybody, everybody (yeah, she belonged to everybody)
        (Yeah, yeah, she belonged to everybody) ooh`,
        mp3: "/mp3/Smokin_Out_The_Window.mp3"
    },
    {
        name: "Treasure",
        image: "/apicture/Treasure.jpg",
        lyrics: `Give me your, give me your, give me your attention, baby (attention, baby)
        I got to tell you a little something about yourself (self)
        You're wonderful, flawless, ooh, you a sexy lady (sexy lady)
        But you walk around here like you wanna be someone else (else)
        I know that you don't know it
        But you're fine, so fine (fine, so fine)
        (Oh, oh) oh, girl I'm gonna show you
        When you're mine, oh, mine (mine, oh, mine)
        Treasure, that is what you are
        Honey, you're my golden star
        You know you can make my wish come true
        If you let me treasure you
        If you let me treasure you
        Oh, oh, oh
        Pretty girl, pretty girl, pretty girl
        You should be smiling (you should be smiling)
        A girl like you should never look so blue (blue)
        You're everything I see in my dreams
        I wouldn't say that to you if it wasn't true (true)
        I know that you don't know it
        But you're fine, so fine (fine, so fine)
        (Oh, oh) oh girl I'm gonna show you
        When you're mine, oh mine (mine, oh mine)
        Treasure, that is what you are
        Honey, you're my golden star
        You know you can make my wish come true
        If you let me treasure you
        If you let me treasure
        Oh, oh, oh
        You are my treasure, you are my treasure
        You are my treasure, yeah, you, you, you, you are
        You are my treasure, you are my treasure
        You are my treasure, yeah, you, you, you, you are
        Treasure, that is what you are (you are my treasure)
        Honey, you're my golden star (you are my treasure)
        You know you can make my wish come true (you are my treasure)
        If you let me treasure you (you are my treasure)
        If you let me treasure you (you are my treasure)
        Oh, oh, oh`,
        mp3: "/mp3/Treasure.mp3"
    },
    {
        name: "Grenade",
        image: "/apicture/grenade.jpg",
        lyrics: `Easy come, easy go, that's just how you live, oh
        Take, take, take it all, but you never give
        Should have known you was trouble from the first kiss
        Had your eyes wide open
        Why were they open? (Ooh)
        Gave you all I had and you tossed it in the trash
        You tossed it in the trash, you did
        To give me all your love is all I ever ask
        'Cause what you don't understand is
        I'd catch a grenade for ya (yeah, yeah, yeah)
        Throw my hand on a blade for ya (yeah, yeah, yeah)
        I'd jump in front of a train for ya (yeah, yeah, yeah)
        You know I'd do anything for ya (yeah, yeah, yeah)
        Oh, oh, I would go through all this pain
        Take a bullet straight through my brain
        Yes, I would die for ya, baby
        But you won't do the same
        No, no, no, no
        Black, black, black and blue
        Beat me 'til I'm numb
        Tell the devil I said "Hey" when you get back to where you're from
        Mad woman, bad woman
        That's just what you are
        Yeah, you'll smile in my face then rip the brakes out my car
        Gave you all I had and you tossed it in the trash
        You tossed it in the trash, yes you did
        To give me all your love is all I ever ask
        'Cause what you don't understand is
        I'd catch a grenade for ya (yeah, yeah, yeah)
        Throw my hand on a blade for ya (yeah, yeah, yeah)
        I'd jump in front of a train for ya (yeah, yeah, yeah)
        You know I'd do anything for ya (yeah, yeah, yeah)
        Oh oh, I would go through all this pain
        Take a bullet straight through my brain
        Yes, I would die for ya, baby
        But you won't do the same
        If my body was on fire
        Ooh, you'd watch me burn down in flames
        You said you loved me, you're a liar
        'Cause you never, ever, ever did, baby
        But darling, I'd still catch a grenade for ya (yeah, yeah, yeah)
        Throw my hand on a blade for ya (yeah, yeah, yeah)
        I'd jump in front of a train for ya (yeah, yeah, yeah)
        You know I'd do anything for ya (yeah, yeah, yeah)
        Oh oh, I would go through all this pain
        Take a bullet straight through my brain
        Yes, I would die for ya, baby
        But you won't do the same
        No, you won't do the same
        You wouldn't do the same
        Ooh, you'd never do the same
        No, no, no, no oh`,
        mp3: "/mp3/grenade.mp3"
    },
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
    },
    {
        name: "Price Tag",
        image: "/apicture/price_tag.jpg",
        lyrics: `Okay, Coconut Man, Moonhead and Pea
        You ready?
        Seems like everybody's got a price
        I wonder how they sleep at night
        When the sale comes first and the truth comes second
        Just stop for a minute and smile
        Why is everybody so serious?
        Acting so damn mysterious
        Got shades on your eyes and your heels so high
        That you can't even have a good time
        Everybody look to their left
        Everybody look to their right
        Can you feel that? Yeah
        We're paying with love tonight
        It's not about the money, money, money
        We don't need your money, money, money
        We just wanna make the world dance
        Forget about the price tag
        Ain't about the, uh, cha-ching, cha-ching
        Ain't about the, yeah, ba-bling, ba-bling
        Wanna make the world dance
        Forget about the price tag
        We need to take it back in time
        When music made us all unite
        And it wasn't low blows and video hoes
        Am I the only one getting tired?
        Why is everybody so obsessed?
        Money can't buy us happiness
        Can we all slow down and enjoy right now?
        Guarantee we'll be feeling alright
        Everybody look to their left (to their left)
        Everybody look to their right (to their right)
        Can you feel that? Yeah
        We're paying with love tonight
        It's not about the money, money, money
        We don't need your money, money, money
        We just wanna make the world dance
        Forget about the price tag
        Ain't about the, uh, cha-ching, cha-ching
        Ain't about the, yeah, ba-bling, ba-bling
        Wanna make the world dance
        Forget about the price tag (yeah, yeah)
        Well, keep the price tag (yeah) and take the cash back (back)
        Just give me six strings (six strings) and a half stack (half stack)
        And you can, can keep the cars, leave me the garage
        And all I, yes, all I need are keys and guitars
        And guess what? In 30 seconds, I'm leaving to Mars
        Yeah, we leaping across these undefeatable odds
        It's like this, man, you can't put a price on a life
        We do this for the love, so we fight and sacrifice every night
        So we ain't gon' stumble and fall, never (nah)
        Waiting to see this in the sign of defeat, uh-uh
        So we gon' keep everyone moving their feet
        So bring back the beat and then everyone sing
        It's not about the money, money, money
        We don't need your money, money, money
        We just wanna make the world dance
        Forget about the price tag
        Ain't about the, uh, cha-ching, cha-ching
        Ain't about the, yeah, ba-bling, ba-bling
        Wanna make the world dance
        Forget about the price tag (hey, hey)
        It's not about the money, money, money (we don't need it)
        We don't need your money, money, money (no I don't, we don't need it)
        We just wanna make the world dance (dance)
        Forget about the price tag (dance your ass off, ah-ah)
        Ain't about the, uh, cha-ching, cha-ching
        Ain't about the, yeah, ba-bling, ba-bling (it ain't about)
        Wanna make the world dance (yeah, yeah)
        Forget about the price tag (forget about the price tag)
        Yeah, yeah, oh-oh
        Forget about the price tag`,
        mp3: "/mp3/price_tag.mp3"
    },
    {
        name: "I Want Love",
        image: "/apicture/i_want_love.jpg",
        lyrics: `I want love
        Baby, tonight, I want it
        I want love
        Don't try to fight me on it
        I want you and me, there's no confusion
        Breakin' all our New Year's resolutions
        I never thought you'd see me
        I never thought you'd care
        I never thought you'd come so close
        I could feel you, now you're standing there
        I never thought you'd run to me
        Now I don't know what to say, babe
        I only closed the door 'cause I thought that you were afraid
        I wanted you yesterday
        No, nothing's changed
        You've always been the one
        And I want love
        Baby, tonight, I want it
        I want love
        Don't try to fight me on it
        I want you and me, there's no confusion
        Breakin' all our New Year's resolutions
        'Cause I want love (ooh-ooh-ooh)
        I want love (ooh-ooh-ooh)
        I want you and me, there's no confusion
        Breakin' all our New Year's resolutions
        So, baby, let's get crazy
        There's no need to be scared
        I wanna get lost in love, divine, forever to share
        I wanted you yesterday
        No, nothing's changed
        You've always been the one
        And I want love
        Baby, tonight, I want it
        I want love
        Don't try to fight me on it
        I want you and me, there's no confusion
        Breakin' all our New Year's resolutions
        I want love
        Baby, tonight, I want it
        I want love
        Don't try to fight me on it
        I want you and me, there's no confusion
        Breakin' all our New Year's resolutions, ooh
        I want love (ooh)
        Baby, tonight, I want it
        I want love (woo)
        Don't try to fight me on it
        I want you and me, there's no confusion (you and me, babe)
        Breakin' all our New Year's resolutions
        I want love (ooh-ooh-ooh)
        I want love (ooh-ooh-ooh)
        You and me, there's no confusion
        Breakin' all our New Year's resolutions
        I want love`,
        mp3: "/mp3/I_Want_Love.mp3"
    },
    {
        name: "Sexy Lady",
        image: "/apicture/Sexy_lady.jpg",
        lyrics: `You're feeling nervous
        Having your doubts
        Don't be embarrassed if you don't fit in the crowd
        Keep standing tall
        And hold your ground
        Show 'em it's not okay to let 'em kick you down
        Oh oh oh oh
        Don't let em ruin your time
        Oh oh oh oh
        It's now or never, never
        Oh oh oh oh
        Just let 'em know it's your life
        So do it use it flaunt it, own it
        Woo, that's right
        Yeah, you better give it everything you got, hey
        Just show 'em you're a sexy lady
        Yeah, you better work it till it's burning hot
        Hey, just show 'em you're a sexy lady
        Time is now baby
        Look around baby
        Just be proud, you're a sexy lady
        Rock it out baby
        Play it loud baby
        Just be proud, all my sexy ladies
        So admit it
        It's feeling good
        Your hips are rolling
        And you love it like you should
        Work up a sweat
        Enjoy the ride
        Good girl go get it
        Wear your confidence tonight
        Oh oh oh oh
        Don't let em ruin your time
        Oh oh oh oh
        It's now or never, never
        Oh oh oh oh
        Just let 'em know it's your life
        So do it use it flaunt it, own it
        Aha that's right
        Yeah, you better give it everything you got, hey
        Just show 'em you're a sexy lady
        Yeah, you better work it till it's burning hot
        Hey, just show 'em you're a sexy lady
        Time is now baby
        Look around baby
        Just be proud, you're a sexy lady
        Rock it out baby
        Play it loud baby
        Just be proud, all my sexy ladies
        Oh oh oh oh
        Oh oh oh oh
        Oh oh oh oh
        Oh oh oh oh
        Yeah, you better give it everything you got
        Hey, just show em you're a sexy lady
        Yeah, you better work it till it's burning hot, yes
        To show 'em you're a sexy lady
        Time is now baby
        Look around baby
        Just be proud, you're a sexy lady
        Rock it out baby
        Play it loud baby
        Just be proud, all my sexy ladies (you sexy)`,
        mp3: "/mp3/Sexy_lady.mp3"
    },
    {
        name: "Who You Are",
        image: "/apicture/who_you_are.jpg",
        lyrics: `Mm, yeah, oh
        Yeah, yeah
        I stare at my reflection in the mirror
        Why am I doing this to myself?
        Losing my mind on a tiny error
        I nearly left the real me on the shelf
        No, no, no, no, no
        Don't lose who you are
        In the blur of the stars
        Seeing is deceiving
        Dreaming is believing
        It's okay not to be okay
        Sometimes it's hard
        To follow your heart
        Tears don't mean you're losing
        Everybody's bruising
        Just be true to who you are
        No, no, no, no, no, no, no
        (Who you are, who you are, who you are)
        (Who you are, who you are)
        Brushing my hair, do I look perfect?
        I forgot what to do to fit the mold, yeah
        The more I try the less is working, yeah yeah
        'Cause everything inside me screams
        "No, no, no, no, no" (no, no, no, no, no)
        Don't lose who you are
        In the blur of the stars
        Seeing is deceiving
        Dreaming is believing
        It's okay not to be okay
        Sometimes it's hard
        To follow your heart
        But tears don't mean you're losing
        Everybody's bruising
        There's nothing wrong with who you are
        Yes, no's, egos, fake shows
        Like "whoa", just go, and leave me alone
        Real talk, real life, good love, goodnight
        With a smile, that's my home, yeah, oh
        That's my home, no
        No, no, no, no, no, no
        Don't lose who you are
        In the blur of the stars
        Seeing is deceiving
        Dreaming is believing
        It's okay not to be okay
        Sometimes it's hard
        To follow your heart
        Tears don't mean you're losing
        Everybody's bruising
        Just be true to who you are
        Yeah, yeah, yeah`,
        mp3: "/mp3/who_you_are.mp3"
    },
];

const SongDB4 = [
    {
        name: "All Too Well",
        image: "/apicture/All_Too_Well.jpg",
        lyrics: `I walked through the door with you
        The air was cold
        But something about it felt like home somehow
        And I, left my scarf there at your sister's house
        And you've still got it in your drawer even now
        Oh, your sweet disposition
        And my wide-eyed gaze
        We're singing in the car, getting lost upstate
        Autumn leaves falling down like pieces into place
        And I can picture it after all these days
        And I know it's long gone and that magic's not here no more
        And I might be okay but I'm not fine at all
        'Cause there we are again on that little town street
        You almost ran the red 'cause you were lookin' over at me
        Wind in my hair, I was there
        I remember it all too well
        Photo album on the counter
        Your cheeks were turning red
        You used to be a little kid with glasses in a twin-sized bed
        And your mother's telling stories 'bout you on the tee-ball team
        You told me 'bout your past thinking your future was me
        And I know it's long gone and there was nothing else I could do
        And I forget about you long enough to forget why I needed to
        'Cause there we are again in the middle of the night
        We're dancing 'round the kitchen in the refrigerator light
        Down the stairs, I was there
        I remember it all too well, yeah
        And maybe we got lost in translation
        Maybe I asked for too much
        But maybe this thing was a masterpiece 'til you tore it all up
        Running scared, I was there
        I remember it all too well
        And you call me up again just to break me like a promise
        So casually cruel in the name of being honest
        I'm a crumpled up piece of paper lying here
        'Cause I remember it all, all, all
        Too well
        Time won't fly, it's like I'm paralyzed by it
        I'd like to be my old self again
        But I'm still trying to find it
        After plaid shirt days and nights when you made me your own
        Now you mail back my things and I walk home alone
        But you keep my old scarf from that very first week
        'Cause it reminds you of innocence
        And it smells like me
        You can't get rid of it
        'Cause you remember it all too well, yeah
        'Cause there we are again when I loved you so
        Back before you lost the one real thing you've ever known
        It was rare, I was there, I remember it all too well
        Wind in my hair, you were there, you remember it all
        Down the stairs, you were there, you remember it all
        It was rare, I was there, I remember it all too well`,
        mp3: "/mp3/All_Too_Well.mp3"
    },
    {
        name: "The 1",
        image: "/apicture/The_1.jpg",
        lyrics: `I'm doing good, I'm on some new shit
        Been saying "yes" instead of "no"
        I thought I saw you at the bus stop, I didn't though
        I hit the ground running each night
        I hit the Sunday matinée
        You know the greatest films of all time were never made
        I guess you never know, never know
        And if you wanted me, you really should've showed
        And if you never bleed, you're never gonna grow
        And it's alright now
        But we were something, don't you think so?
        Roaring 20s, tossing pennies in the pool
        And if my wishes came true
        It would've been you
        In my defense, I have none
        For never leaving well enough alone
        But it would've been fun
        If you would've been the one
        (Ooh)
        I have this dream you're doing cool shit
        Having adventures on your own
        You meet some woman on the internet and take her home
        We never painted by the numbers, baby
        But we were making it count
        You know the greatest loves of all time are over now
        I guess you never know, never know
        And it's another day waking up alone
        But we were something, don't you think so?
        Roaring 20s, tossing pennies in the pool
        And if my wishes came true
        It would've been you
        In my defense, I have none
        For never leaving well enough alone
        But it would've been fun
        If you would've been the one
        I, I, I persist and resist the temptation to ask you
        If one thing had been different
        Would everything be different today?
        We were something, don't you think so?
        Rosé flowing with your chosen family
        And it would've been sweet
        If it could've been me
        In my defense, I have none
        For digging up the grave another time
        But it would've been fun
        If you would've been the one
        (Ooh)`,
        mp3: "/mp3/The_1.mp3"
    },
    {
        name: "Lover",
        image: "/apicture/Lover.png",
        lyrics: `We could leave the Christmas lights up 'til January
        And this is our place, we make the rules
        And there's a dazzling haze, a mysterious way about you dear
        Have I known you 20 seconds or 20 years?
        Can I go where you go?
        Can we always be this close forever and ever?
        And ah, take me out, and take me home
        You're my, my, my, my
        Lover
        We could let our friends crash in the living room
        This is our place, we make the call
        And I'm highly suspicious that everyone who sees you wants you
        I've loved you three summers now, honey, but I want 'em all
        Can I go where you go?
        Can we always be this close forever and ever?
        And ah, take me out, and take me home (forever and ever)
        You're my, my, my, my
        Lover
        Ladies and gentlemen, will you please stand?
        With every guitar string scar on my hand
        I take this magnetic force of a man to be my lover
        My heart's been borrowed and yours has been blue
        All's well that ends well to end up with you
        Swear to be overdramatic and true to my lover
        And you'll save all your dirtiest jokes for me
        And at every table, I'll save you a seat, lover
        Can I go where you go?
        Can we always be this close forever and ever?
        And ah, take me out, and take me home (forever and ever)
        You're my, my, my, my
        Oh, you're my, my, my, my
        Darling, you're my, my, my, my
        Lover`,
        mp3: "/mp3/Lover.mp3"
    },
    {
        name: "Dont Blame Me",
        image: "/apicture/Dont_Blame_Me.jpg",
        lyrics: `Don't blame me, love made me crazy
        If it doesn't, you ain't doin' it right
        Lord, save me, my drug is my baby
        I'd be usin' for the rest of my life
        I've been breakin' hearts a long time, and
        Toyin' with them older guys
        Just to play things for me to use
        Something happened for the first time, in
        The darkest little paradise
        Shakin, pacin', I just need you
        For you, I would cross the line
        I would waste my time
        I would lose my mind
        They say she's gone too far this time
        Don't blame me, love made me crazy
        If it doesn't, you ain't doin' it right
        Lord, save me, my drug is my baby
        I'd be usin' for the rest of my life
        Don't blame me, love made me crazy
        If it doesn't, you ain't doin' it right
        Oh, Lord, save me, my drug is my baby
        I'd be usin' for the rest of my life
        My name is whatever you decide
        And I'm just gonna call you mine
        I'm insane, but I'm your baby (your baby)
        Echoes, love your name inside my mind
        Halo, hiding my obsession
        I once was poison ivy, but now I'm your daisy
        And baby, for you, I would fall from grace
        Just to touch your face
        If you walk away
        I'd beg you on my knees to stay
        Don't blame me, love made me crazy
        If it doesn't, you ain't doin' it right
        Lord, save me, my drug is my baby
        I'd be usin' for the rest of my life
        Don't blame me, love made me crazy
        If it doesn't, you ain't doin' it right
        Oh, Lord, save me, my drug is my baby
        I'd be usin' for the rest of my life
        I get so high, oh
        Every time, yeah every time you're lovin' me
        You're lovin' me
        Trip of my life, oh
        Every time, yeah every time you're touchin' me
        You're touchin' me
        Every time, yeah every time you're lovin' me
        Oh Lord, save me, my drug is my baby
        I'd be usin' for the rest of my life
        Usin' for the rest of my life, oh
        Don't blame me, love made me crazy
        If it doesn't, you ain't doin' it right (doin' it right, no)
        Lord, save me, my drug is my baby
        I'd be usin' for the rest of my life, oh
        Don't blame me, love made me crazy
        If it doesn't, you ain't doin' it right (you ain't doin' it)
        Oh, Lord, save me, my drug is my baby
        I'd be usin' for the rest of my life (I'll be usin', I'll be usin')
        I get so high, oh
        Every time, yeah every time you're lovin' me
        You're lovin' me
        Oh, Lord, save me, my drug is my baby
        I'd be usin' for the rest of my life`,
        mp3: "/mp3/Dont_Blame_Me.mp3"
    },
    {
        name: "22",
        image: "/apicture/22.jpg",
        lyrics: `It feels like a perfect night
        To dress up like hipsters
        And make fun of our exes
        Ah-ah, ah-ah
        It feels like a perfect night
        For breakfast at midnight
        To fall in love with strangers
        Ah-ah, ah-ah
        Yeah, we're happy, free, confused and lonely at the same time
        It's miserable and magical, oh yeah
        Tonight's the night when we forget about the deadlines
        It's time, oh-oh
        I don't know about you
        But I'm feeling 22
        Everything will be alright if
        You keep me next to you
        You don't know about me
        But I'll bet you want to
        Everything will be alright if
        We just keep dancing like we're 22, 22
        It seems like one of those nights
        This place is too crowded
        Too many cool kids
        (Who's Taylor Swift anyway? Ew) Ah-ah, ah-ah
        It seems like one of those nights
        We ditch the whole scene
        And end up dreamin' instead of sleeping, yeah
        We're happy, free, confused and lonely in the best way
        It's miserable and magical, oh yeah
        Tonight's the night when we forget about the heartbreaks
        It's time, oh-oh
        I don't know about you
        But I'm feeling 22
        Everything will be alright if
        You keep me next to you
        You don't know about me
        But I'll bet you want to
        Everything will be alright if
        We just keep dancing like we're 22 (Oh, oh, oh, oh)
        22
        I don't know about you
        22, 22
        It feels like one of those nights
        We ditch the whole scene
        It feels like one of those nights
        We won't be sleeping
        It feels like one of those nights
        You look like bad news
        I gotta have you
        I gotta have you
        Ooh, ooh, yeah, yeah
        I don't know about you
        But I'm feeling 22
        Everything will be alright if (Ooh)
        You keep me next to you
        You don't know about me
        But I'll bet you want to
        Everything will be alright if
        We just keep dancing like we're 22
        22 (Dancing like)
        22 (Yeah, yeah)
        22 (Yeah, yeah, yeah)
        It feels like one of those nights
        We ditch the whole scene
        It feels like one of those nights
        We won't be sleeping
        It feels like one of those nights
        You look like bad news
        I gotta have you
        I gotta have you`,
        mp3: "/mp3/22.mp3"
    },
];

const SongDB5 = [
    {
        name: "7 rings",
        image: "/apicture/7_rings.jpg",
        lyrics: `Yeah, breakfast at Tiffany's and bottles of bubbles
        Girls with tattoos who like getting in trouble
        Lashes and diamonds, ATM machines
        Buy myself all of my favorite things (yeah)
        Been through some bad shit, I should be a sad bitch
        Who woulda thought it'd turn me to a savage?
        Rather be tied up with calls and not strings
        Write my own checks like I write what I sing, yeah (yeah)
        My wrist, stop watchin', my neck is flossy
        Make big deposits, my gloss is poppin'
        You like my hair? Gee, thanks, just bought it
        I see it, I like it, I want it, I got it (yeah)
        I want it, I got it, I want it, I got it
        I want it, I got it, I want it, I got it
        You like my hair? Gee, thanks, just bought it
        I see it, I like it, I want it, I got it (yeah)
        Wearing a ring, but ain't gon' be no "Mrs."
        Bought matching diamonds for six of my bitches
        I'd rather spoil all my friends with my riches
        Think retail therapy my new addiction
        Whoever said money can't solve your problems
        Must not have had enough money to solve 'em
        They say, "Which one?" I say, "Nah, I want all of 'em"
        Happiness is the same price as red bottoms
        My smile is beamin', my skin is gleamin'
        The way it shine, I know you've seen it (you've seen it)
        I bought a crib just for the closet
        Both his and hers, I want it, I got it, yeah
        I want it, I got it, I want it, I got it
        I want it, I got it, I want it, I got it (baby)
        You like my hair? Gee, thanks, just bought it (oh yeah)
        I see it, I like it, I want it, I got it (yeah)
        Yeah, my receipts, be lookin' like phone numbers
        If it ain't money, then wrong number
        Black card is my business card
        The way it be settin' the tone for me
        I don't mean to brag, but I be like, "Put it in the bag, " yeah
        When you see them racks, they stacked up like my ass, yeah
        Shoot, go from the store to the booth
        Make it all back in one loop, give me the loot
        Never mind, I got the juice
        Nothing but net when we shoot
        Look at my neck, look at my jet
        Ain't got enough money to pay me respect
        Ain't no budget when I'm on the set
        If I like it, then that's what I get, yeah
        I want it, I got it, I want it, I got it (yeah)
        I want it, I got it, I want it, I got it (oh yeah, yeah)
        You like my hair? Gee, thanks, just bought it
        I see it, I like it, I want it, I got it (yeah)`,
        mp3: "/mp3/7_rings.mp3"
    }, 
    {
        name: "One Last Time",
        image: "/apicture/One_Last_Time.jpg",
        lyrics: `I was a liar
        I gave in to the fire
        I know I should've fought it
        At least I'm bein' honest
        Feel like a failure
        'Cause I know that I failed you
        I should've done you better
        'Cause you don't want a liar
        And I know, and I know, and I know she gives you everything
        But boy, I couldn't give it to you
        And I know, and I know, and I know that you got everything
        But I got nothin' here without you
        So one last time
        I need to be the one who takes you home
        One more time
        I promise after that, I'll let you go
        Baby, I don't care if you got her in your heart
        All I really care is you wake up in my arms
        One last time
        I need to be the one who takes you home
        I don't deserve it
        I know I don't deserve it
        But stay with me a minute
        I swear I'll make it worth it
        Can't you forgive me?
        At least just temporarily
        I know that this is my fault
        I should've been more careful
        And I know, and I know, and I know she gives you everything
        But boy, I couldn't give it to you
        And I know, and I know, and I know that you got everything
        But I got nothin' here without you, baby
        So one last time
        I need to be the one who takes you home
        One more time
        I promise after that, I'll let you go
        Baby, I don't care if you got her in your heart
        All I really care is you wake up in my arms
        One last time
        I need to be the one who takes you home
        I know I should've fought it
        At least I'm bein' honest, yeah
        But stay with me a minute
        I swear I'll make it worth it, yeah
        'Cause I don't wanna be without you
        So one last time
        I need to be the one who takes you home (babe)
        One more time
        I promise after that, I'll let you go
        Baby, I don't care if you got her in your heart (babe)
        All I really care is you wake up in my arms
        One last time
        I need to be the one who takes you home, yeah
        One last time
        I need to be the one who takes you home`,
        mp3: "/mp3/One_Last_Time.mp3"
    }, 
    {
        name: "position",
        image: "/apicture/position.jpg",
        lyrics: `Heaven sent you to me
        I'm just hopin' I don't repeat history
        Boy, I'm tryna meet your mama on a Sunday
        Then make a lotta love on a Monday (ah-ah)
        Never need no (no), no one else, babe
        'Cause I'll be
        Switchin' the positions for you
        Cookin' in the kitchen and I'm in the bedroom
        I'm in the Olympics, way I'm jumpin' through hoops
        Know my love infinite, nothin' I wouldn't do
        That I won't do, switchin' for you
        Perfect, perfect
        You're too good to be true (you're too good to be true)
        But I get tired of runnin'
        Fuck it, now I'm runnin' with you (wit' you)
        Said, boy, I'm tryna meet your mama on a Sunday
        Then make a lotta love on a Monday (ah-ah)
        Never need no (no), no one else, babе
        'Cause I'll be
        Switchin' the positions for you (for you, ah)
        Cookin' in thе kitchen and I'm in the bedroom
        I'm in the Olympics, way I'm jumpin' through hoops
        Know my love infinite, nothing I wouldn't do
        That I won't do, switchin' for you
        Cookin' in the kitchen and I'm in the bedroom (bedroom)
        I'm in the Olympics way, I'm jumpin' through hoops
        Know my love infinite, nothing I wouldn't do
        That I won't do, switching for you
        This some shit that I usually don't do (yeah)
        But for you, I kinda, kinda want to
        'Cause you're down for me and I'm down too (and I'm down too)
        Yeah, I'm down too, switching the positions for you
        This some shit that I (yeah) usually don't do (don't do)
        But for you, I kinda, kinda want to
        'Cause you're down for me and I'm down too
        Switchin' the positions for you
        Cookin' in the kitchen and I'm in the bedroom
        I'm in the Olympics way, I'm jumpin' through hoops (to you, to you)
        Know my love infinite, nothing I wouldn't do (do)
        That I won't do, switchin' for you
        Cookin' in the kitchen and I'm in the bedroom
        I'm in the Olympics way, I'm jumpin' through hoops
        Know my love infinite, nothin' I wouldn't do
        That I won't do, switchin' for you
        Yeah
        Ah, yeah
        Ah (ah), yeah`,
        mp3: "/mp3/position.mp3"
    }, 
    {
        name: "34+35",
        image: "/apicture/3435.jpg",
        lyrics: `Hmm
        You might think I'm crazy
        The way I've been cravin'
        If I put it quite plainly
        Just gimme them babies
        So, what you doing tonight?
        Better say, "Doin' you right" (yeah)
        Watchin' movies, but we ain't seen a thing tonight (yeah)
        I don't wanna keep you up (you up)
        But show me, can you keep it up? (It up)
        'Cause then I'll have to keep you up
        Shit, maybe I'ma keep you up, boy
        I've been drinking coffee (I've been drinking coffee)
        And I've been eating healthy (and I've been eating healthy)
        Know I keep it squeaky, yeah (know I keep it squeaky)
        Saving up my energy (yeah, yeah, saving up my energy)
        Can you stay up all night?
        Fuck me 'til the daylight
        34, 35 (yeah, yeah, yeah, yеah)
        Can you stay up all night? (All night)
        Fuck me 'til the daylight
        34, 35 (yеah, yeah, yeah, yeah)
        You drink it just like water (water)
        You say, "It tastes like candy"
        So what you doing tonight? (Tonight)
        Better say, "Doin' you right" (alright)
        Watchin' movies, but we ain't seen a thing tonight (yeah)
        I don't wanna keep you up (you up)
        But show me, can you keep it up? (It up)
        'Cause then I'll have to keep you up
        Shit, maybe I'ma keep you up, boy
        I've been drinking coffee (said, I've been drinking coffee)
        And I've been eating healthy (and I've been eating healthy)
        Know I keep it squeaky, yeah (except this wine, babe)
        Saving up my energy (yeah, yeah, yeah)
        Can you stay up all night? (All night)
        Fuck me 'til the daylight (daylight)
        34, 35 (yeah, yeah, yeah, yeah, 35, babe)
        Can you stay up all night? (Can you stay?)
        Fuck me 'til the daylight (can you stay?)
        34, 35 (yeah, yeah, yeah, yeah)
        Oh-yeah-yeah
        Baby, you might need a seatbelt when I ride it
        I'ma leave it open like a door, come inside it
        Even though I'm wifey, you can hit it like a side chick
        Don't need no side dick, no
        Got the neighbors yellin', "Earthquake" (earthquake)
        4.5 when I make the bed shake (bed shake)
        Put it down heavy even though it's lightweight (it's lightweight)
        (It's lightweight, yeah, yeah, yeah, babe)
        Yeah, we started at midnight, go 'til the sunrise (sunrise)
        Done at the same time (yeah)
        But who's counting the time when we got it for life? (Got it for life)
        I know all your favorite spots (favorite spots)
        We can take it from the top (from the top)
        You such a dream come true, true
        Make a bitch wanna hit snooze, ooh
        Can you stay up all night?
        Fuck me 'til the daylight (yeah-yeah)
        34, 35 (yeah, yeah, yeah, yeah, 34, 35)
        Can you stay up all night? (Do you know what that mean?)
        Fuck me 'til the daylight (you know what that mean)
        34, 35 (yeah, yeah, yeah, yeah)
        Yeah, yeah, yeah
        Means I wanna 69 wit' ya', no shit
        Math class, never was good`,
        mp3: "/mp3/3435.mp3"
    }, 
    {
        name: "God is a woman",
        image: "/apicture/God_is_a_woman.jpg",
        lyrics: `You, you love it how I move you
        You love it how I touch you
        My one, when all is said and done
        You'll believe God is a woman
        And I, I feel it after midnight
        A feelin' that you can't fight
        My one, it lingers when we're done
        You'll believe God is a woman
        I don't wanna waste no time, yeah
        You ain't got a one-track mind, yeah
        Have it any way you like, yeah
        And I can tell that you know I know how I want it
        Ain't nobody else can relate
        Boy, I like that you ain't afraid
        Baby, lay me down and let's pray
        I'm tellin' you the way I like it, how I want it
        And I can be all the things you told me not to be
        (Yeah)
        When you try to come for me, I keep on flourishing
        (Yeah)
        And he see the universe when I'm the company
        It's all in me
        You, you love it how I move you
        You love it how I touch you
        My one, when all is said and done
        You'll believe God is a woman
        And I, I feel it after midnight
        A feelin' that you can't fight
        My one, it lingers when we're done
        You'll believe God is a woman
        I'll tell you all the things you should know
        So, baby, take my hand, save your soul
        We can make it last, take it slow, hmm
        And I can tell that you know I know how I want it, yeah
        But you're different from the rest
        And boy, if you confess, you might get blessed
        See if you deserve what comes next
        I'm tellin' you the way I like it, how I want it
        And I can be all the things you told me not to be
        (Yeah)
        When you try to come for me, I keep on flourishing
        (Yeah)
        And he see the universe when I'm the company
        It's all in me
        You, you love it how I move you
        You love it how I touch you
        My one, when all is said and done
        You'll believe God is a woman
        And I, I feel it after midnight
        A feelin' that you can't fight
        My one, it lingers when we're done
        You'll believe God is a woman, yeah, yeah
        Yeah, yeah
        (God is a woman, yeah)
        My one
        (One)
        When all is said and done
        You'll believe God is a woman
        You'll believe God
        (God is a woman)
        Oh, yeah
        (God is a woman, yeah)
        (One)
        It lingers when we're done
        You'll believe God is a woman`,
        mp3: "/mp3/God_is_a_woman.mp3"
    },
];

const SongDB6 = [
    {
        name: "On My Way",
        image: "/apicture/On_My_Way.jpg",
        lyrics: `I'm sorry but
        Don't wanna talk, I need a moment 'fore I go
        It's nothing personal
        I draw the blinds
        They don't need to see me cry
        'Cause even if they understand
        They don't understand
        So then when I'm finished
        I'm all 'bout my business and ready to save the world
        I'm taking my misery
        Make it my bitch, can't be everyone's favorite girl
        So take aim and fire away
        I've never been so wide awake
        No, nobody but me can keep me safe
        And I'm on my way
        The blood moon is on the rise
        The fire burning in my eyes
        No, nobody but me can keep me safe
        And I'm on my way
        Lo siento mucho (Farru), pero me voy
        Porque a tu lado me di cuenta que nada soy
        Y me cansé de luchar y de guerrear en vano
        De estar en la línea de fuego y de meter la mano
        Acepto mis errores, también soy humano
        Y tú no ve' que lo hago porque te amo
        Pero ya (Ya) no tengo más na' que hacer aquí (aquí)
        Me voy, llegó la hora 'e partir (partir)
        De mi propio camino, seguir lejos de ti
        So take aim and fire away
        I've never been so wide awake
        No, nobody but me can keep me safe
        And I'm on my way
        The blood moon is on the rise (is on the rise, na-na)
        The fire burning in my eyes (the fire burning in my eyes)
        No, nobody but me can keep me safe
        And I'm on my way
        I'm on my way
        Everybody keep me safe
        Everybody keep me safe
        Everybody keep me safe
        Everybody, everybody on my way
        So take aim and fire away
        I've never been so wide awake
        No, nobody but me can keep me safe
        And I'm on my way
        The blood moon is on the rise
        The fire burning in my eyes
        No, nobody but me can keep me safe
        And I'm on my way`,
        mp3: "/mp3/On_My_Way.mp3"
    },
    {
        name: "Thumbs",
        image: "/apicture/Thumbs.jpg",
        lyrics: `Somewhere in the world there, is a father and a mother
        And the father is a son, who has a mother
        The mother has a daughter who gets married to the brother of a mother
        And they all just tryna multiply with one another
        'Cause that's just the way of the world
        It never ends till the end, then you start again
        That's just the way of the world
        That's just the way of the world
        Somewhere in the world, they think they're working for themselves
        They get up everyday to go to work for someone else
        And somebody works for them and, so, they think they got it made
        But they're all just working to get paid the very same
        And so, they keep on twiddlin' them thumbs
        Skiddly-dee-da-dum
        They gonna keep on twiddlin' them thumbs
        Skiddly-dee-da-dum-dum
        And so, they keep on twiddlin' them thumbs
        Skiddly-dee-da-dum (skiddly-dee-da-dum)
        They gonna keep on twiddlin' them thumbs
        Skiddly-dee-da-dum-dum
        Somewhere in the world, you got a robber and a bank
        And the bank robbed the people, so the people rob the bank
        And the police came to get him, but they let him get away
        'Cause they're all just workin' to get paid the very same
        'Cause that's just the way of the world
        It never ends till the end, then you start again
        That's just the way of the world
        That's just the way of the world
        And so, they keep on twiddlin' them thumbs
        Skiddly-dee-da-dum (skiddly-dee-da-dum)
        They gonna keep on twiddlin' them thumbs
        Skiddly-dee-da-dum-dum
        And so, they keep on twiddlin' them thumbs
        Skiddly-dee-da-dum (skiddly-dee-da-dum)
        They gonna keep on twiddlin' them thumbs
        Skiddly-dee-da-dum-dum
        Don't believe everything that you hear
        Let it go through your left and right ear
        Don't just march to the beat of that drum
        Don't be one of them people just twiddlin' them thumbs
        'Cause that's just the way of the world (way of the world)
        It never ends till the end, and then you start again
        That's just the way of the world
        That's just the way of the world
        And so, they keep on twiddlin' them thumbs (keep on)
        Skiddly-dee-da-dum (skiddly-dee-da-dum)
        They gonna keep on twiddlin' them thumbs
        Skiddly-dee-da-dum-dum (Woo-oo, woo-oo)
        And so, they keep on twiddlin' them thumbs (keep on, keep on)
        Skiddly-dee-da-dum (skiddly-dee-da-dum)
        They gonna keep on twiddlin' them thumbs (la-a-a-a-a)
        Skiddly-dee-da-dum-dum
        (Siddly-dee-da-da-da-de-da-dum-dum)
        They keep on twiddlin' them thumbs (keep on, keep on)
        Skiddly-dee-da-dum
        They keep on, they keep on
        They gonna keep on twiddlin' them thumbs
        Skiddly-dee-da-dum-dum
        Cause that's just the way of the world`,
        mp3: "/mp3/Thumbs.mp3"
    },
    {
        name: "Skin",
        image: "/apicture/Skin.jpg",
        lyrics: `Maybe we could've been friends
        If I met you in another life
        Maybe then we could pretend
        There's no gravity in the words we write
        Maybe you didn't mean it
        Maybe blonde was the only rhyme
        The only rhyme
        Want my heart to be breaking, breaking, no
        I'm happy and you hate it, hate it, oh
        And I'm not asking you to let it go
        But you been telling your side
        So I'll be telling mine, oh
        You can try
        To get under my, under my, under my skin
        While he's on mine
        Yeah, all on my, all on my, all on my skin
        I wish you knew that even you
        Can't get under my skin
        If I don't let you in
        You're telling it how you see it
        Like truth is whatever you decide
        Some people will believe it
        And some will read in between the lines
        You're putting me in the spotlight
        But I've been under it all my life, said, all my life
        Want my heart to be breaking, breaking, no
        I'm happy and you hate it, hate it, oh
        And I'm not asking you to let it go
        But you been telling your side
        So I'll be telling mine (mine)
        You can try
        To get under my, under my, under my skin
        While he's on mine
        Yeah, all on my, all on my, all on my skin
        I wish you knew that even you
        Can't get under my skin
        If I don't let you in-oh
        You can try
        To get under my, under my, under my skin
        While he's on mine
        Yeah, all on my, all on my, all on my skin
        I wish you knew that even you
        Can't get under my skin
        If I don't let you in-oh
        I just hope that one day
        We both can laugh about it
        When it's not in our face
        Won't have to dance around it
        Don't drive yourself insane
        It won't always be this way
        You can try
        To get under my, under my, under my skin
        While he's on mine
        Yeah, all on my, all on my, all on my skin
        I wish you knew that even you
        Can't get under my skin
        If I don't let you in`,
        mp3: "/mp3/Skin.mp3"
    },
    {
        name: "Fast Times",
        image: "/apicture/Fast_Times.png",
        lyrics: `Sun's up too soon like daylight savings
        Mixed emotions are congregatin'
        Picturin' us in all these places
        Ahead of myself's an understatement
        Sky looks so purple, I can taste it
        Couple days in, I call you, "Baby"
        Three stories up here contemplatin'
        But what the fuck is patience?
        These are fast times and fast nights, yeah
        No time for rewrites, we couldn't help it
        Outlines on bed sides, yeah
        Give me a second to forget I ever really meant it
        Fast times and fast nights, yeah
        Closed eyes and closed blinds, we couldn't help it
        Outlines on bed sides, yeah
        Give me a second to forget I ever really meant it
        My feelings used to be serrated
        But you speak in such a perfect cadence
        Tiptoein' past so many stages
        But what the fuck is patience?
        These are fast times and fast nights, yeah
        No time for rewrites, we couldn't help it
        Outlines on bed sides, yeah
        Give me a second to forget I ever really meant it
        Fast times and fast nights, yeah
        Closed eyes and closed blinds, we couldn't help it
        Outlines on bed sides, yeah
        Give me a second to forget I ever really meant it
        These, these are
        These are the fast times
        These, these are
        These are the
        Fast times and fast nights, yeah
        No time for rewrites, we couldn't help it
        Outlines on bed sides, yeah
        Give me a second to forget I ever really meant it
        Fast times and fast nights, yeah
        Closed eyes and closed blinds, we couldn't help it
        Outlines on bed sides, yeah
        Give me a second to forget I ever really meant it`,
        mp3: "/mp3/Fast_Times.mp3"
    },
    {
        name: "Why",
        image: "/apicture/Why.jpg",
        lyrics: `You like New York city in the daytime
        I like New York city in the nighttime
        You say you like sleeping with the air off
        I don't, I need it on
        You like the light coming through the windows
        I sleep late, so I just keep 'em all closed
        You ignore the music on the radio
        I don't, I sing-a-long
        I don't ask for you to change, baby no no no
        And you don't ask for me to change
        Tell me how we're not alike
        But we work so well and we don't even know why
        Funny how the stars crossed right
        'Cause we work so well and we don't even know why
        You can call it fire and ice
        But we work so well and we don't even know why
        We don't even know why, no no
        We don't even know why, no no no
        No no no no
        We like it in the daytime
        We like it in the end of time
        No no no no
        We like it in the daytime
        We like it in the end of time
        Cold outside and you're just in a t-shirt
        I have cold blood even in a sweater
        You start your night sippin' by the kilo
        I don't, I know you know
        I don't ask for you to change, baby no no no
        And you don't ask for me to change
        Tell me how we're not alike
        But we work so well and we don't even know why
        Funny how the stars crossed right
        'Cause we work so well and we don't even know why
        You can call it fire and ice
        But we work so well and we don't even know why
        We don't even know why, no no (no no no)
        We don't even know why, no no no
        No no no no
        We like it in the daytime (we don't even know)
        We like it in the end of time (we don't even know)
        No no no no We like it in the daytime
        (We don't even know, know, know, know, know, know, know, know, know)
        Somehow we end up on the same side
        And you wouldn't think that we'd be alright
        Even our eyes are different colors, but we see fine
        Somehow we end up on the same side (up on the same side)
        And you wouldn't think that we'd be alright (think that we'd be alright)
        Even our eyes are different colors, but we see fine
        tell me how we're not alike
        But we work so well and we don't even know why ('cause we work so well and we don't even know why, why)
        Funny how the stars crossed right 'cause we work so well and we don't even know why
        You can call it fire and ice
        But we work so well and we don't even know why ('cause we work so well and we don't even know why, why)
        We don't even know why, no no
        We don't even know why, no no no
        No no no no
        We like it in the daytime (oh)
        We like it in the end of time (we don't even know why)
        No no no no
        We like it in the daytime
        We like it in the nighttime`,
        mp3: "/mp3/Why.mp3"
    },
    {
        name: "Sue Me",
        image: "/apicture/Sue_Me.jpg",
        lyrics: `Remember when you said it
        There's no second chance
        Oh baby I heard you been hoping
        You could change the past
        You miss the long goodnights
        You miss the long goodbyes
        You miss the long goodnights
        (Yup, yup, yup, yup, yup)
        Well did you ever think that it was hard for me?
        To walk it off like nothing happened nonchalantly
        I got you feeling like
        I got you feeling right
        I got you feeling like
        (Yup, yup, yup, yup, yup)
        That's my shape, I made the shadow
        That's my name, don't wear it out though
        Feelin' myself can't be illegal, illegal
        So sue me
        For looking too pretty tonight
        Wearing your favorite color under the lights
        For moving on, doing everything right
        So sue me
        For being good friends with your friends
        And running into you the place that we met
        For being something you can't forget
        So sue me (go!)
        It's hard to see me on when you've been off as hell
        But I'm not gonna dull myself because you dull yourself
        I know it's hard to see
        What you don't want to see
        I know it's hard to see
        (Yup, yup, yup, yup, yup)
        That's my shape, I made the shadow
        That's my name, don't wear it out though
        Feelin' myself, can't be illegal, illegal
        So sue me
        For looking too pretty tonight
        Wearing your favorite color under the lights
        For moving on, doing everything right
        So sue me
        For being good friends with your friends
        And running into you the place that we met
        For being something you can't forget
        So sue me (oh)
        I, I, I, I guess I'm hard to ignore
        Pick up that jaw off the floor
        So sue me
        For looking too pretty tonight
        Wearing your favorite color under the lights
        For moving on, doing everything right
        So sue me
        For being good friends with your friends
        And running into you the place that we met
        For being something you can't forget
        So sue me
        Sue me, baby, hmm`,
        mp3: "/mp3/Sue_Me.mp3"
    },
];

const SongDB7 = [
    {
        name: "Easy on Me",
        image: "/apicture/Easy_on_Me.jpg",
        lyrics: `There ain't no gold in this river
        That I've been washin' my hands in forever
        I know there is hope in these waters
        But I can't bring myself to swim
        When I am drowning in this silence
        Baby, let me in
        Go easy on me, baby
        I was still a child
        Didn't get the chance to
        Feel the world around me
        I had no time to choose
        What I chose to do
        So go easy on me
        There ain't no room for things to change
        When we are both so deeply stuck in our ways
        You can't deny how hard I have tried
        I changed who I was to put you both first
        But now I give up
        Go easy on me, baby
        I was still a child
        Didn't get the chance to
        Feel the world around me
        Had no time to choose
        What I chose to do
        So go easy on me
        I had good intentions
        And the highest hopes
        But I know right now
        That probably doesn't even show
        Go easy on me, baby
        I was still a child
        I didn't get the chance to
        Feel the world around me
        I had no time to choose
        What I chose to do
        So go easy on me`,
        mp3: "/mp3/Easy_on_Me.mp3"
    },
    {
        name: "Oh My God",
        image: "/apicture/Oh_My_God.jpg",
        lyrics: `I ain't got too much time to spare
        But I'll make time for you to show how much I care
        Wish that I would let you break my walls
        But I'm still spinning out of control from the fall
        Boy, you give good love, I won't lie
        It's what keeps me coming back, even though I'm terrified
        I know that it's wrong
        But I want to have fun
        Mmh, yeah
        Mmh, yeah
        I know that it's wrong
        But I want to have fun
        Mmh, yeah
        Mmh, yeah
        Oh my God, I can't believe it
        Out of all the people in the world
        What is the likelihood of jumping
        Out of my life and into your arms?
        Maybe, baby, I'm just losing my mind
        'Cause this is trouble, but it feels right
        Teetering on the edge of Heaven and Hell
        Is a battle that I cannot fight
        I'm a fool, but they all think I'm blind
        I'd rather be a fool than leave myself behind
        I don't have to explain myself to you
        I am a grown woman and I do what I want to do
        I know that it's wrong
        But I want to have fun
        Mmh, yeah
        Mmh, yeah
        I know that it's wrong
        But I want to have fun
        Mmh, yeah
        Mmh, yeah
        Oh my God, I can't believe it
        Out of all the people in the world
        What is the likelihood of jumping
        Out of my life and into your arms?
        Maybe, baby, I'm just losing my mind
        'Cause this is trouble, but it feels right
        Teetering on the edge of Heaven and Hell
        Is a battle that I cannot fight
        Lord don't let me, I said Lord don't let me
        I said Lord don't let me let me down (oh Lord)
        Lord don't let me, I said Lord don't let me
        I said Lord don't let me let me down (don't let me let myself down)
        Lord don't let me, I said Lord don't let me
        I said Lord don't let me let me down (oh my God)
        Lord don't let me, I said Lord don't let me (oh, oh, oh)
        I said Lord don't let me let me down
        Oh my God, I can't believe it
        Out of all the people in the world
        What is the likelihood of jumping
        Out of my life and into your arms?
        Maybe, baby, I'm just losing my mind
        'Cause this is trouble, but it feels right
        Teetering on the edge of Heaven and Hell
        Well it's a battle that I cannot fight
        Lord don't let me, I said Lord don't let me (I know that it's wrong)
        I said Lord don't let me let me down (but I want to have fun)
        Lord don't let me, I said Lord don't let me (mmh, yeah)
        I said Lord don't let me let me down (mmh, yeah)
        Lord don't let me, I said Lord don't let me (I know that it's wrong)
        I said Lord don't let me let me down (but I want to have fun)
        Lord don't let me, I said Lord don't let me (mmh, yeah)
        I said Lord don't let me let me down (mmh, yeah)`,
        mp3: "/mp3/Oh_My_God.mp3"
    },
    {
        name: "Hello",
        image: "/apicture/Hello.jpg",
        lyrics: `Hello, it's me
        I was wondering if after all these years you'd like to meet
        To go over everything
        They say that time's supposed to heal ya, but I ain't done much healing
        Hello, can you hear me?
        I'm in California dreaming about who we used to be
        When we were younger and free
        I've forgotten how it felt before the world fell at our feet
        There's such a difference between us
        And a million miles
        Hello from the other side
        I must've called a thousand times
        To tell you I'm sorry for everything that I've done
        But when I call, you never seem to be home
        Hello from the outside
        At least I can say that I've tried
        To tell you I'm sorry for breaking your heart
        But it don't matter, it clearly doesn't tear you apart anymore
        Hello, how are you?
        It's so typical of me to talk about myself, I'm sorry
        I hope that you're well
        Did you ever make it out of that town where nothing ever happened?
        It's no secret that the both of us
        Are running out of time
        So hello from the other side (other side)
        I must've called a thousand times (thousand times)
        To tell you I'm sorry for everything that I've done
        But when I call, you never seem to be home
        Hello from the outside (outside)
        At least I can say that I've tried (I've tried)
        To tell you I'm sorry for breaking your heart
        But it don't matter, it clearly doesn't tear you apart anymore
        Ooh (lows, lows, lows, lows), anymore
        (Highs, highs, highs, highs)
        Ooh (lows, lows, lows, lows), anymore
        (Highs, highs, highs, highs)
        Ooh (lows, lows, lows, lows), anymore
        (Highs, highs, highs, highs)
        Anymore (lows, lows, lows, lows)
        Hello from the other side (other side)
        I must've called a thousand times (thousand times)
        To tell you I'm sorry for everything that I've done
        But when I call, you never seem to be home
        Hello from the outside (outside)
        At least I can say that I've tried (I've tried)
        To tell you I'm sorry for breaking your heart
        But it don't matter, it clearly doesn't tear you apart anymore`,
        mp3: "/mp3/Hello.mp3"
    },
    {
        name: "Someone Like You",
        image: "/apicture/Someone_Like_You.jpg",
        lyrics: `I heard that you're settled down
        That you found a girl and you're married now
        I heard that your dreams came true
        Guess she gave you things, I didn't give to you
        Old friend, why are you so shy?
        Ain't like you to hold back or hide from the light
        I hate to turn up out of the blue, uninvited
        But I couldn't stay away, I couldn't fight it
        I had hoped you'd see my face
        And that you'd be reminded that for me, it isn't over
        Never mind, I'll find someone like you
        I wish nothing but the best for you, too
        "Don't forget me, " I beg
        I remember you said
        "Sometimes it lasts in love, but sometimes it hurts instead"
        "Sometimes it lasts in love, but sometimes it hurts instead"
        You know how the time flies
        Only yesterday was the time of our lives
        We were born and raised in a summer haze
        Bound by the surprise of our glory days
        I hate to turn up out of the blue, uninvited
        But I couldn't stay away, I couldn't fight it
        I had hoped you'd see my face
        And that you'd be reminded that for me, it isn't over
        Never mind, I'll find someone like you
        I wish nothing but the best for you, too
        "Don't forget me, " I begged
        I remember you said
        "Sometimes it lasts in love, but sometimes it hurts instead"
        Nothing compares, no worries or cares
        Regrets and mistakes, they're memories made
        Who would have known how bittersweet this would taste?
        Never mind, I'll find someone like you
        I wish nothing but the best for you
        "Don't forget me, " I beg
        I remember you said
        "Sometimes it lasts in love, but sometimes it hurts instead"
        Never mind, I'll find someone like you
        I wish nothing but the best for you, too
        "Don't forget me, " I begged
        I remember you said
        "Sometimes it lasts in love, but sometimes it hurts instead"
        "Sometimes it lasts in love, but sometimes it hurts instead"`,
        mp3: "/mp3/Someone_Like_You.mp3"
    },
    {
        name: "When We Were Young",
        image: "/apicture/When_We_Were_Young.jpg",
        lyrics: `Everybody loves the things you do
        From the way you talk
        To the way you move
        Everybody here is watching you
        'Cause you feel like home
        You're like a dream come true
        But if by chance you're here alone
        Can I have a moment?
        Before I go?
        'Cause I've been by myself all night long
        Hoping you're someone I used to know
        You look like a movie
        You sound like a song
        My God this reminds me, of when we were young
        Let me photograph you in this light
        In case it is the last time
        That we might be exactly like we were
        Before we realized
        We were scared of getting old
        It made us restless
        It was just like a movie
        It was just like a song
        I was so scared to face my fears
        Nobody told me that you'd be here
        And I'd swear you moved overseas
        That's what you said, when you left me
        You still look like a movie
        You still sound like a song
        My God, this reminds me, of when we were young
        Let me photograph you in this light
        In case it is the last time
        That we might be exactly like we were
        Before we realized
        We were sad of getting old
        It made us restless
        It was just like a movie
        It was just like a song
        When we were young
        (When we were young)
        When we were young
        (When we were young)
        It's hard to win me back
        Everything just takes me back
        To when you were there
        To when you were there
        And a part of me keeps holding on
        Just in case it hasn't gone
        I guess I still care
        Do you still care?
        It was just like a movie
        It was just like a song
        My God, this reminds me
        Of when we were young
        When we were young
        (When we were young)
        When we were young
        (When we were young)
        Let me photograph you in this light
        In case it is the last time
        That we might be exactly like we were
        Before we realized
        We were sad of getting old
        It made us restless
        Oh I'm so mad I'm getting old
        It makes me reckless
        It was just like a movie
        It was just like a song
        When we were young`,
        mp3: "/mp3/When_We_Were_Young.mp3"
    },
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
                    SongDB4.forEach(function (seed) {
                        Song.create(seed, function (err, song) {
                            if (err) {
                                console.log(err);
                            } else {
                                Artist.findOne().where('artistname').equals('Taylor Swift').exec(function (err, artist) {
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
                    SongDB5.forEach(function (seed) {
                        Song.create(seed, function (err, song) {
                            if (err) {
                                console.log(err);
                            } else {
                                Artist.findOne().where('artistname').equals('Ariana Grande').exec(function (err, artist) {
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
                    SongDB6.forEach(function (seed) {
                        Song.create(seed, function (err, song) {
                            if (err) {
                                console.log(err);
                            } else {
                                Artist.findOne().where('artistname').equals('Sabrina Carpenter').exec(function (err, artist) {
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
                    SongDB7.forEach(function (seed) {
                        Song.create(seed, function (err, song) {
                            if (err) {
                                console.log(err);
                            } else {
                                Artist.findOne().where('artistname').equals('Adele').exec(function (err, artist) {
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

                    // User.remove({isAdmin:false}, function(err){
                    //     if (err) {
                    //         console.log(err);
                    //     } else {
                    //         console.log("remove user!!!");
                    //     }
                    // })
                }
            });
        }
    });
}

module.exports = seedDB; //export ในรูปของโมเดลให้ file อื่นใช้งานได้