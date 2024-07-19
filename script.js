const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById('questions');
  const userAnswers = JSON.parse(sessionStorage.getItem('progress')) || {};

  questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    const questionText = document.createElement('p');
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    question.choices.forEach(choice => {
      const choiceContainer = document.createElement('div');
      const choiceElement = document.createElement('input');
      const choiceLabel = document.createElement('label');

      choiceElement.setAttribute('type', 'radio');
      choiceElement.setAttribute('name', `question-${index}`);
      choiceElement.setAttribute('value', choice);
      if (userAnswers[`question-${index}`] === choice) {
        choiceElement.checked = true;
      }

      choiceLabel.textContent = choice;
      choiceContainer.appendChild(choiceElement);
      choiceContainer.appendChild(choiceLabel);
      questionElement.appendChild(choiceContainer);

      choiceElement.addEventListener('change', () => {
        userAnswers[`question-${index}`] = choice;
        sessionStorage.setItem('progress', JSON.stringify(userAnswers));
      });
    });

    questionsElement.appendChild(questionElement);
  });
}

// Calculate and display score
function calculateScore() {
  const userAnswers = JSON.parse(sessionStorage.getItem('progress')) || {};
  let score = 0;

  questions.forEach((question, index) => {
    if (userAnswers[`question-${index}`] === question.answer) {
      score++;
    }
  });

  localStorage.setItem('score', score);
  document.getElementById('score').textContent = `Your score is ${score} out of 5.`;
}

// Check for existing score
function checkExistingScore() {
  const savedScore = localStorage.getItem('score');
  if (savedScore !== null) {
    const existingUserButton = document.createElement('button');
    existingUserButton.id = 'existing';
    existingUserButton.textContent = 'Login as existing user';
    document.getElementById('score').appendChild(existingUserButton);

    existingUserButton.addEventListener('click', () => {
      alert(`Your previous score is ${savedScore} out of 5.`);
    });
  }
}

// Event listener for submit button
document.getElementById('submit').addEventListener('click', calculateScore);

// Initial function calls
renderQuestions();
checkExistingScore();