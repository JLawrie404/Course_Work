//Declaring constant statements and look up relationships
const startButton = document.querySelector(".startButton button");
const rulesList = document.querySelector(".rulesList");
const endButton = rulesList.querySelector(".buttons .quit");
const nextButton = rulesList.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const results = document.querySelector(".results");
const answerList = document.querySelector(".answerList");
const time_line = document.querySelector("header .time_line");
const timeRemaining = document.querySelector(".timer .time_left_txt");
const timeCalculator = document.querySelector(".timer .timer_sec");

// if start Quiz button selected
startButton.onclick = ()=>{
    rulesList.classList.add("activeInfo"); 
}

// if exit Quiz button clicked
endButton.onclick = ()=>{
    rulesList.classList.remove("activeInfo"); 
}

// if continue Quiz button clicked
nextButton.onclick = ()=>{
    rulesList.classList.remove("activeInfo"); //hides rule list
    quiz_box.classList.add("activeQuiz"); 
    // Call functions to start timer and start/progress quiz via question number
    displayQuestions(0); 
    queCounter(1); 
    startTimer(10); 
    startTimerLine(0); 
}

// Declare and initialsie variables
let counterTime =  10;
let currentQuestion = 0;
let questionNumber = 1;
let playerScore = 0;
let counter;
let maxScore;
let counterSnake = 0;

const restart_quiz = results.querySelector(".buttons .restart");
const quit_quiz = results.querySelector(".buttons .quit");

// restart Quiz selected
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    results.classList.remove("activeResult"); //hide results box
    counterTime = 10; 
    currentQuestion = 0;
    questionNumber = 1;
    playerScore = 0;
    counterSnake = 0;
    displayQuestions(currentQuestion); //calling showQestions function
    queCounter(questionNumber); //passing questionNumber value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(maxScore); //clear max score
    startTimer(counterTime); //calling start timer function
    startTimerLine(counterSnake); //calling start timer Line function
    timeRemaining.textContent = "Time Left"; //change the text of time remaining to time Left
    next_btn.classList.remove("show"); //hide the next button
}

// if exit quiz selected
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window without reload of webpage being required
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");


next_btn.onclick = ()=>{
    if(currentQuestion < questions.length - 1){ //if loop question count is less than total number of questions
        currentQuestion++; //increment the currentQuestion value
        questionNumber++; //increment the questionNumber value
        displayQuestions(currentQuestion); //calling showQestions function
        queCounter(questionNumber); //passing questionNumber value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(maxScore); //clear max score
        startTimer(counterTime); //calling startTimer function
        startTimerLine(counterSnake); //calling startTimerLine function
        timeRemaining.textContent = "Time Left"; //change the timeRemaining to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(maxScore); //clear max score
        showResult(); //calling show result function
    }// end of if statement
}

// look up questions and answers from java array
function displayQuestions(index){
    const que_text = document.querySelector(".que_text");

    // devides question and answers into selectable options
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    answerList.innerHTML = option_tag; 
    
    const option = answerList.querySelectorAll(".option");

    // set selection outcomes using a variable counter
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }// end of for loop
}// end of function
// creating the new div tags for preloard css images
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(maxScore); //clear max score
    let userAns = answer.textContent; 
    let correcAns = questions[currentQuestion].answer; //sets correct answer into correcAns variable
    const allOptions = answerList.children.length; 
    
    if(userAns == correcAns){ //if users answer equals to correct answer via array loop up and assigns corrisponding image of tick or cross
        playerScore += 1; //add one to player score
        answer.classList.add("correct"); //adding green color via css design
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + playerScore);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(answerList.children[i].textContent == correcAns){ 
                answerList.children[i].setAttribute("class", "option correct"); 
                answerList.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }// end of for loop
    }// end of if statement
    for(i=0; i < allOptions; i++){
        answerList.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}// end of function

function showResult(){
    rulesList.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    results.classList.add("activeResult"); //show result box
    const scoreText = results.querySelector(".score_text");
    if (playerScore > 4){ // if user scored more than 4
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and Congratulations! , You got <p>'+ playerScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(playerScore > 1){ // if user scored more than 1
        let scoreTag = '<span>and Good Try , You got <p>'+ playerScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and Poor Show , You only got <p>'+ playerScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }// end of double nested if statement 
}// end of function

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCalculator.textContent = time; //changing the value of timeCalculator with time value
        time--; 
        if(time < 9){ 
            let addZero = timeCalculator.textContent; 
            timeCalculator.textContent = "0" + addZero; 
        }// end of if statement 
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeRemaining.textContent = "Time Off"; //change the time text to time off
            const allOptions = answerList.children.length; //getting all option items
            let correcAns = questions[currentQuestion].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(answerList.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    answerList.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    answerList.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }// end of if statement
            }// end of for loop
            for(i=0; i < allOptions; i++){
                answerList.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }// end of for loop
            next_btn.classList.add("show"); //show the next button if user selected any option
        }// end of if statement
    }// end of function
}// end of function

function startTimerLine(time){
    maxScore = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width by 1px and increasing the snake timer 
        if(time > 549){ //if time value is greater than 549
            clearInterval(maxScore); //clear maxScore
        }// end of if statement 
    }// end of function
}// end of function

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}// end of function
