import questions from "./questions.js";

let currentQuestion = 0;
let score = 0;
const totalQuestions = questions.length;
let usedHints = 0;

const startButton = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const scoreElement = document.getElementById("score");
const hintButton = document.getElementById("hint-btn");

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestion++;
  setNextQuestion();
});
restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  usedHints = 0;
  setNextQuestion();
});
hintButton.addEventListener("click", () => {
  if (usedHints < 2) {
    const wrongOptions = Array.from(answerButtons.children).filter(button =>
      button.innerText !== questions[currentQuestion].answer
    );
    const randomIndex = Math.floor(Math.random() * wrongOptions.length);
    wrongOptions[randomIndex].classList.add("hide");
    usedHints++;
    hintButton.innerText = `المساعدات (${2 - usedHints})`;
  }
});

function startGame() {
  startButton.classList.add("hide");
  questionContainer.classList.remove("hide");
  hintButton.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  if (currentQuestion < totalQuestions) {
    showQuestion(questions[currentQuestion]);
  } else {
    showEndScreen();
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(option));
    answerButtons.appendChild(button);
  });
}

function selectAnswer(selectedOption) {
  const correct = selectedOption === questions[currentQuestion].answer;
  if (correct) {
    score++;
    scoreElement.innerText = `النقاط: ${score}`;
  }
  Array.from(answerButtons.children).forEach(button => {
    button.classList.add(correct ? "correct" : "wrong");
  });
  nextButton.classList.remove("hide");
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function showEndScreen() {
  questionContainer.classList.add("hide");
  restartButton.classList.remove("hide");
  restartButton.innerText = "ابدأ من جديد";
  scoreElement.innerText = `لقد حصلت على: ${score} من ${totalQuestions} نقطة.`;
  hintButton.classList.add("hide");
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
