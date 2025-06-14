let question = document.querySelector(".question");
let answers = document.querySelector(".answers");
let nextBtn = document.querySelector(".next-btn");

let currentQuestionIndex = 0;
let result = 0;

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

fetch(
  "https://raw.githubusercontent.com/YoussefSamirM/Questions-api/refs/heads/main/questions.json"
)
  .then((response) => response.json())
  .then((data) => {
    data = shuffleArray(data);
    return data;
  })
  .then((data) => {
    function start() {
      currentQuestionIndex = 0;
      result = 0;

      nextBtn.innerHTML = "Next";
      nextBtn.style = "display:none;";

      changeQuestions_Answers();
    }

    function changeQuestions_Answers() {
      reset();
      let questionNo = currentQuestionIndex + 1;
      let currentQuestion = data[currentQuestionIndex];

      question.innerHTML = `${questionNo}) ${currentQuestion.question}`;

      currentQuestion.answers.forEach((btn) => {
        let button = document.createElement("button");
        button.className = "answer-btn";
        button.innerHTML = btn.text;

        answers.appendChild(button);

        button.addEventListener("click", answerSelected);
      });
    }

    function answerSelected(btn) {
      let selectedBtn = btn.target;
      let isCorrect =
        selectedBtn.textContent === data[currentQuestionIndex].correctAnswer;

      if (isCorrect) {
        selectedBtn.classList.add("correct");
        result++;
      } else {
        selectedBtn.classList.add("incorrect");
      }

      Array.from(answers.children).forEach((btn) => {
        if (btn.classList.contains("correct")) {
          btn.classList.add("correct");
        }
        btn.disabled = true;
        nextBtn.style = "display:block";
      });
    }

    function handleNextBtn() {
      currentQuestionIndex++;

      if (currentQuestionIndex < data.length) {
        changeQuestions_Answers();
      } else {
        showResult();
      }
    }

    function reset() {
      nextBtn.style = "display:none";
      while (answers.firstChild) {
        answers.firstChild.remove();
      }
    }

    function showResult() {
      reset();

      nextBtn.innerHTML = "Restart Quiz";
      nextBtn.style = "display:block";
      question.innerHTML = `Your Result Is ${result} From ${currentQuestionIndex}`;
    }

    nextBtn.addEventListener("click", () => {
      if (currentQuestionIndex < data.length) {
        handleNextBtn();
      } else {
        start();
      }
    });

    start();
  });
