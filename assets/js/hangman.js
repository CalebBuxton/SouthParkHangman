var words = ["active", "beyond","center", "cartman", "stan", "kyle", "hankey", "kenny", "chef", "garrison", "slave", "jesus"]
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var guessedLettersArr = [];
var correctLettersArr =[];
var pickedWord 
var pickedWordChars
var hangman = document.getElementById("hangman");
var alphabetArea = document.getElementById("alphabet");
var alphabetBtn = document.getElementsByClassName("alphabetBtn");
var guessedTitle = document.getElementById("guessedTitle");
var guessedLetters = document.getElementById("guessedLetters");
var wordSpaces = document.getElementById("wordSpaces")
var resetGame = document.getElementById("resetGame");
var gameResult = document.getElementById("gameResult")
var gameOver = true;
var winner
var letterSpaces 
var guesses
var correct
var opening = document.getElementById("opening")
var gameOverAudio = document.getElementById("gameOverAudio");
var themeSong = document.getElementById("themeSong");
var respectAudio = document.getElementById("respect");


document.onkeypress = function(evt) {
  evt = evt || window.event;
  var charCode = evt.which || evt.keyCode;
  var charStr = String.fromCharCode(charCode);
  if (gameOver) {
  	themeSong.play();
  	newGame();
  }
  else {
  var target = document.getElementById(charStr);
  target.classList.add("disabledBtn");
  target.setAttribute("disabled","true");
  var match = false;
  for(var i = 0; i < guessedLettersArr.length; i++) {
  	if(charStr === guessedLettersArr[i]) {
  		match = true;
  	}
  }
  if (!match) {
  	guessedLettersArr.push(charStr);
  	letterSelected(charStr);
  	guessedLetter(charStr);
  }
}
};



resetGame.addEventListener("click", function(){
	newGame();
	gameResult.classList.add("hidden");
})

function pickWord() {
	pickedWord = words[Math.floor(Math.random() * words.length)];
	pickedWordChars = pickedWord.split("");
	createWordSpaces();
};


function createWordSpaces() {
	for(i = 0; i < pickedWordChars.length; i++){
		wordSpaces.innerHTML += '<div class="wordSpace"><div class="letter"></div></div>';
	}

	letterSpaces = document.getElementsByClassName("letter");
};

function createButtons() {
	for(i = 0; i < alphabet.length; i++){
		alphabetArea.innerHTML += "<button class='alphabetBtn' id=" + alphabet[i] + "></button>";
	}

	for(i = 0; i < alphabet.length; i++){
		alphabetBtn[i].textContent = alphabet[i];
		alphabetBtn[i].addEventListener("click", function(){
			this.classList.add("disabledBtn");
			this.setAttribute("disabled","true");
			guessedLettersArr.push(this.textContent);
			guessedLetter();
			letterSelected(this.textContent);
		}
		)}
	};


	function newGame(){
		for(var i = 0; i < alphabetBtn.length; i++){
			alphabetBtn[i].classList.remove("disabledBtn");
			alphabetBtn[i].setAttribute("disabled","false");
		}
		opening.classList.add("hidden");
		alphabetArea.innerHTML = null;
		resetGame.textContent = "New Word";
		guessedTitle.textContent = " ";
		guessedLettersArr = [];
		guessedLetters.textContent = " ";
		wordSpaces.innerHTML = null;
		gameResult.classList.add("hidden");
		gameOver = false;
		winner = false;
		guesses = 0;
		correct = 0;
		gameResult.classList.remove("winner");
		hangman.innerHTML = "<img src=" + "assets/images/"+ guesses + ".png>";
		pickWord();
		createButtons();
	};


	function guessedLetter(letter) {
		guessedTitle.textContent = "Guessed Letters"
		guessedLetters.innerHTML = " ";
		for(i = 0; i < guessedLettersArr.length; i++)
			guessedLetters.textContent += guessedLettersArr[i];
	};

	function letterSelected(letter) {
		var wrong = 0;
		for(i = 0; i < pickedWordChars.length; i++) {

			if (letter === pickedWordChars[i]) {
				revealLetter(i, letter);
			}
			else {
				wrong++;
			}
		}
		if (wrong === pickedWordChars.length) {
			guesses++
			hangman.innerHTML = "<img src=" + "assets/images/"+ guesses + ".png>";
		}
		gameStatus();
	};

	function revealLetter(num, l) {
		letterSpaces[num].textContent = l;
		correct++;
	}


	function gameStatus() {
		if (correct === pickedWordChars.length) {
			gameOver = true;
			winner = true
		}
		if (guesses === 6) {
			gameOver = true;
		}
		if (gameOver === true) {
			resetGame.textContent = "Play Again?"
			gameResult.classList.remove("hidden")
			for(var i = 0; i < alphabetBtn.length; i++){
				alphabetBtn[i].classList.add("disabledBtn");
				alphabetBtn[i].setAttribute("disabled","true");
			}
			if (winner === true) {
				gameResult.textContent = "You Won!"
				gameResult.classList.add("winner")
				respectAudio.play();
			}
			else {
				pickedWordChars = pickedWord.split("");
				for(var i = 0; i < pickedWordChars.length; i++) {
					revealLetter(i,pickedWordChars[i]);
				}
				gameResult.textContent = "Sorry, you lost..."
				gameOverAudio.play();
			}
		}

	};

