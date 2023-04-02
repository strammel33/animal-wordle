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
  makeGuess()
}

function makeGuess() {
  clickInput()
  insertLetter(evt)
  // nextCell()
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
  if (guessesRemaining === 0) {
    return
  }
  let usedKey = evt.target.className
  if (usedKey === "gray") {
  return
  }
  let clickKey = evt.target.id

  if (clickKey === '') {
    return
  }
  console.log(clickKey)

  if (clickKey === "delete" && nextLetter != 0) {
    deleteLetter()
  } if (clickKey === "enter" && nextLetter === 5 ) {
    checkGuess()
  } else {
    insertLetter(clickKey)
  }
}

function keyInput(evt) {
  if (guessesRemaining === 0) {
    return
  }
}

function insertLetter(str) {
  let row = (6 - guessesRemaining)
  let cell = nextLetter
  let currentCellEl = document.getElementById(`r${row}c${cell}`)
  currentCellEl.textContent = str
  nextCell()
}

function nextCell(cell){
  nextLetter++
}
insertLetter()

//if clicked key has been previously guessed

