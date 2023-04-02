/*----------------------- CONSTANTS --------------------------*/

import { getRandomAnimal, getRandomEasyAnimal, animals, easyAnimals } from "../assets/data/data.js";

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
  insertLetter(str)
  nextCell()
}

function reset() {
  keyEl.className = "key"
}

function getWord() {
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
  if (clickKey === "delete") {
    deleteLetter()
    return
  } if (clickKey === "enter" && nextLetter === 5 ) {
    submitGuess()
    return
  } if (clickKey === "enter" && nextLetter != 5) {
    return
  } else {
    insertLetter(clickKey)
  }
}

function keyInput(evt) {
  if (guessesRemaining === 0) {
    return
  }
  //learn how to use a keyboard
}

function findCell() {
  let row = (6 - guessesRemaining)
  let cell = nextLetter
  let currentCellEl = document.getElementById(`r${row}c${cell}`)
  return currentCellEl
}

function insertLetter(str) {
  findCell().textContent = str
  currentGuess.push(str)
  nextCell()
}

function nextCell() {
  nextLetter++
}

function deleteLetter() {
  nextLetter--
  findCell().textContent = ''
  currentGuess.pop()
}

function submitGuess() {
  currentGuess = currentGuess.join('')
  let animalArray
  if (mode === 1) {
    animalArray = easyAnimals
  } else if (mode === -1) {
    animalArray = animals
  }
  if (animalArray.includes(currentGuess)){
    compareGuess()
  } else {
    return
  }
}


  //   if (currentGuess === winningWord) {
  //     winner = true
  //     console.log('win')
  //   } else {
  //     compareWords()
  //     guessesRemaining++
  //   }
  // }
  
  // function compareWords(winningWord, currentGuess) {
  //   console.log(winningWord)
  //   console.log(currentGuess)
  //   currentGuess.forEach(function(letter, idx) {
  //     if 
  
  //   })
  // }


