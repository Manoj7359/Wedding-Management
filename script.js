const TOTAL_BUDGET = 1000000;
const guests = [];
const budget = {
  Venue: { limit: 250000, used: 0 },
  Catering: { limit: 300000, used: 0 },
  Decor: { limit: 150000, used: 0 },
  Photography: { limit: 120000, used: 0 },
  Entertainment: { limit: 100000, used: 0 },
  Misc: { limit: 80000, used: 0 }
};
const menu = [];

function formatINR(num) {
  return "₹" + Number(num).toLocaleString("en-IN");
}

function totalGuestCount() {
  return guests.reduce((sum, g) => sum + g.count, 0);
}

function budgetUsed() {
  return Object.values(budget).reduce((sum, b) => sum + b.used, 0);
}

function renderDashboard() {
  const used = budgetUsed();
  document.getElementById("statGuests").textContent = totalGuestCount();
  document.getElementById("statBudgetUsed").textContent = formatINR(used);
  document.getElementById("statBudgetLeft").textContent = formatINR(Math.max(TOTAL_BUDGET - used, 0));
}

function renderGuests() {
  const tbody = document.getElementById("guestTable");
  tbody.innerHTML = "";
  for (const g of guests) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${g.name}</td><td>${g.phone}</td><td>${g.relation}</td><td>${g.count}</td><td>${g.food}</td><td>${g.drinks}</td><td>${g.table}</td>`;
    tbody.appendChild(row);
  }
}

function addGuest() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const relation = document.getElementById("relation").value.trim();
  const count = Number(document.getElementById("count").value);
  const food = document.getElementById("food").value;
  const drinks = document.getElementById("drinks").value;
  const tableNo = document.getElementById("tableNo").value.trim() || "TBD";

  if (!name || !phone || !relation || !Number.isInteger(count) || count <= 0) {
    alert("Please fill name, phone, relation and valid group size.");
    return;
  }

  guests.push({ name, phone, relation, count, food, drinks, table: tableNo });
  renderGuests();
  renderDashboard();
}

function addExpense() {
  const cat = document.getElementById("expenseCat").value;
  const amt = Number(document.getElementById("expenseAmount").value);
  if (!Number.isFinite(amt) || amt <= 0) {
    alert("Enter a valid expense amount.");
    return;
  }
  budget[cat].used += amt;
  renderDashboard();
}

document.getElementById("addGuestBtn").addEventListener("click", addGuest);
document.getElementById("addExpenseBtn").addEventListener("click", addExpense);