import OpenAI from 'openai';
import QuizQuestion from '../models/quizModel.js';

// Configure OpenAI directly with the API key
const openai = new OpenAI({
  apiKey: "sk-Yyh7kS-14_oBNV5e80zl01ciIHqcPb92IFmVs9uy-9T3BlbkFJ2AgGKZp3P7Pyt1LZuB4_ohoN09T3lO2QN39UbOUlsA", // Replace with your actual OpenAI API key
});

// Controller to handle generating quiz questions
export const getQuizQuestions = async (req, res) => {
  try {
    const prompt = `
    Generate 5 multiple-choice finance questions with 4 options each, and specify the correct answer and topic for each question. 
    
    Please format your response as follows:
    Question 1:
    Topic: [Topic Name]
    [Question Text]
    A) [Option 1]
    B) [Option 2]
    C) [Option 3]
    D) [Option 4]
    Correct Answer: [Correct Answer]
    
    Repeat for 5 questions, using the same format for each.
    `;
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: 500,
    });

    const gptResponseText = response.choices[0].message.content;
    console.log("GPT-4 Response:", gptResponseText); // Log the raw response for debugging

    const questions = parseQuestions(gptResponseText);
    console.log("Parsed Questions:", questions); // Log the parsed questions for debugging

    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating questions');
  }
};

// Controller to handle evaluating user answers
export const evaluateQuiz = (req, res) => {
    const { userAnswers, correctAnswers } = req.body;
    let wrongAnswers = {};
    let score = 0; // Initialize score
  
    // Loop through each user's answer and compare with the correct answers
    userAnswers.forEach((answer, index) => {
      if (answer === correctAnswers[index].correctAnswer) {
        score++; // Increment score for correct answers
      } else {
        const topic = correctAnswers[index].topic;
        if (!wrongAnswers[topic]) wrongAnswers[topic] = 0;
        wrongAnswers[topic]++;
      }
    });
  
    // Generate feedback based on the identified wrong answers
    const feedback = Object.keys(wrongAnswers).length
      ? `You should study more on the following topics: ${Object.keys(wrongAnswers).join(', ')}`
      : 'Great job! You have a good grasp of the topics.';
  
    // Send the feedback response as JSON, including the score
    res.json({ score, feedback });
  };

function parseQuestions(gptResponseText) {
    const lines = gptResponseText.split('\n').filter(line => line.trim());
    const questions = [];
    let currentQuestion = null;

    lines.forEach((line) => {
        line = line.trim(); // Clean up whitespace

        if (line.match(/^Question\s*\d+:/i)) {
            // Initialize a new QuizQuestion for each question
            const questionText = line.replace(/^Question\s*\d+:\s*/i, '').trim();
            currentQuestion = new QuizQuestion(
                questionText, // Set the question text
                [],           // Initialize options array
                '',           // Correct answer placeholder
                ''            // Topic placeholder
            );
            questions.push(currentQuestion);
        } else if (/^Topic:/i.test(line) && currentQuestion) {
            // Extract the topic
            currentQuestion.topic = line.replace(/^Topic:\s*/i, '').trim();
        } else if (/^Correct Answer:/i.test(line) && currentQuestion) {
            // Extract the correct answer
            currentQuestion.correctAnswer = line.replace(/^Correct Answer:\s*/i, '').trim();
        } else if (/^[a-dA-D]\)/.test(line) && currentQuestion) {
            // Add options to the current question
            currentQuestion.options.push(line.trim());
        } else if (currentQuestion) {
            // Append any other content to the question text
            currentQuestion.question += ` ${line}`;
        }
    });

    // Clean up any questions that are incomplete
    return questions.filter(question => question.question && question.options.length > 0 && question.correctAnswer);
}
