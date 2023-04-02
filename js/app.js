/*----------------------- CONSTANTS --------------------------*/

import { getRandomAnimal, getRandomEasyAnimal } from "../assets/data/data.js";

/*--------------------- VARIABLES (state) ---------------------*/

let currentGuess, guessesRemaining, nextLetter, mode, winner, winningWord

/*------------------- CACHED ELEMENT REFERENCES -------------------*/

const boardEl = document.getElementById('board')

const cellEl = document.querySelectorAll('.cell')

const keyboardEl = document.querySelector('.keyboard')

const keyEl = document.querySelectorAll('.key')

const resetBtn = document.querySelector('.reset')

const modeBtn = document.querySelector('.mode-btn')

const messageEL = document.getElementById('message')

/*--------------------- EVENT LISTENERS --------------------------*/

modeBtn.addEventListener('click', modeChoice)

keyboardEl.addEventListener('click', clickInput)

document.addEventListener('keydown', keyInput)

/*----------------------- FUNCTIONS ---------------------------------*/
init()

function init(){
  currentGuess = []
  guessesRemaining = 6
  nextLetter = 0
  mode = 1
  winner = false
  getWord()

}

function reset() {
  keyEl.className = "key"
}

function getWord(){
  mode === 1 ? winningWord = getRandomEasyAnimal() : winningWord = getRandomAnimal()
  return winningWord
  //Need CSS that changes the text on the button
}

function modeChoice() {
  return mode = mode * -1
}

function clickInput(evt) {
  //if guesses = 0, end of game, lost
  if (guessesRemaining === 0) {
    return
  }
  //target the clicked letter as string
  let clickKey = evt.target.id
  //if user clicks delete and theres a letter, call delete
  if (clickKey === "delete" && nextLetter != 0) {
    deleteLetter()
  //if user clicks enter and there are 5 letters call check
  } if (clickKey === "enter" && nextLetter === 5 ) {
    checkGuess()
  } else {
    // add to row
    insertLetter(clickKey)
  }
}

function keyInput(evt) {
  if (guessesRemaining === 0) {
    return
  }
}
function insertLetter(str) {
  console.log(str)
//   let usedKey = evt.target.className
// if (usedKey === "gray") {
//   return
}

//if clicked key has been previously guessed

