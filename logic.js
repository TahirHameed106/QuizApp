var quiz = [
    {
        question: "Which of the following is NOT a primitive data type in JavaScript?",
        options: ["String", "Boolean", "Object", "Number"],
        answer: "Object"
    },
    {
        question: "What does the 'this' keyword refer to inside a regular function (non-strict mode) when called globally?",
        options: ["The function itself", "Window object", "Undefined", "Global object"],
        answer: "Window object"
    },
    {
        question: "Which method is used to combine two or more arrays in JavaScript?",
        options: ["push()", "splice()", "concat()", "join()"],
        answer: "concat()"
    },
    {
        question: "What will be the output of: console.log(typeof NaN);",
        options: ["NaN", "undefined", "number", "object"],
        answer: "number"
    },
    {
        question: "Which feature was introduced in ES6 to handle asynchronous code more easily?",
        options: ["Callbacks", "Promises", "Events", "Generators"],
        answer: "Promises"
    },
    {
        question: "What is the difference between 'let' and 'var' in JavaScript?",
        options: [
            "let is function-scoped, var is block-scoped",
            "let is block-scoped, var is function-scoped",
            "Both are block-scoped",
            "Both are function-scoped"
        ],
        answer: "let is block-scoped, var is function-scoped"
    },
    {
        question: "Which operator is used for optional chaining in JavaScript?",
        options: ["??", "?.", "&&", "::"],
        answer: "?."
    },
    {
        question: "What is a closure in JavaScript?",
        options: [
            "A function bundled with its lexical scope",
            "A function that calls itself",
            "An object with private variables",
            "A variable declared with let"
        ],
        answer: "A function bundled with its lexical scope"
    },
    {
        question: "Which JavaScript method converts a JSON string into an object?",
        options: ["JSON.parse()", "JSON.stringify()", "toObject()", "parse.JSON()"],
        answer: "JSON.parse()"
    },
    {
        question: "What will the following return: Boolean('false');",
        options: ["false", "true", "undefined", "error"],
        answer: "true"
    }
];

var currentQuestion = 0;
var score = 0;
var totalQuestions = quiz.length;
var optionSelected = false;
var restartCount = 0;
var maxRestarts = 3;

var questionEl = document.getElementById("Questions");
var choicesEl = document.getElementById("choices");
var nextBtn = document.getElementById("next-btn");

function loadQuestion() {
    optionSelected = false;
    if (currentQuestion === totalQuestions) {
        return endQuiz();
    }

    let q = quiz[currentQuestion];
    questionEl.innerHTML = (currentQuestion + 1) + ". " + q.question;

    let optionsHTML = "";
    for (let i = 0; i < q.options.length; i++) {
        optionsHTML += `<li>${q.options[i]}</li>`;
    }
    choicesEl.innerHTML = optionsHTML;
    nextBtn.disabled = true;
}

choicesEl.onclick = function(event) {
    if (event.target.tagName === "LI" && !optionSelected) {
        optionSelected = true;
        let correctAnswer = quiz[currentQuestion].answer;

        if (event.target.innerHTML === correctAnswer) {
            event.target.classList.add("correct");
            score++;
        } else {
            event.target.classList.add("wrong");
            Array.from(choicesEl.children).forEach(li => {
                if (li.innerHTML === correctAnswer) {
                    li.classList.add("correct");
                }
            });
        }

        Array.from(choicesEl.children).forEach(li => {
            li.style.pointerEvents = "none";
        });

        nextBtn.disabled = false;
    }
};

function NextQuestionRefer() {
    if (currentQuestion === totalQuestions) {
        restartQuiz();
        return;
    }
    currentQuestion++;
    loadQuestion();
}

function endQuiz() {
    let percentage = Math.round((score / totalQuestions) * 100);
    let comment = "";

    if (percentage === 100) {
        comment = "🌟 Perfect score! You're a JavaScript master!";
    } else if (percentage >= 80) {
        comment = "👏 Great job! You really know your stuff.";
    } else if (percentage >= 50) {
        comment = "👍 Not bad! Keep practicing and you'll get there.";
    } else {
        comment = "💡 Keep learning! JavaScript takes time and effort.";
    }

    questionEl.innerHTML = "🎉 Quiz Over!";
    choicesEl.innerHTML = `
        <p>Your Score: ${score} / ${totalQuestions}</p>
        <p>Percentage: ${percentage}%</p>
        <p>${comment}</p>
        <p>Restarts left: ${maxRestarts - restartCount}</p>
    `;
    nextBtn.innerText = "Restart";
    nextBtn.disabled = false;
}

function restartQuiz() {
    restartCount++;
    if (restartCount >= maxRestarts) {
        questionEl.innerHTML = "🚫 Restart limit reached!";
        choicesEl.innerHTML = `<p>You can only restart the quiz 3 times.</p>`;
        nextBtn.disabled = true;
        return;
    }

    currentQuestion = 0;
    score = 0;
    nextBtn.innerText = "Next Question";
    loadQuestion();
}

loadQuestion();