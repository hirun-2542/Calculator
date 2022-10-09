class Calculator{
constructor(previous,current) {
    this.previous = previous
    this.current = current
    this.clear()
}

clear(){
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
}

delete(){
    this.currentOperand = this.currentOperand.toString().slice(0,-1)
}

appendnumber(number){
    if(number === '.' && this.currentOperand.includes('.')) return
 this.currentOperand = this.currentOperand.toString() + number.toString()
}

chooseoperation(operation){
    if(this.currentOperand === '') return
    if(this.previousOperand !== ''){
        this.compute()
    } 
    this.operation = operation
    this.previousOperand = `${this.currentOperand} ${this.operation}`
    this.currentOperand = ''
}

compute(){
    let result
    const prev = parseFloat(this.previousOperand)
    const cur = parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(cur)) return
    switch (this.operation) {
        case '+': result = prev + cur
            break
        case '-': result = prev - cur
            break
        case '*': result = prev * cur
            break
        case '÷': result = prev / cur
            break
        default:
            return
    }
    this.currentOperand = result
    this.previousOperand = `${prev} ${this.operation} ${cur} =`
    this.operation = undefined
}

updateDisplay(){
    this.current.innerText = this.currentOperand
    this.previous.innerText = this.previousOperand
}
}


const numbers = document.querySelectorAll('[data-number]')
const operation = document.querySelectorAll('[data-operation]')
const equals = document.querySelector('[data-equals]')
const deletes = document.querySelector('[data-delete]')
const clear = document.querySelector('[data-clear]')
const previous = document.querySelector('[data-previous]')
const current = document.querySelector('[data-current]')

const calculator = new Calculator(previous,current)

numbers.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.appendnumber(button.innerText)
        calculator.updateDisplay() 
    })
})

operation.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseoperation(button.innerText)
        calculator.updateDisplay()
    })
})

equals.addEventListener('click', ()=> {
        calculator.compute()
        calculator.updateDisplay()
})

clear.addEventListener('click',()=>{
        calculator.clear()
        calculator.updateDisplay()
})

deletes.addEventListener('click', ()=>{
        calculator.delete()
        calculator.updateDisplay()
    })