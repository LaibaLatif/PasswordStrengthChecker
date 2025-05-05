function Strength(password) {
  let score = 0;

  const checks = {
    len6: password.length >= 6,
    len10: password.length >= 10,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    digit: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  let totalCriteria = Object.keys(checks).length;
  let filled = 0;

  for (let key in checks) {
    let span = document.getElementById(key);
    if (checks[key]) {
      span.textContent = "✔ " + getReadableName(key);
      span.classList.add("valid");
      span.classList.remove("invalid");
      filled++;
    } else {
      span.textContent = "❌ ----";
      span.classList.add("invalid");
      span.classList.remove("valid");
    }
    
  }

  let progressBar = document.querySelector(".progressFill");
  if (password.length === 0) {
    progressBar.style.width = "0%";
    document.querySelector(".strengthMeter").style.opacity = "0";
  } else {
    progressBar.style.width = `${(filled / totalCriteria) * 100}%`;
    document.querySelector(".strengthMeter").style.opacity = "1";
  }

  return filled;
}

function getReadableName(key) {
  const names = {
    len6: "At least 6 characters",
    len10: "At least 10 characters",
    upper: "Contains uppercase",
    lower: "Contains lowercase",
    digit: "Contains digit",
    special: "Contains special character",
  };
  return names[key];
}

let container = document.querySelector(".container");
document.querySelector("#YourPassword").addEventListener("input", function () {
  let password = this.value;
  let strength = Strength(password);

  container.classList.remove("weak", "moderate", "strong");

  if (password.length === 0) return;

  if (strength <= 2) container.classList.add("weak");
  else if (strength <= 4) container.classList.add("moderate");
  else container.classList.add("strong");
});

let password = document.querySelector("#YourPassword");
let show = document.querySelector(".show");
show.onclick = function () {
  password.type = password.type === "password" ? "text" : "password";
  show.classList.toggle("hide");
};
