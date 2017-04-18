const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {Question, User, gitHubUser} = require('./models');
const DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL || 'mongodb://localhost/repetitiondb';

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET
}


if(process.env.NODE_ENV != 'production') {
  secret = require('./secret');

}

const app = express();

const database = {
};

app.use(passport.initialize());

passport.use(
    new GoogleStrategy({
        clientID:  secret.CLIENT_ID,
        clientSecret: secret.CLIENT_SECRET,
        callbackURL: `/api/auth/google/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
      User.find({ googleId: profile.id }, (err, user) => {
        if (!user.length) {
         const questArr = [];
         Question.find((err, questions) => {
          questions.forEach((question) => {
           questArr.push({
            questionId: question._id,
            letters: question.letters,
            name: question.name,
            atomic: question.atomic,
            mValue: 1,
            });
          });
            User.create({
              name: profile.displayName,
              googleId: profile.id,
              accessToken,
              profilePicUrl: profile.profilePicUrl,
              question: questArr,
            }, (err, user) => {
              console.log(user);
              return cb(err, user);
            });
          });
        }
        else {
          return cb(err, user[0]);
        }
      });
    }
  ));
passport.use(
    new BearerStrategy(
        (token, done) => {
          User
          .find({accessToken: token}, (err, user) => {
            if(err) {return done(err);}
            if (!user) {return done(null, false);}
            return done(null,user);
        }
    )
 })
);

app.get('/api/auth/google',
    passport.authenticate('google', {scope: ['profile']}));

app.get('/api/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        res.cookie('accessToken', req.user.accessToken, {expires: 0});
        res.redirect('/');
    }
);

app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

app.get('/api/profiles/:userId')


app.get('/api/me',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json({
        googleId: req.user.googleId
    })
);

app.get('/api/questions',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json(
      [{letters:'H', name:'Hydrogen', atomic: 1},
      {letters:'He', name:'Helium', atomic: 2}])
);

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DATABASE_URL, err => {
            if(err) {
              return reject(err);
            }
            console.log('Db connected');
            server = app.listen(port, () => {
              resolve();
            }).on('error', reject);
        });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
