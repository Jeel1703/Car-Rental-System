const carSelect = document.getElementById("car");
const daysInput = document.getElementById("days");
const total = document.getElementById("total");

const form = document.getElementById("bookingForm");
const message = document.getElementById("message");


function calculateTotal() {

  const option =
    carSelect.options[carSelect.selectedIndex];

  const price =
    Number(option?.dataset.price || 0);

  const days =
    Math.max(1, Number(daysInput.value) || 1);

  const amount = price * days;

  total.textContent =
    `₹${amount.toLocaleString("en-IN")}`;
}


/* SELECT CAR BUTTON */

document.querySelectorAll(".select-btn")
.forEach(button => {

  button.addEventListener("click", () => {

    carSelect.value =
      button.dataset.car;

    calculateTotal();

    document
      .getElementById("booking")
      .scrollIntoView({
        behavior: "smooth"
      });

  });

});


/* UPDATE TOTAL */

carSelect.addEventListener(
  "change",
  calculateTotal
);

daysInput.addEventListener(
  "input",
  calculateTotal
);


/* DATE */

document.getElementById("pickup").min =
  new Date()
  .toISOString()
  .split("T")[0];


/* FORM VALIDATION */

form.addEventListener("submit", (e) => {

  e.preventDefault();


  const name =
    document.getElementById("name")
    .value.trim();

  const email =
    document.getElementById("email")
    .value.trim();

  const phone =
    document.getElementById("phone")
    .value.trim();

  const car =
    carSelect.value;

  const pickup =
    document.getElementById("pickup")
    .value;

  const days =
    Number(daysInput.value);


  if (
    !name ||
    !email ||
    !phone ||
    !car ||
    !pickup ||
    days < 1
  ) {

    message.style.color = "#d33";

    message.textContent =
      "Please fill in all fields correctly.";

    return;
  }


  /* PHONE VALIDATION */

  if (!/^\d{10}$/.test(phone)) {

    message.style.color = "#d33";

    message.textContent =
      "Phone number must contain exactly 10 digits.";

    return;
  }


  /* SUCCESS */

  message.style.color = "#16804a";

  message.textContent =
    `Booking confirmed for ${name}! ` +
    `${car} reserved for ${days} day(s). ` +
    `Total: ${total.textContent}`;

});


/* INITIAL TOTAL */

calculateTotal();