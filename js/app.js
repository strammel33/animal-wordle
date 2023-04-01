/*----------------------- CONSTANTS --------------------------*/

import { getRandomAnimal, getRandomEasyAnimal } from "../assets/data/data.js";

/*--------------------- VARIABLES (state) ---------------------*/

let currentGuess, guessesRemaining, currentLetter, letter, mode, winner, winningWord

/*------------------- CACHED ELEMENT REFERENCES -------------------*/

const boardEl = document.getElementById('board')

const cellEl = document.querySelectorAll('.cell')

const keyboardEl = document.querySelector('.keyboard')

const resetBtn = document.querySelector('.reset')

const modeBtn = document.querySelector('.mode-btn')

const messageEL = document.getElementById('message')

/*--------------------- EVENT LISTENERS --------------------------*/

modeBtn.addEventListener('click', modeChoice)

/*----------------------- FUNCTIONS ---------------------------------*/
init()

function init(){
  currentGuess = 0
  guessesRemaining = 6
  currentLetter = ''
  mode = 1
  winner = false
  getWord()
}

function getWord(){
  mode === 1 ? winningWord = getRandomEasyAnimal() : winningWord = getRandomAnimal()
  return winningWord
}

function modeChoice() {
  return mode = mode * -1
}