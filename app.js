'use strict';
let equalBtnPressed = false;

function clear() {
  let screenInput = document.getElementById('screen_input');
  let screenOutput = document.getElementById('screen_output');
  screenInput.textContent = "";
  screenOutput.textContent = "";
}

function backspace() {
  let screenInput = document.getElementById('screen_input');
  let string = screenInput.textContent;
  string = string.substring(0, string.length - 1);
  screenInput.textContent = string;
}

function getValue(e) {
  return e.target.value;
}

function addActive(e) {
  let key = e.key;
  try {
    let pressedKey = document.querySelector(`button[value="${key}"`);
    pressedKey.classList.add('active');
  } catch (e) {
    console.log(`${key} is not valid here`);
  }
}

function removeActive(e) {
  e.target.classList.remove('active');
}

function getKeyboardInput(e) {
  if (equalBtnPressed == true) {
    clear();
    equalBtnPressed = false;
  }
  let screenInput = document.getElementById('screen_input');
  let key = e.key;
  let stringLength = screenInput.textContent.trim().length;

  addActive(e);

  switch (true) {

    case key == '=' || key == 'Enter':
      writeOutput();
      break;
    case key == 'Backspace':
      backspace();
      break;
    case key == 'Delete' || key == 'c':
      clear();
      break;
    case stringLength > 40:
      return;
    case (key >= 0 && key <= 9):
    case key == '+':
    case key == '-':
    case key == '*':
    case key == '/':
      screenInput.textContent += key;
      break;

  }


}

function writeInput(e) {
  if (equalBtnPressed == true) {
    clear();
    equalBtnPressed = false;
  }
  let screenInput = document.getElementById('screen_input');
  let stringLength = screenInput.textContent.trim().length;
  if (stringLength > 40) {
    return;
  }
  let value = getValue(e);
  screenInput.textContent += value;
}

function writeOutput() {
  equalBtnPressed = true;
  let screenInput = document.getElementById('screen_input');
  let screenOutput = document.getElementById('screen_output');
  let value = screenInput.textContent;
  try {
    screenOutput.textContent = eval(value);

  } catch (e) {
    screenOutput.textContent = "ERROR";
  }
}

let operands = Array.from(document.querySelectorAll('.operand, .operator'));
operands.forEach(operand => operand.addEventListener('click', writeInput));

let clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clear);

let equalButton = document.querySelector('.equal');
equalButton.addEventListener('click', writeOutput);

let backspaceButton = document.querySelector('.backspace');
backspaceButton.addEventListener('click', backspace);

window.addEventListener('keydown', getKeyboardInput);
window.addEventListener('transitionend', removeActive);
