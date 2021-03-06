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

mongoose.Promise = global.Promise;

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET
}

if(process.env.NODE_ENV != 'production') {
  secret = require('./secret');
}

const app = express();

app.use(bodyParser.json());
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
              profilePicUrl: profile._json.image.url,
              questions: questArr,
            }, (err, user) => {
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

app.get('/api/me',
    passport.authenticate('bearer', {session: false}),
    (req, res) => {
      User
      .findOne({'googleId': req.user[0].googleId}) //how is req.user an array?
      .exec()
      .then(user => {
        res.json(user)
      })
      .catch(console.error)
    }
);

const currentQuestionMap = {}

app.get('/api/question',
  passport.authenticate('bearer', {session: false}),
  (req, res) => {
    User
    .findOne({ googleId: req.user[0].googleId })
    .exec()
    .then(user => {
      let currentQuestion = {};
      if (currentQuestionMap.hasOwnProperty(req.user[0].googleId)){
        currentQuestion = user.apiRepr(currentQuestionMap[req.user[0].googleId].name);
      }
      else{
        currentQuestion = user.apiRepr('Non-existent Element');
      }
      currentQuestionMap[req.user[0].googleId] = currentQuestion;
      res.json({letters: currentQuestion.letters, atomic: currentQuestion.atomic});
    })
    .catch(console.error)
})

app.put('/api/answer',
  passport.authenticate('bearer', {session: false}),
  (req, res) => {
    const currentQuestion = currentQuestionMap[req.user[0].googleId];
    if (req.body.answer.toLowerCase() === currentQuestion.name.toLowerCase()){
      const search = {googleId: req.user[0].googleId, "questions.questionId": currentQuestion.questionId}
      User
      .findOneAndUpdate(search, {$mul: {"questions.$.mValue" : 2}}, {new: true})
      .exec()
      .then(user => {
        res.json({correct: true, actualAnswer: currentQuestion.name});
      })
      .catch(console.error)
    }
    else {
      const search = {googleId: req.user[0].googleId, "questions.questionId": currentQuestion.questionId}
      User
      .findOneAndUpdate(search, {$set: {"questions.$.mValue" : 1}}, {new: true})
      .exec()
      .then(user => {
        res.json({correct: false, actualAnswer: currentQuestion.name});
      })
      .catch(console.error)
    }
})

//possible alternate sort outside of API Repr
// User.findOne({_id: ...}).then(user => {
//     user.questions[0].nValue = 2
//     user.questions.sort((a, b) => {return a.nValue > b.nValue})
//     return user.save();
//   }).then(user => {
//     console.log(user)
//   })

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
