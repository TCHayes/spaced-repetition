const mongoose = require('mongoose')

const userSchema = new mongoose.Schema( {
  name: String,
  googleId: String,
  accessToken: String,
  profilePicUrl: String,
  questions: Array,
})

userSchema.methods.apiRepr = function(name) {
  let lowmValue = {mValue: Infinity}
  for (let i = 0; i < this.questions.length; i++) {
    if((this.questions[i].mValue < lowmValue.mValue) && (this.questions[i].name != name)) {
      lowmValue = this.questions[i]
    }
  }
  return {
    letters: lowmValue.letters,
    atomic: lowmValue.atomic,
    name: lowmValue.name,
    questionId: lowmValue.questionId,
    mValue: lowmValue.mValue,
  }
}

const questionSchema = new mongoose.Schema({
  letters: {type: String, required: true},
  name: {type: String, required: true},
  atomic: {type: Number, required: true},
})

questionSchema.methods.apiRepr = function() {
  return {
    letters: this.letters,
    atomic: this.atomic,
  }
}

const User = mongoose.model('User', userSchema);
const Question = mongoose.model('Question', questionSchema);

module.exports = {User,Question}
