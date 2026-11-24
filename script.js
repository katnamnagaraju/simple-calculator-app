const display = document.getElementById("display");

function appendValue(value) {
  if (display.value === "0" && ![".", "+", "-", "*", "/", "%"].includes(value)) {
    display.value = value;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  display.value = "0";
}

function deleteLast() {
  display.value = display.value.length > 1 ? display.value.slice(0, -1) : "0";
}

function calculate() {
  try {
    const expression = display.value.replace(/%/g, "/100");
    if (!/^[0-9+\-*/.() ]+$/.test(expression)) throw new Error();
    const result = Function('"use strict"; return (' + expression + ')')();
    if (!Number.isFinite(result)) throw new Error();
    display.value = Number(result.toFixed(10)).toString();
  } catch {
    display.value = "Error";
    setTimeout(clearDisplay, 900);
  }
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if ("0123456789.+-*/%".includes(key)) appendValue(key);
  else if (key === "Enter" || key === "=") calculate();
  else if (key === "Escape") clearDisplay();
  else if (key === "Backspace") deleteLast();
});
