/* All answers options*/
const  option1 = document.querySelector('.option1'),
       option2 = document.querySelector('.option2'),
       option3 = document.querySelector('.option3'),
       option4 = document.querySelector('.option4');

/* All our options*/
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); //сам вопрос
const image = document.getElementById('image');

const numberOfQuestion = document.getElementById('number-of-question'), //номер вопроса
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); //количество всех вопросов

let indexOfQuestion, //индекс текущего вопроса
    indexOfPage = 0; // индекс страницы

const answersTracker = document.getElementById('answers-tracker'); //обертка для трекера
const btnNext = document.getElementById('btn-next'); //кнопка далее

let score = 0; //итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'), //количество правильных ответов
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), //количество всех вопросов (в модальном окне)
      btnTryAgain = document.getElementById('btn-try-again'); // кнопка "начать викторину заново"

const questions = [
    {
        question: 'Футбольный клуб из Милана',
        options: [
            'Интер',
            'Ювентус',
            'Ливерпуль',
            'Реал',
        ],
        rightAnswer: 0,
        img: '<img src="images/img1.png">'
    },
    {
        question: 'Футболист по прозвищу "Зубастик"',
        options: [
            'Роналду',
            'Месси',
            'Роналдо',
            'Рональдиньо',
        ],
        rightAnswer: 2,
        img: '<img src="images/img2.jpg">'
    },
    {
        question: 'Год основания футбольного клуба Интер',
        options: [
            '1910',
            '1908',
            '1899',
            '1901',
        ],
        rightAnswer: 1,
        img: '<img src="images/img3.jpg">'
    },
    {
        question: 'Последняя победа Интера в чемпионате Италии',
        options: [
            '2011',
            '2017',
            '2019',
            '2021',
        ],
        rightAnswer: 3,
        img: '<img src="images/img4.jpg">'
    },
    {
        question: 'Тренер с которым Интер последний раз выиграл чемпионат Италии',
        options: [
            'Филиппо Индзаги',
            'Антонио Конте',
            'Роберто Манчини',
            'Жозе Моуринью',
        ],
        rightAnswer: 1,
        img: '<img src="images/img5.jpg">'
    },
    {
        question: 'Лучший бомбардир Интера за всю историю клуба',
        options: [
            'Роналдо',
            'Мауро Икради',
            'Джузеппе Меацца',
            'Ромело Лукаку',
        ],
        rightAnswer: 2,
        img: '<img src="images/img6.jpg">'
    },
    {
        question: 'Игрок, сигравший рекордное количество матчей за Интер',
        options: [
            'Хавьер Дзанетти',
            'Самир Ханданович',
            'Джузеппе Меацца',
            'Марко Матерацци',
        ],
        rightAnswer: 0,
        img: '<img src="images/img7.jpg">'
    },
    {
        question: 'Количество побед Интера в Лиге Чемпионов',
        options: [
            '1',
            '2',
            '3',
            '4',
        ],
        rightAnswer: 2,
        img: '<img src="images/img8.jpg">'
    },
    {
        question: 'Количество побед Интера в Чемпионате Италии',
        options: [
            '19',
            '21',
            '22',
            '24',
        ],
        rightAnswer: 0,
        img: '<img src="images/img9.jpg">'
    },
    {
        question: 'Стадион, на котором Интер проводит домашние матчи',
        options: [
            'Сантьяго Бернабеу',
            'Парк дэ Пранс',
            'Камп Ноу',
            'Сан Сиро',
        ],
        rightAnswer: 3,
        img: '<img src="images/img10.jpg">'
    }

]

numberOfAllQuestions.innerHTML = questions.length; //выводим количество вопросов

const load = ()=> {
    question.innerHTML = questions[indexOfQuestion].question; //сам вопрос    
    
    image.innerHTML = questions[indexOfQuestion].img;

    //мапим ответы

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; //установка номера текущей страницы
    indexOfPage++; //увеличение индекса страницы
}


let completedAnswers = [] //массив для уже заданных вопросов

const randomQuestion = ()=> {
    let randomNumber = Math.floor(Math.random() * questions.length);
    
    let hitDuplicate = false; //якорь для проверки одинаковых вопросов

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            })
            if(hitDuplicate) {
                randomQuestion();  
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
}

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
        disabledOptions();
}

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}


const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

//удаление всех классов со всех ответов
const enableOptions = ()=> {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`); //не работает
}
const validate = ()=> {
     if(!optionElements[0].classList.contains('disabled')) {
         alert('Вам нужно выбрать один из вариантов ответа');
     } else {
        randomQuestion();
        enableOptions();
     }
}

const quizOver = ()=> {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const TryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', TryAgain);

btnNext.addEventListener('click', () => {
    validate();
});

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});