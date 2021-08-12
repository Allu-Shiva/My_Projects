let budgetBtnEl = document.getElementById("setBudgetBtn");
let budgetInputEl = document.getElementById("budgetInput");
let budgetErrEl = document.getElementById("budgetInputErrMsg");
let budgetAmountEl = document.getElementById("budgetAmount");
let balanceAmountEl = document.getElementById("balanceAmount");

let expenseTitleInputEl = document.getElementById("expenseTitleInput");
let expenseAmountInputEl = document.getElementById("expenseAmountInput");
let totalExpensesAmountEl = document.getElementById("totalExpensesAmount");
let expensesHistoryEl = document.getElementById("expensesHistory");
let expenseTitleInputErrMsgEl = document.getElementById("expenseTitleInputErrMsg");
let expenseAmountInputErrMsgEl = document.getElementById("expenseAmountInputErrMsg");

let budget = null;
let remainingBal = null;
budgetBtnEl.addEventListener('click', function() {
    if (budgetInputEl.value === "" || isNaN(budgetInputEl.value)) {
        budgetErrEl.textContent = "*Required";
        return;
    } else {
        budgetErrEl.textContent = "";
        budget = budgetInputEl.value;
        remainingBal = budget - parseInt(totalExpensesAmountEl.textContent);
        budgetInputEl.value = "";
        budgetAmountEl.textContent = budget;
        balanceAmountEl.textContent = remainingBal;
    }
    budgetInputEl.addEventListener('change', function(event) {
        budgetErrEl.textContent = "";
        budget = event.target.value;
        return;
    })
})


let addExpenseBtnEl = document.getElementById("addExpenseBtn");
let expense = null;
let expenseName = "";
let prevExpense = 0;
addExpenseBtnEl.addEventListener('click', function() {
    if (expenseTitleInputEl.value === "") {
        expenseTitleInputErrMsgEl.textContent = "*Required";
    } else if (expenseAmountInputEl.value === "" || isNaN(expenseAmountInputEl.value)) {
        expenseTitleInputErrMsgEl.textContent = "";
        expenseAmountInputErrMsg.textContent = "*Required";
    } else {
        expenseAmountInputErrMsg.textContent = "";
        expenseTitleInputErrMsgEl.textContent = "";
        expenseName = expenseTitleInputEl.value;
        expense = parseInt(expenseAmountInputEl.value);
        expenseTitleInputEl.value = "";
        expenseAmountInputEl.value = "";
        prevExpense = parseInt(totalExpensesAmountEl.textContent);
        totalExpensesAmountEl.textContent = "";
        totalExpensesAmountEl.textContent = prevExpense + expense;
        balanceAmountEl.textContent = parseInt(budgetAmountEl.textContent) - parseInt(totalExpensesAmountEl.textContent);
        addItem(expenseName, expense);
    }
})
let count = 0;

function addItem(title, price) {
    let liEl = document.createElement("li");
    count = count + 1;
    let liid = "expense" + count;
    liEl.id = liid;
    let titleEl = document.createElement("p");
    let priceEl = document.createElement("p");
    let iconContainerEl = document.createElement("div");
    let iconEl = document.createElement("i");
    iconEl.classList.add("fas", "fa-trash-alt");
    iconEl.onclick = function() {
        deleteItem(liid, price);
    }
    iconContainerEl.appendChild(iconEl);
    titleEl.textContent = title;
    priceEl.textContent = price;
    titleEl.classList.add("titleSize");
    priceEl.classList.add("titleSize", 'amountSpent');
    liEl.appendChild(titleEl);
    liEl.appendChild(priceEl);
    liEl.appendChild(iconContainerEl);
    liEl.classList.add('d-flex', 'justify-content-around', 'listItem');
    expensesHistoryEl.appendChild(liEl);
    console.log(expensesHistoryEl);

}

function deleteItem(id, price) {
    let remEl = document.getElementById(id);
    expensesHistoryEl.removeChild(remEl);
    totalExpensesAmountEl.textContent = parseInt(totalExpensesAmountEl.textContent) - parseInt(price);
    balanceAmountEl.textContent = parseInt(balanceAmountEl.textContent) + parseInt(price);
}