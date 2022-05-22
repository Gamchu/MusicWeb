const { redirect } = require('express/lib/response');
const { authenticate } = require('passport/lib');

const   express     = require('express'),
        app         = express(),
        bodyParser  = require("body-parser"),
        mongoose    = require("mongoose"),
        passport    = require('passport'),
        LocalStrategy = require('passport-local'),
        flash       = require('connect-flash'),
        methodOverride = require('method-override'),
        Song        = require('./models/song'),
        User        = require('./models/user'),
        Artist      = require('./models/artist'),
        seedDB      = require('./seeds.js');

const   indexRoutes     = require('./routes/index'),
        artistRoutes    = require('./routes/artist'),
        songRoutes      = require('./routes/song'),
        searchRoutes    = require('./routes/search'),
        userRoutes      = require('./routes/user');

mongoose.connect('mongodb://localhost/Yfitops'); //connect DB
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extened: true }));
app.use(methodOverride('_method'));
app.use(flash());
// seedDB();

app.use(require('express-session')({
    secret: 'secret word',
    resave: false,
    saveUninitialized: false
}));

//ประกาศใช้งานในส่วน passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/', indexRoutes);
app.use('/songs', songRoutes);
app.use('/artist', artistRoutes);
app.use('/user', userRoutes);
app.use('/search', searchRoutes);

app.listen(3000, function () {
    console.log("Server Activated");
})

app.use(express.static('public'))
app.use("/styles", express.static(__dirname + "/public/stylesheets"));

