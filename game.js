//selects random word;

var numberOfWins = 0;
var guessesLeft = 6;
var wordLetterCount = 0;
var arrayWord = ["honda", "bmw", "audi", "mercedes", "chrysler", "ford", "lincoln", "ram", "jeep", "dodge", "buick", "cadillac", "chevrolet", "tesla", "mercury", "porsche", "volkswagen", "maserati", "fiat", "kia", "ferrari", "lamborghini", "datsun", "acura", "mazda", "nissan", "mitsubishi", "infiniti", "subaru", "toyota", "kia", "volvo", "saab", "bentley"];
var lettersGuessedArray = [];
var myInputs = document.querySelectorAll("input");

// removes list items when a new game is generated
function removeLi() {
   var liArray = document.querySelectorAll("input");
   if (liArray.length > 0) {
      var myNode = document.getElementById("lettersDiv");
      while (myNode.firstChild) {
         myNode.removeChild(myNode.firstChild);
      }
   }
}


function reEnableKeys() {
   var toBeEnable = document.getElementsByClassName("keypress");
   for (var i = 0; i < toBeEnable.length; i++) {
      toBeEnable[i].disabled = false;
      toBeEnable[i].classList.add("btn-primary");
   }
}


// creates a random number and selects a random letter from array
function pullRandomWord() {
   var randIndex = Math.floor(Math.random() * arrayWord.length);
   var randWord = arrayWord[randIndex];
   window.randWord = randWord;
   removeLi();
   guessword();
   reEnableKeys();

   // finds how many letters in a word and creates as many input fields
   for (var i = 0; i < randWord.length; i++) {
      var InputField = document.createElement("INPUT");
      document.getElementById("lettersDiv").appendChild(InputField);
   }
   disableIt();
}


// This function is used to generate the first game 
do {
   pullRandomWord();
} while (numberOfWins < -1);


// asks to guess the word
function guessword() {
   document.getElementById("guess").innerHTML = "Guess a " + randWord.length + " letter car manufacture";
}

// disables input buttons 
function disableIt() {
   for (var i = 0; i < randWord.length; i++) {
      document.querySelectorAll("input")[i].disabled = true;
   }
}


// detects button pressed and disables key
// function findKey () {}
document.addEventListener("keyup", (event) => {
   var x = event.key;
   var buttonArray = document.querySelectorAll(".keypress");
   for (var i = 0; i < buttonArray.length; i++) {
      var foundLetter = buttonArray[i].innerHTML;
      if (foundLetter == x) {
         buttonArray[i].disabled = true;
         buttonArray[i].classList.remove("btn-primary");
         searchWord(x);
      }
   }
})


// detects button pressed on screen keyboard and disables key
document.getElementById("buttonkeysdiv").addEventListener("click", (e) => {
   var pressedLetter = e.target.innerHTML;
   e.target.classList.remove("btn-primary");
   e.target.disabled = true;
   searchWord(pressedLetter);
})

//TODO:remember to reset lettersgussedarray

// Check to see if letter is part of random word
function searchWord(wasPressed) {
   if (randWord.includes(wasPressed) == true && lettersGuessedArray.indexOf(wasPressed) == -1) {
      lettersGuessedArray.push(wasPressed);
      findLetterLocation(wasPressed);
   } else if (randWord.includes(wasPressed) == false && lettersGuessedArray.indexOf(wasPressed) == -1) {
      lettersGuessedArray.push(wasPressed);
      guessesLeft -= 1;
      document.getElementById("remainingGuesses").innerHTML = guessesLeft;
      if (guessesLeft == 0) {
         alert("You Lost the maker was " + randWord);
         guessesLeft = 6;
         numberOfWins = 0;
         wordLetterCount = 0;
         lettersGuessedArray = [];
         document.getElementById("remainingGuesses").innerHTML = guessesLeft;
         document.getElementById("numberOfWins").innerHTML = numberOfWins;
         pullRandomWord();
      }
   }
}


// This function finds the location of the existing word
function findLetterLocation(pressedLocation) {
   for (var i = 0; i < randWord.length; i++) {
      if (randWord[i] == pressedLocation) {
         document.querySelectorAll("input")[i].value = pressedLocation;
         wordLetterCount += 1;
         console.log(wordLetterCount);
         if (wordLetterCount == randWord.length) {
            youWon();
         }
      }
   }
}


function youWon() {
   setTimeout(pullRandomWord(), 2000);
   wordLetterCount = 0;
   guessesLeft = 6;
   numberOfWins += 1;
   lettersGuessedArray = [];
   remainingGuesses
   document.getElementById("remainingGuesses").innerHTML = guessesLeft;
   document.getElementById("numberOfWins").innerHTML = numberOfWins;
   console.log("number of wins is " + numberOfWins);
}