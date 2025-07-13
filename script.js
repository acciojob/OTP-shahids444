/* ---------- OTP‑box behaviour ---------- */
const inputs = document.querySelectorAll(".code");

/* 1️⃣ Make absolutely sure #code‑1 has focus as soon as JS runs */
if (inputs.length) inputs[0].focus();

/* 2️⃣ Keyboard handling */
inputs.forEach((input, index) => {
  const prev = () => index > 0 && inputs[index - 1].focus();
  const next = () => index < inputs.length - 1 && inputs[index + 1].focus();

  /* ─ Backspace ─ */
  input.addEventListener("keydown", e => {
    if (e.key === "Backspace") {
      e.preventDefault();
      input.value = "";   // always clear current box
      prev();             // and hop left
      return;
    }
    /* Allow only digits, arrows, tab */
    if (
      !e.key.match(/^[0-9]$/) &&
      !["ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
    ) {
      e.preventDefault();
    }
  });

  /* ─ Digit typed ─ */
  input.addEventListener("input", e => {
    const val = e.target.value;
    if (!val.match(/^[0-9]$/)) {
      e.target.value = ""; // strip non‑digits
      return;
    }
    next(); // move right
  });

  /* ─ Paste support ─ */
  input.addEventListener("paste", e => {
    e.preventDefault();
    const digits = (e.clipboardData || window.clipboardData)
      .getData("text")
      .replace(/\D/g, "");
    if (!digits) return;

    let i = index;
    for (const d of digits) {
      if (i >= inputs.length) break;
      inputs[i].value = d;
      i++;
    }
    (i < inputs.length ? inputs[i] : inputs[inputs.length - 1]).focus();
  });
});
