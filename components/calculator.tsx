"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return secondValue !== 0 ? firstValue / secondValue : 0
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = Number.parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay("0")
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-lg p-6 space-y-4">
      {/* Display */}
      <div className="bg-muted rounded-md p-4 text-right">
        <div className="text-3xl font-mono font-semibold text-foreground overflow-hidden">{display}</div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <Button variant="destructive" className="col-span-2 h-12 text-lg font-semibold" onClick={clear}>
          Clear
        </Button>
        <Button variant="secondary" className="h-12 text-lg font-semibold" onClick={backspace}>
          ⌫
        </Button>
        <Button
          variant="outline"
          className="h-12 text-lg font-semibold bg-orange-100 hover:bg-orange-200 dark:bg-orange-900 dark:hover:bg-orange-800"
          onClick={() => performOperation("÷")}
        >
          ÷
        </Button>

        {/* Row 2 */}
        <Button
          variant="outline"
          className="h-12 text-lg font-semibold bg-transparent"
          onClick={() => inputNumber("7")}
        >
          7
        </Button>
        <Button
          variant="outline"
          className="h-12 text-lg font-semibold bg-transparent"
          onClick={() => inputNumber("8")}
        >
          8
        </Button>
        <Button
          variant="outline"
          className="h-12 text-lg font-semibold bg-transparent"
          onClick={() => inputNumber("9")}
        >
          9
        </Button>
        <Button
          variant="outline"
          className="h-12 text-lg font-semibold bg-orange-100 hover:bg-orange-200 dark:bg-orange-900 dark:hover:bg-orange-800"
          onClick={() => performOperation("×")}
        >
          ×
        </Button>

        {/* Row 3 */}
        <Button
          variant="outline"
          className="h-12 text-lg font-semibold bg-transparent"
          onClick={() => inputNumber("4")}
        >
          4
        </Button>
        <Button
          variant="outline"
          className="h-12 text-lg font-semibold bg-transparent"
          onClick={() => inputNumber("5")}
        >
          5
        </Button>
        <Button
          variant="outline"
          className="h-12 text-lg font-semibold bg-transparent"
          onClick={() => inputNumber("6")}
        >
          6
        </Button>
        <Button
          variant="outline"
          className="h-12 text-lg font-semibold bg-orange-100 hover:bg-orange-200 dark:bg-orange-900 dark:hover:bg-orange-800"
          onClick={() => performOperation("-")}
        >
          -
        </Button>

        {/* Row 4 */}
        <Button
          variant="outline"
          className="h-12 text-lg font-semibold bg-transparent"
          onClick={() => inputNumber("1")}
        >
          1
        </Button>
        <Button
          variant="outline"
          className="h-12 text-lg font-semibold bg-transparent"
          onClick={() => inputNumber("2")}
        >
          2
        </Button>
        <Button
          variant="outline"
          className="h-12 text-lg font-semibold bg-transparent"
          onClick={() => inputNumber("3")}
        >
          3
        </Button>
        <Button
          variant="outline"
          className="h-12 text-lg font-semibold bg-orange-100 hover:bg-orange-200 dark:bg-orange-900 dark:hover:bg-orange-800"
          onClick={() => performOperation("+")}
        >
          +
        </Button>

        {/* Row 5 */}
        <Button
          variant="outline"
          className="col-span-2 h-12 text-lg font-semibold bg-transparent"
          onClick={() => inputNumber("0")}
        >
          0
        </Button>
        <Button variant="outline" className="h-12 text-lg font-semibold bg-transparent" onClick={inputDecimal}>
          .
        </Button>
        <Button
          className="h-12 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white"
          onClick={handleEquals}
        >
          =
        </Button>
      </div>
    </div>
  )
}
