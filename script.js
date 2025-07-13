/* OTP‑box behaviour */
const inputs = document.querySelectorAll('.code');

inputs.forEach((input, index) => {
  input.addEventListener('keydown', e => {
    const prev = () => index > 0 && inputs[index - 1].focus();
    const next = () => index < inputs.length - 1 && inputs[index + 1].focus();

    /* ─── Backspace ─── */
    if (e.key === 'Backspace') {
      e.preventDefault();
      input.value = '';     // always clear current box
      prev();               // and hop left
      return;
    }

    /* ─── Allow only digits, arrows, tab ─── */
    if (!e.key.match(/^[0-9]$/) &&
        !['ArrowLeft','ArrowRight','Tab'].includes(e.key)) {
      e.preventDefault();
    }
  });

  input.addEventListener('input', e => {
    const val = e.target.value;
    if (!val.match(/^[0-9]$/)) {
      e.target.value = '';          // strip non‑digits just in case
      return;
    }
    next();                          // move right after a digit
  });

  input.addEventListener('paste', e => {
    e.preventDefault();
    const digits = (e.clipboardData || window.clipboardData)
                    .getData('text').replace(/\D/g, '');
    if (!digits) return;

    /* fill forward starting from current index */
    let i = index;
    for (const d of digits) {
      if (i >= inputs.length) break;
      inputs[i].value = d;
      i++;
    }
    (i < inputs.length ? inputs[i] : inputs[inputs.length - 1]).focus();
  });
});
