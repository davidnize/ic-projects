import { dBank } from "../../declarations/dBank";

async function updateBalance() {
  const currentAmount = await dBank.checkBalance();
  document.getElementById("value").innerText = currentAmount.toString();
}

async function onSubmit(event) {
  event.preventDefault();

  const button = event.currentTarget.querySelector("button");
  const topUpInput = document.getElementById("input-amount");
  const withdrawalInput = document.getElementById("withdrawal-amount");
  button.setAttribute("disabled", true);

  try {
    const topUpAmount = topUpInput.value;
    const withdrawalAmount = withdrawalInput.value;

    if (topUpAmount) {
      await dBank.topUp(BigInt(topUpAmount));
    }
    if (withdrawalAmount) {
      await dBank.withdraw(BigInt(withdrawalAmount));
    }

    topUpInput.value = "";
    withdrawalInput.value = "";
    await updateBalance();
  } finally {
    button.removeAttribute("disabled");
  }
}

window.addEventListener("load", updateBalance);
document.querySelector("form").addEventListener("submit", onSubmit);
