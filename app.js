const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("button");
const fromSelect = document.querySelector(".from select");
const toSelect = document.querySelector(".to select");
const amountInput = document.querySelector("input");
const resultText = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;

    if (select === fromSelect && currCode === "USD") option.selected = true;
    if (select === toSelect && currCode === "INR") option.selected = true;

    select.append(option);
  }
}

function updateFlag(selectElement) {
  const currencyCode = selectElement.value;
  const countryCode = countryList[currencyCode];
  const flagURL = `https://flagsapi.com/${countryCode}/flat/64.png`;

  const img = selectElement.parentElement.querySelector("img");
  img.src = flagURL;
}

for (let select of dropdowns) {
  select.addEventListener("change", () => {
    updateFlag(select);
  });
}

async function convertCurrency() {
  let amount = Number(amountInput.value);

  if (amount <= 0 || isNaN(amount)) {
    resultText.innerText = "Please enter a valid number";
    return;
  }

  resultText.innerText = "Loading......";

  try {
    const url = `https://open.er-api.com/v6/latest/${fromSelect.value}`;
    const response = await fetch(url);
    const data = await response.json();
    let toCountry = toSelect.value;
    const rate = data.rates[toCountry];
    const finalAmount = amount * rate;
    console.log(finalAmount);
    resultText.innerText = `${amount} ${fromSelect.value} = ${finalAmount} ${toSelect.value}`;
  } catch (err) {
    resultText.innerText = "Failed to get exchange rate";
  }
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  convertCurrency();
});

window.addEventListener("load", () => {
  convertCurrency();
});
