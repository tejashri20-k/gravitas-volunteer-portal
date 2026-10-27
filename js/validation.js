/* validation.js
   Client-side validation for the registration form. On success the volunteer
   is saved (via volunteers.js) and a success message is shown. */

const form = document.getElementById("registrationForm");
const successBox = document.getElementById("successMessage");

const rules = {
  fullName: {
    test: v => /^[A-Za-z][A-Za-z .'-]{2,49}$/.test(v),
    empty: "Enter your full name.",
    invalid: "Use 3 to 50 letters. Numbers and symbols are not allowed."
  },
  regNo: {
    test: v => /^\d{2}[A-Za-z]{3}\d{4}$/.test(v),
    empty: "Enter your registration number.",
    invalid: "Use the format 22BCE1234 (2 digits, 3 letters, 4 digits)."
  },
  email: {
    test: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
    empty: "Enter your email address.",
    invalid: "Enter a valid email, like name@vitstudent.ac.in."
  },
  phone: {
    test: v => /^[6-9]\d{9}$/.test(v),
    empty: "Enter your phone number.",
    invalid: "Enter a 10-digit mobile number starting with 6, 7, 8 or 9."
  },
  year: {
    test: v => v !== "",
    empty: "Select your year of study.",
    invalid: "Select your year of study."
  },
  team: {
    test: v => v !== "",
    empty: "Select a preferred team.",
    invalid: "Select a preferred team."
  }
};

function setError(id, message) {
  const field = document.getElementById(id).closest(".field");
  document.getElementById(id + "Error").textContent = message;
  field.classList.toggle("invalid", message !== "");
  field.classList.toggle("valid", message === "");
}

function validateField(id) {
  const el = document.getElementById(id);
  const value = el.value.trim();
  const rule = rules[id];
  if (value === "") { setError(id, rule.empty); return false; }
  if (!rule.test(value)) { setError(id, rule.invalid); return false; }
  setError(id, "");
  return true;
}

function validateAvailability() {
  const chosen = form.querySelector('input[name="availability"]:checked');
  const err = document.getElementById("availabilityError");
  err.textContent = chosen ? "" : "Select when you are available.";
  return !!chosen;
}

function validateAgree() {
  const box = document.getElementById("agree");
  document.getElementById("agreeError").textContent = box.checked ? "" : "You must accept the guidelines to register.";
  return box.checked;
}

/* Live validation while the user types / leaves a field */
Object.keys(rules).forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener("blur", () => validateField(id));
  el.addEventListener("input", () => {
    if (el.closest(".field").classList.contains("invalid")) validateField(id);
  });
});

/* Only digits in phone field */
document.getElementById("phone").addEventListener("input", e => {
  e.target.value = e.target.value.replace(/\D/g, "");
});

form.addEventListener("submit", event => {
  event.preventDefault();
  successBox.hidden = true;

  const results = Object.keys(rules).map(validateField);
  results.push(validateAvailability(), validateAgree());

  if (results.includes(false)) {
    const firstBad = form.querySelector(".invalid input, .invalid select");
    if (firstBad) firstBad.focus();
    return;
  }

  const regNo = document.getElementById("regNo").value.trim().toUpperCase();
  const email = document.getElementById("email").value.trim().toLowerCase();

  /* Duplicate check */
  if (Volunteers.exists(regNo, email)) {
    setError("regNo", "A volunteer with this registration number or email is already registered.");
    document.getElementById("regNo").focus();
    return;
  }

  Volunteers.add({
    fullName: document.getElementById("fullName").value.trim(),
    regNo: regNo,
    email: email,
    phone: document.getElementById("phone").value.trim(),
    year: document.getElementById("year").value,
    team: document.getElementById("team").value,
    availability: form.querySelector('input[name="availability"]:checked').value,
    registeredAt: new Date().toISOString()
  });

  form.reset();
  document.querySelectorAll(".field").forEach(f => f.classList.remove("valid", "invalid"));
  successBox.hidden = false;
  successBox.scrollIntoView({ behavior: "smooth", block: "center" });
});

form.addEventListener("reset", () => {
  document.querySelectorAll(".error").forEach(e => (e.textContent = ""));
  document.querySelectorAll(".field").forEach(f => f.classList.remove("valid", "invalid"));
  successBox.hidden = true;
});
