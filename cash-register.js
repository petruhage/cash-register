

function checkCashRegister(price, cash, cid) {
  const currencyUnit = [
    { name: "PENNY", value: 0.01 },
    { name: "NICKEL", value: 0.05 },
    { name: "DIME", value: 0.1 },
    { name: "QUARTER", value: 0.25 },
    { name: "ONE", value: 1 },
    { name: "FIVE", value: 5 },
    { name: "TEN", value: 10 },
    { name: "TWENTY", value: 20 },
    { name: "ONE HUNDRED", value: 100 }
  ];

  let changeDue = cash - price;
  let change = [];
  let totalCid = 0;

  // Calculate the total amount in the drawer
  for (let i = 0; i < cid.length; i++) {
    totalCid += cid[i][1];
  }
  totalCid = totalCid.toFixed(2);

  if (Number(totalCid) < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (Number(totalCid) === changeDue) {
    return { status: "CLOSED", change: cid };
  } else {
    for (let i = currencyUnit.length - 1; i >= 0; i--) {
      const currencyName = currencyUnit[i].name;
      const currencyValue = currencyUnit[i].value;
      const availableCurrency = cid[i][1];
      let returnedCurrency = 0;

      while (availableCurrency > 0 && changeDue >= currencyValue) {
        returnedCurrency += currencyValue;
        changeDue -= currencyValue;
        availableCurrency -= currencyValue;
        changeDue = changeDue.toFixed(2);
        availableCurrency = availableCurrency.toFixed(2);
      }

      if (returnedCurrency > 0) {
        change.push([currencyName, returnedCurrency]);
      }
    }

    if (changeDue == 0) {
      return { status: "OPEN", change: change };
    } else {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
  }
}

// Example usage:
const cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

console.log(checkCashRegister(19.5, 20, cid));
console.log(checkCashRegister(3.26, 100, cid));


checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);