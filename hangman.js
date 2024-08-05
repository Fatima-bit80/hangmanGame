const categoriesList = ["HOUSE", "SCHOOL", "TECHNOLOGY", "FOOD", "CLOTHES", "ANIMALS"];

let levelOfTheGame = "";      //variable has the level of the game (hard,medium,easy)

let indexCategory = 2;        //the index of category in array category list (choosed in start page with default value 2)

let catArray = [];            //array has all word in the choosed category 

let categoryChoosed = document.getElementById("category"); // div has category in the start page

let btlButton = document.getElementById("btl");            //left button to change category

let btrButton = document.getElementById("btr");           //right button to change category

let clickSound = new Audio('click-sound.mp3'); //click sound 

let timerSound = new Audio('timerSound.mp3');  // timer sounds (3 sec)

let easyButton = document.getElementById("easyB");   // the button of level easy

let mediumButton = document.getElementById("mediumB");  // the button of level medium

let hardButton = document.getElementById("hardB");  // the button of level hard

let arrayOfButtons = [easyButton, mediumButton, hardButton];  //array of button easy/medium/hard

btlButton.addEventListener("click", leftArrowf);
btrButton.addEventListener("click", rightArrowf);

document.addEventListener("keydown", function (EV) {
  if (EV.key === "ArrowRight") rightArrowf();
  if (EV.key === "ArrowLeft") leftArrowf();
});

easyButton.addEventListener("click", changeButton);
mediumButton.addEventListener("click", changeButton);
hardButton.addEventListener("click", changeButton);

function leftArrowf() {                       //function change category to the next in the right
  if (document.URL.indexOf("Hangman.html") < -1) {//edit

    if (indexCategory > 0)
      indexCategory--;
    else
      indexCategory = categoriesList.length - 1;

    setCategoryS();
    clickSound.play();
  }
}
function rightArrowf() {                      //function change category to the next in the right
  if (document.URL.indexOf("Hangman.html") < 1 ) {//edit

    if (indexCategory < categoriesList.length - 1)
      indexCategory++;
    else
      indexCategory = 0;

    setCategoryS();
    clickSound.play();
  }
}

function setCategoryS() {                   //function to set show us the name of the category in the start page
  //and  store in Storage the index of the choosed category
  categoryChoosed.innerText = categoriesList[indexCategory];

  localStorage.setItem("indxCat", indexCategory);
}

function changeButton(bckick) {  // function to choose button of level and change the class if there is one choosed before 
  // and change the class if i want to unselect
  //and store the level in Storage
  clickSound.play();

  let buttonClickedLevel = bckick.target;

  if (buttonClickedLevel.classList.contains("thisButton")) {

    document.getElementById("strtButton").classList.add("disabledStart");
    document.getElementById("strtButton").classList.remove("workStart");

    buttonClickedLevel.classList.remove("thisButton");
    levelOfTheGame = "";
    localStorage.removeItem("levelStored", levelOfTheGame);
  }
  else {
    buttonClickedLevel.classList.add("thisButton");

    document.getElementById("strtButton").classList.remove("disabledStart");
    document.getElementById("strtButton").classList.add("workStart");

    levelOfTheGame = buttonClickedLevel.value;
    localStorage.setItem("levelStored", levelOfTheGame);

    for (let i = 0; i < 3; i++) {
      if (arrayOfButtons[i] != buttonClickedLevel)
        arrayOfButtons[i].classList.remove("thisButton");
    }
  }
}

function startGame() {    //function to start 
  if (levelOfTheGame != "") {
    clickSound.play();

    var millisecondsToWait = 100;
    setTimeout(function () {
      document.getElementById("linkToStart").click();
    }, millisecondsToWait);
  }
}

function reStart() {   //function to go to Setting 
  document.getElementById("linkToReStart").click();
}

const wordList = {
  HOUSE: ["SPOON", "MIRROR", "KEY", "BELL", "SOFA", "BED", "DOOR", "CHAIR", "FAN", "ROOM",
    "CLOCK", "GLASS", "PLATE", "BRUSH", "FORK", "KNIFE", "SOAP", "TABLE", "OVEN", "CANDLE",
    "PICTURE", "SHAMPOO", "TOOTHBRUSH", "LAMP", "PILLOW", "MICROWAVE", "CURTAIN", "SHELF", "WINDOW", "AIRCONDITIONER"],//30

  SCHOOL: ["PENCIL", "PAPER", "ERASER", "BOOK", "TEACHER", "BACKPACK", "DESK", "RULER", "BOARD", "AGENDA",
    "CALCULATOR", "NOTEBOOK", "POPQUIZ", "UNIFORM", "PLAYGROUND", "PEN", "EXAM", "LAB", "SHARPENER", "BAG",
    "SUPERVISOR", "COURSES", "BOOKS", "LESSONS", "GRADES", "ALPHABET", "RECESS", "MATHEMATICS", "LIBRARY", "HOMEWORK"],//30

  TECHNOLOGY: ["MOUSE", "LAPTOP", "KEYBOARD", "COMPUTER", "PHONE", "SCREEN", "PRINTER", "RADIO", "CAMERA", "INTERNET",
    "WEBSITE", "CHARGER", "ROUTER", "MOTHERBOARD", "APPLICATION", "TELEVISION", "MACHINE", "BATTERY", "HEADPHONE", "SPEAKER",
    "EMAIL", "MICROPHONE", "TABLET", "ROBOT", "BROWSER", "SMARTWATCH", "VIRUS", "SENSOR", "HACKING", "PROGRAMMING"],//30

  FOOD: ["ORANGE", "CHEESE", "BANANA", "TEA", "GRAPE", "POTATO", "WATERMELON", "TOMATO", "APPLE", "MANGO",
    "PEAR", "PUMPKIN", "WATER", "PEACH", "MILK", "LEMON", "COFFEE", "LETTUCE", "CHERRY", "CARROT",
    "CHOCOLATE", "ICECREAM", "STRAWBERRY", "COCONUT", "ONION", "AVOCADO", "PINEAPPLE", "KIWI", "POMEGRANATE", "ASPARAGUS"],//30

  CLOTHES: ["SUNGLASSES", "HAT", "BOOTS", "COAT", "DRESS", "SOCKS", "PANTS", "SHOES", "GLASSES", "SHIRT",
    "RING", "SANDALS", "JACKET", "EARRINGS", "WATCH", "NECKLACE", "PAJAMA", "BRACELET", "GLOVES", "SCARF",
    "BELT", "SWEATER", "HOODIE", "FASHION", "JEANS", "SUIT", "JEWELRY", "VEST", "WARDROBE", "BUTTON"],

  ANIMALS: ["CAT", "DOG", "COW", "HORSE", "LION", "BEAR", "FROG", "ELEPHANT", "GIRAFFE", "TIGER",
    "WOLF", "TURTLE", "CAMEL", "OCTOPUS", "EAGLE", "KOALA", "DINOSAUR", "SLOTH", "DOLPHIN", "HAMSTER",
    "HEDGEHOG", "PARROT", "FOX", "SQUIRREL", "ZEBRA", "RABBIT", "SNAKE", "SHEEP", "OWL", "MONKEY"]

};

let charHint = ""; // char hinted

let hintNumber;  // hint number for the game

let image = document.getElementById("man");   // the image of the man 

let images = ["MANI6.png", "MANI5.png", "MANI4.png",
  "MANI3.png", "MANI2.png", "MANI1.png", "MANI0.png",
  "longMan7.png", "longMAn6.png", "longMan5.png",
  "longMan4.png", "longMan3.png", "longMan2.png",
  "longMan1.png", "prisoner7.png", "prisoner6.png",
  "prisoner5.png", "prisoner4.png", "prisoner3.png",
  "prisoner2.png", "prisoner1.png", "girl7.png", "girl6.png",
  "girl5.png", "girl4.png", "girl3.png",
  "girl2.png", "girl1.png"];   //array of different image

let gamesWon = 0;    // the number of games correct  
let gW = document.getElementById("nbGamesWon");  //span games won

let totalGames;     // the number of total games 
let tG = document.getElementById("totalGames");   //span total games

var hiddenword = "";   //the word choosed randomly by computer 

var nbErrors = 0;     // number of errors for each word

var nbCorrect = 0;   // number of correct word for each word

let gameMode = 1 + Math.floor(Math.random() * 4);  //choosed randomly the game mode

let previousMode = gameMode;      // the previous mode is know (in the first) the game mode

let counterTheme = 1;      //counter theme to change the theme when we do restart

let picNb = (gameMode - 1) * 7; //the pic number is related with the game mode 

let arrayOfUsedWords = [];  //array of used word in the same game

let themeClicked;   //boolean if the theme box clicked

let m1; // mode 1 in the themebox
let m2; // mode 1 in the themebox
let m3; // mode 1 in the themebox 
let m4; // mode 1 in the themebox

let newg;  //new game

let hintb; ///hint button

let theme; // theme box 
let drop;// whhen mouse leave
let modes;

let secondsLeft;//span of seconds left
let timeOfTheLevel;  //time of the level get it from relation
let timeAcc;  //time accumulator
let intr = 0;   // interval for the time for each letter
let intr2;   //interval for changing class red white

let nbS = 0;
let sound1 = new Audio("disagree.wav");
let sound2 = new Audio("mhm.wav");

let clickACell = false;  //boolean if a cell is clicked

let clickedCell;
let letterClicked;

function getElts() {

  m1 = document.getElementById("m1");
  m1.addEventListener("click", themeClickedf);
  m1.addEventListener("click", newGame1);

  m2 = document.getElementById("m2");
  m2.addEventListener("click", themeClickedf);
  m2.addEventListener("click", newGame2);

  m3 = document.getElementById("m3");
  m3.addEventListener("click", themeClickedf);
  m3.addEventListener("click", newGame3);

  m4 = document.getElementById("m4");
  m4.addEventListener("click", themeClickedf);
  m4.addEventListener("click", newGame4);

  newg = document.getElementById("newgame");
  newg.addEventListener("click", nothemeClickedf);
  newg.addEventListener("click", newGame);

  hintb = document.getElementById("hint");
  hintb.addEventListener("click", getHint);

  theme = document.getElementById("themeBox");
  theme.addEventListener("mouseenter", bloc);

  drop = document.getElementById("dropdown");
  drop.addEventListener("mouseleave", non);

  modes = document.getElementById("modes");

  secondsLeft = document.getElementById("secondsLeft");

}

function returnNumberLevel() {
  switch (levelOfTheGame) {
    case "EASY": return 0;
    case "MEDIUM": return 1;
    case "HARD": return 2;
  }
}

function putCategoryH() {     //function to get index of category from local storage and put it in the screen
  indexCategory = localStorage.getItem("indxCat");
  document.getElementById("categ").innerHTML = categoriesList[indexCategory];

  let catName = categoriesList[indexCategory];

  catN = catName.split(" ");
  catArray = wordList[catN[0]];

}

function putDiff() {     //function to get level from local storage and put it in the screen

  levelOfTheGame = localStorage.getItem("levelStored");

  document.getElementById("diff").innerHTML = levelOfTheGame

  document.getElementById("diff").classList.add(levelOfTheGame.toLowerCase());
}

function bloc() {
  modes.style.display = "block";
}

function non() {
  modes.style.display = "none";
}

function themeClickedf() {
  themeClicked = true;
}
function nothemeClickedf() {
  themeClicked = false;
}

window.onload = setGame();

function putNumberOfSecondsForError() {

  timeOfTheLevel = 5 * (3 - returnNumberLevel());
  timeAcc = timeOfTheLevel;
  secondsLeft.innerText = timeAcc;

}

function putInterval() {
  intr = setInterval(setTime, 1000);
}

function redWhite() {
  var sec = document.getElementById("secondsLeft");

  if (sec.classList.contains("hard"))
    sec.classList.remove("hard");
  else sec.classList.add("hard");

}

function resetTime() {

  clearInterval(intr2);
  document.getElementById("secondsLeft").classList.remove("hard");

  timeAcc = timeOfTheLevel;
  timerSound.pause();
  timerSound.currentTime = 0;
}

function setTime() {

  secondsLeft.innerText = --timeAcc;

  if (timeAcc == 3) {
    intr2 = setInterval(redWhite, 200);

    timerSound.play();
  } else if (timeAcc == 0) {
    nbErrors++;
    addError();

    clearInterval(intr2);
    document.getElementById("secondsLeft").classList.remove("hard");
    
    resetTime();
    
  }
}

function setGame() {

  if (document.URL.indexOf("Hangman.html") > 0) {
    getElts();
    nbErrors = 0;
    nbCorrect = 0;
    charHint = "";
    image.src = images[0 + picNb];
    putCategoryH();
    putDiff();
    putNumberOfSecondsForError();

    if (arrayOfUsedWords.length == 0) {
      hintNumber = parseInt(catArray.length / parseInt(returnNumberLevel() + 2));//edit add this(      
    }

    hintb.value = hintNumber + " HINT";
    createHiddenWord();
    createKeyboard();
    changeClasses();

    totalGames = catArray.length;
    tG.innerText = totalGames;
    gW.innerText = gamesWon;
    image.addEventListener("mouseenter", manSound);

  if (intr != 0) {
    clearInterval(intr);
    intr = 0;
    resetTime();
  }
   putInterval();
    

  }
  else setCategoryS();

}

function newGame() {

  hintb.disabled = false;

  switch (counterTheme % 4) {
    case 0:
      newGame1();
      break;
    case 1:
      newGame2();
      break;
    case 2:
      newGame3();
      break;
    case 3:
      newGame4();
      break;
  }
  counterTheme++;
}

function newGame1() {  
  picNb = 0;
  previousMode = gameMode;
  gameMode = 1;

  if (themeClicked) {

    changeClasses();
    image.src = images[nbErrors + picNb];

  } else {
    gamesWon = 0;
    arrayOfUsedWords = [];
    setGame();
  }
}

function newGame2() {
  picNb = 7;
  previousMode = gameMode;
  gameMode = 2;

  if (themeClicked) {

    changeClasses();
    image.src = images[nbErrors + picNb];

  } else {
    gamesWon = 0;
    arrayOfUsedWords = [];
    setGame();
  }

}

function newGame3() { 
  picNb = 14;
  previousMode = gameMode;
  gameMode = 3;

  if (themeClicked) {

    changeClasses();
    image.src = images[nbErrors + picNb];

  } else {
    gamesWon = 0;
    arrayOfUsedWords = [];
    setGame();
  }
}

function newGame4() {  
  picNb = 21;
  previousMode = gameMode;
  gameMode = 4;

  if (themeClicked) {

    changeClasses();
    image.src = images[nbErrors + picNb];

  } else {
    gamesWon = 0;
    arrayOfUsedWords = [];
    setGame();
  }
}

function changeClasses() {
  let game = document.getElementById("game");
  game.classList.remove("g" + previousMode);
  game.classList.add("g" + gameMode);

  let o = document.getElementById("options");
  o.classList.remove("o" + previousMode);
  o.classList.add("o" + gameMode);

  theme.classList.remove("o" + previousMode);
  theme.classList.add("o" + gameMode);
  theme.classList.remove("g" + previousMode);
  theme.classList.add("g" + gameMode);

  hintb.classList.remove("o" + previousMode);
  hintb.classList.add("o" + gameMode);
  hintb.classList.remove("g" + previousMode);
  hintb.classList.add("g" + gameMode);

  newg.classList.remove("o" + previousMode);
  newg.classList.add("o" + gameMode);
  newg.classList.remove("g" + previousMode);
  newg.classList.add("g" + gameMode);

  modes.classList.remove("lb" + previousMode);
  modes.classList.add("lb" + gameMode);

  let btKeyb = document.getElementsByClassName("KEYBOARD");
  for (let i = 0; i < btKeyb.length; i++) {

    btKeyb[i].classList.remove("kb" + previousMode);
    btKeyb[i].classList.add("kb" + gameMode);

  }
  let letterinput = document.getElementsByClassName("letter"); 
  for (let i = 0; i < letterinput.length; i++) {

    letterinput[i].classList.remove("letter" + previousMode);
    letterinput[i].classList.add("letter" + gameMode);
  }
}

function createHiddenWord() {

  document.getElementById("word").innerHTML = "";

  do {
    let wIndex = parseInt((Math.random()) * (catArray.length));
    hiddenword = catArray[wIndex];

  } while (arrayOfUsedWords.includes(hiddenword));
  arrayOfUsedWords.push(hiddenword);

  for (let lindex = 1; lindex <= hiddenword.length; lindex++) {
    let letter = document.createElement("div");
    letter.classList.add("letter");
    letter.id = "l" + lindex;
    document.getElementById("word").appendChild(letter);
  }
}

function createKeyboard() {
  let keyboard = document.getElementById("keyboard");
  keyboard.innerHTML = "";

  for (let b = 65; b < 91; b++) {
    let button = document.createElement("button");
    button.textContent = String.fromCharCode(b);
    button.id = "b" + b;
    keyboard.appendChild(button);
    button.addEventListener('click', handleButtonClick);
  
    button.classList.add("KEYBOARD");
  }
}

function manSound() {
  if (nbErrors > 0 && nbS % 2 == 0) {

    if (nbS % 4 == 0)
      sound1.play();
    else
      sound2.play();
  }
  nbS++;
}

document.addEventListener("keydown", keyDownBody, false);
function keyDownBody(e) {
  var keyCode = e.keyCode;
  if (keyCode > 64 && keyCode < 91) {
    const lt = document.getElementsByClassName("kb" + gameMode);
    const lts = Array.from(lt);
    for (let i = 0; i < lt.length; i++) {
      if (String.fromCharCode(keyCode) == lts[i].innerText)
        lts[i].click();
    }
  }
}

function addError() {

  secondsLeft.innerText = timeOfTheLevel;
  image.src = images[nbErrors + picNb];
  if (clickACell == true) {
    clickedCell.classList.remove("kb" + gameMode);
    clickedCell.classList.add("wrong");
    clickedCell.disabled = true;

    clickACell = false;

    if (levelOfTheGame == "HARD") { setTimeout(original, 500); }

  }

  if (nbErrors == 6) {
    gamesLostf();
  }
}

function handleButtonClick(evnt) {

  if (nbCorrect < hiddenword.length && nbErrors < 6) {

    clickSound.play();
    clickACell = true;
    clickedCell = evnt.target;
    letterClicked = clickedCell.innerText;

    if (hiddenword.includes(letterClicked) && letterClicked !== charHint) {

      resetTime();
      secondsLeft.innerText = timeOfTheLevel;

      clickedCell.disabled = true;
      let s = new Audio("mhmm.wav");
      s.play();

      let letterIndex = 1;

      for (let char of hiddenword) {
        if (char == letterClicked && document.getElementById("l" + letterIndex).innerText == "") {
          document.getElementById("l" + letterIndex).innerText = letterClicked;
          nbCorrect++;
        }
        letterIndex++;
      }

      if (nbCorrect == hiddenword.length) {
        gamesWonf();
      }
    } else if (nbErrors < 6) {
      nbErrors++;
      addError();
      resetTime();
    }

  }

}
function original() {
  for (let b = 65; b < 91; b++) {

    let button = document.getElementById("b" + b);
    button.disabled = false;
    button.classList.remove("wrong");
    button.classList.add("kb" + gameMode)
  }
}

function winS() {
  let winS = new Audio("yay.wav");
  winS.play();
}

function getHint() {
  if (nbCorrect < hiddenword.length && nbErrors < 6) {
    resetTime();
    secondsLeft.innerText = timeOfTheLevel;
    const arrayOfAllLetter = document.getElementsByClassName("letter");
    const arrayOfEmpty = Array.from(arrayOfAllLetter).filter((div) => div.innerText === "");
    const divRandomly = arrayOfEmpty[Math.floor(Math.random() * arrayOfEmpty.length)];
    var indexR = Array.from(arrayOfAllLetter).indexOf(divRandomly);
    charHint = hiddenword[indexR];

    const btns = document.getElementsByClassName("kb" + gameMode);

    for (let i = 0; i < btns.length; i++) {
      if (btns[i].innerText == charHint)
        btns[i].disabled = true;
    }

    for (let i = 0; i < hiddenword.length; i++) {
      if (hiddenword[i] == charHint) {
        arrayOfAllLetter[i].innerText = charHint;
        nbCorrect++;
      }
    }

    hintNumber--;
    if (hintNumber == 0) hintb.disabled = true;
    hintb.value = hintNumber + " HINT";

    if (nbCorrect == hiddenword.length) gamesWonf();
  }
}

function gamesLostf() {
  console.log("Lost");

  clearInterval(intr);
  intr = 0;

  let ind = 1;
  for (let char of hiddenword) {
    document.getElementById("l" + ind).classList.remove("letter" + gameMode);
    document.getElementById("l" + ind).classList.add("wrong");
    document.getElementById("l" + ind).innerText = char;
    ind++;
  }

  for (let b = 65; b < 91; b++) {
    let button = document.getElementById("b" + b);
    button.style.display = "none";
  }

  let angry = new Audio("angry.wav");
  angry.play();

  var millisecondsToWait = 1500;
  if (arrayOfUsedWords.length == catArray.length) {
    setTimeout(function () {
      document.getElementById("linkToReStart").click();
    }, millisecondsToWait);
  } else {

    console.log("Lost");

    setTimeout(setGame, 1000);

  }
}

function gamesWonf() {
  console.log("won");

  clearInterval(intr);
  intr = 0;

  for (let ind = 1; ind <= hiddenword.length; ind++) {
    document.getElementById("l" + ind).classList.remove("letter" + previousMode);
    document.getElementById("l" + ind).classList.add("correct");

  }
  for (let b = 65; b < 91; b++) {
    let button = document.getElementById("b" + b);
    button.style.display = "none";
  }
  gamesWon++;

  gW.innerText = gamesWon;

  setTimeout(winS, 500);

  var millisecondsToWait = 1500;
  if (arrayOfUsedWords.length == catArray.length) {

    setTimeout(function () {
      document.getElementById("linkToReStart").click();
    }, millisecondsToWait);

  } else {

    setTimeout(setGame, 1000);
  }
}
