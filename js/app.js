/*----------------------- CONSTANTS --------------------------*/

import { getRandomAnimal, getRandomEasyAnimal, animals, easyAnimals } from "../assets/data/data.js";

const allowedKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'BACKSPACE', 'ENTER']

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

modeBtn.addEventListener('click', updateMode)

keyboardEl.addEventListener('click', clickInput)

document.addEventListener('keydown', keyInput)

resetBtn.addEventListener('click', reset)

/*----------------------- FUNCTIONS ---------------------------------*/
init()

function init(){
  currentGuess = []
  guessesRemaining = 6
  nextLetter = 0
  mode = 1
  winner = false
  messageEL.textContent = `How well do you know your 5-letter animals?`
  getWord()
  modeBtnText()
}

function getWord() {
  mode === 1 ? winningWord = getRandomEasyAnimal() : winningWord = getRandomAnimal()
  return winningWord
}


function updateMode() {
  if (guessesRemaining === 6 && nextLetter === 0) {
    mode = mode * -1
    getWord()
    modeBtnText()
  } else {
    return
  }
}



function clickInput(evt) {
  if (winner === false) {
    if (guessesRemaining === 0) {
      return
    }
    let clickKey = evt.target.id
    if (clickKey === '') {
      return
    } if (clickKey === "delete") {
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
  } else {
    return
  }
}

function keyInput(evt) {
  if (winner === false) {
    if (guessesRemaining === 0) {
      return
    }
    let pressKey = evt.key.toUpperCase()
    if (!allowedKeys.includes(pressKey)) {
      return
    } if (pressKey === "BACKSPACE") {
      deleteLetter()
      return
    } if (pressKey === "ENTER" && nextLetter === 5 ) {
      submitGuess()
      return
    } else {
      insertLetter(pressKey)
    }
  } else {
    return
  }
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
  nextLetter += 1
}

function deleteLetter() {
  if (nextLetter != 0){
    nextLetter--
    findCell().textContent = ''
    currentGuess.pop()
  } else {
    return
  }
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
    newRow()
  } else {
    currentGuess = currentGuess.split('')
    return
  }
}

function newRow(){
  guessesRemaining = guessesRemaining - 1
  nextLetter = 0
  currentGuess = []
}

function compareGuess() {
  winOrLose()
  let guessArray = currentGuess.split('')
  let winArray = winningWord.split('')
  let row = (6 - guessesRemaining)

  let winLetterCount = winArray.reduce(function(prev, letter){
    if(prev[letter]) {
      prev[letter] = prev[letter] + 1
    } else {
      prev[letter] = 1
    }
    return prev
  }, {})

  for (let i = 0; i < guessArray.length; i++) {
    let currentCellEl = document.getElementById(`r${row}c${i}`)
    let currentKeyEl = document.getElementById(`${guessArray[i]}`)
    currentKeyEl.style.backgroundColor = 'rgba(74, 83, 112, 0.363)'
    let letter = guessArray[i]
    
    
    if (guessArray[i] === winArray[i]) {
    currentCellEl.style.backgroundColor = 'rgb(28, 119, 75)'
    winLetterCount[letter] = --winLetterCount[letter]
    } else if (!winArray.includes(letter)) {
      currentCellEl.style.backgroundColor = 'rgba(74, 83, 112, 0.363)'
    } else {
      if (winLetterCount[letter] === 1) {
        currentCellEl.style.backgroundColor = 'rgba(225, 225, 67, 0.702)'
      } else {
        currentCellEl.style.backgroundColor = 'rgba(74, 83, 112, 0.363)'
      }
    }
  }
}


function winOrLose(){
  if (currentGuess === winningWord) {
    winner = true
    if (guessesRemaining === 6) {
      messageEL.textContent = `Luck you!`
    } else if (guessesRemaining === 5) {
      messageEL.textContent = `Spectacular!`
    } else if (guessesRemaining === 4) {
      messageEL.textContent = `Stunning!`
    } else if (guessesRemaining === 3) {
      messageEL.textContent = `Grand!`
    } else if (guessesRemaining === 2) {
      messageEL.textContent = `Brilliant!`
    } else if (guessesRemaining === 1){
      messageEL.textContent = `Well done!`
    }
    resetBtn.textContent = `Play Again`
  } else if (guessesRemaining === 0) {
    messageEL.textContent = `Better luck next time! The word was ${winningWord}`
    resetBtn.textContent = `Play Again`
  }
}

function reset() {
  cellEl.forEach(function(cell) {
    cell.textContent = ''
    cell.style.backgroundColor = 'rgb(206, 224, 239)'
  })
  keyEl.forEach(function(key) {
    key.style.backgroundColor = 'rgb(206, 224, 239)'
  })
  init()
}

function modeBtnText(){
  if (mode === 1){
    modeBtn.innerText = `Easy Mode`
  } else {
    modeBtn.innerText = `Hard Mode`
  }
}
