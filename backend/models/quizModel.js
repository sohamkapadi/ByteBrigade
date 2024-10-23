// models/quizModel.js
class QuizQuestion {
    constructor(question, options, correctAnswer, topic) {
      this.question = question;
      this.options = options;
      this.correctAnswer = correctAnswer;
      this.topic = topic;
    }
  }
  
export default QuizQuestion;
  