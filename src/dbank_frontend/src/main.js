import "./index.scss";
import { dbank_backend } from "../../declarations/dbank_backend";

window.addEventListener("load", async function () {
  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = currentAmount.toFixed(2);
});

document.querySelector("form").addEventListener("submit", async function (event) {
  event.preventDefault();
  document.getElementById("submit-btn").setAttribute("disabled", true);
  const addedAmount = parseFloat(document.getElementById("input-amount").value);
  const withdrawnAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  if (document.getElementById("input-amount").value.length != 0) {
    await dbank_backend.topUp(addedAmount);
  }
  if (document.getElementById("withdrawal-amount").value.length != 0) {
    await dbank_backend.withdraw(withdrawnAmount);
  }

  await dbank_backend.totalValue();

  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = currentAmount.toFixed(2);

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  document.getElementById("submit-btn").removeAttribute("disabled");
});
