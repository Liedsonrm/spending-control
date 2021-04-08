const transactionUl = document.querySelector("#transactions")
const incomeDisplay = document.querySelector("#money-plus")
const expenseDisplay = document.querySelector("#money-minus")
const balanceDisplay = document.querySelector("#balance")
const form = document.querySelector("#form")
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')



console.log(transactionUl)

const localStorageTransactions = JSON.parse(localStorage
    .getItem("transactions"))
let transactions = localStorage
    .getItem("transactions") !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions
        .filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionIntoDOOM = transaction => {
    const operator = transaction.amount < 0 ? "-": "+"
    const CSSClass = transaction.amount < 0 ? "minus": "plus"
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')
    
    li.classList.add(CSSClass)
    li.innerHTML = `
    ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
        x
    </button>
    `

    // transactionUl.append(li)
    transactionUl.append(li)
    
} 

const uptadeBalanceValues = () => {
    const transactionsAmounts = transactions
        .map(transaction => transaction.amount)
    const total = transactionsAmounts
        .reduce((acumullator, transaction) => acumullator + transaction, 0)
        .toFixed(2)
    const income = transactionsAmounts
        .filter(value => value > 0)
        .reduce((acumullator, value) => acumullator + value, 0)
        .toFixed(2)

    const expense = Math.abs(transactionsAmounts
        .filter(value => value < 0)
        .reduce((acumullator, value) => acumullator + value, 0))
        .toFixed(2)
    
    balanceDisplay.textContent = `R$ ${total}`
    expenseDisplay.textContent = `R$ ${expense}`
    incomeDisplay.textContent = `R$ ${income}`
}


const init = () => {
    transactionUl.innerHTML = ""
    transactions.forEach(addTransactionIntoDOOM)
    uptadeBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateId = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()


    if(inputTransactionName.value.trim() === "" || inputTransactionAmount.value.trim() === ""){
        alert("Por favor, preencha tanto o nome quanto o valor da transação")
        return
    }

    const transaction = {
        id: generateId(), 
        name: transactionName, 
        amount: Number(transactionAmount)
    }
    transactions.push(transaction)
    init()
    updateLocalStorage()

    inputTransactionName.value = ""
    inputTransactionAmount.value  = ""
    
})












