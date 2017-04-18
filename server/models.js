const mongoose = require('mongoose')

const userSchema = new mongoose.Schema( {

  name: String,
  googleId: String,
  accessToken: String,
  profilePicUrl: String,
  scores: Array

})

userSchema.methods.apiRepr = function() {
  return {
    name: this.name,
    profilePicUrl: this.profilePicUrl,
    scores: this.scores
  };
}

const questionSchema = new mongoose.Schema({
  letters: {type: String, required: true},
  name: {type: String, required: true},
  atomic: {type: Number, required: true}
})

const User = mongoose.model('User', userSchema);
const Question = mongoose.model('Question', questionSchema);

module.exports = {User,Question}
