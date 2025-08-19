const display = document.getElementById("result")
let currentInput = ""
let operator = ""
let previousInput = ""

function appendToDisplay(value) {
  if (display.value === "0" && value !== ".") {
    display.value = value
  } else {
    display.value += value
  }
}

function clearDisplay() {
  display.value = ""
  currentInput = ""
  operator = ""
  previousInput = ""
}

function deleteLast() {
  display.value = display.value.slice(0, -1)
}

function calculateResult() {
  try {
    // Replace × with * for evaluation
    const expression = display.value.replace(/×/g, "*")

    // Basic validation to prevent code injection
    if (/^[0-9+\-*/.() ]+$/.test(expression)) {
      let result = eval(expression)

      // Handle division by zero
      if (!isFinite(result)) {
        display.value = "Error"
        return
      }

      // Round to avoid floating point precision issues
      result = Math.round(result * 100000000) / 100000000
      display.value = result
    } else {
      display.value = "Error"
    }
  } catch (error) {
    display.value = "Error"
  }
}

// Add keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key

  if ((key >= "0" && key <= "9") || key === ".") {
    appendToDisplay(key)
  } else if (key === "+" || key === "-") {
    appendToDisplay(key)
  } else if (key === "*") {
    appendToDisplay("*")
  } else if (key === "/") {
    event.preventDefault() // Prevent browser search
    appendToDisplay("/")
  } else if (key === "Enter" || key === "=") {
    calculateResult()
  } else if (key === "Escape" || key === "c" || key === "C") {
    clearDisplay()
  } else if (key === "Backspace") {
    deleteLast()
  }
})
