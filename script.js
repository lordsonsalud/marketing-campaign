// ==========================================================================
// KAPE RIGHT NEOW - REAL-TIME COUNTDOWN & FORM VALIDATION LOGIC
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------
  // 1. REAL-TIME COUNTDOWN TIMER (Live countdown to November 14, 2026)
  // ------------------------------------------------------------------------
  const deadlineDate = new Date("Nov 14, 2026 23:59:59").getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const timerMessageEl = document.getElementById("timer-message");

  function updateCountdown() {
    const now = new Date().getTime();
    const distanceToEnd = deadlineDate - now;

    // If deadline has passed
    if (distanceToEnd < 0) {
      if (daysEl) daysEl.innerText = "00";
      if (hoursEl) hoursEl.innerText = "00";
      if (minutesEl) minutesEl.innerText = "00";
      if (secondsEl) secondsEl.innerText = "00";
      if (timerMessageEl) {
        timerMessageEl.innerText = "Promo has ended! Stay tuned for regular student deals.";
      }
      return;
    }

    // Calculate live time remaining
    const days = Math.floor(distanceToEnd / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distanceToEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distanceToEnd % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distanceToEnd % (1000 * 60)) / 1000);

    // Update DOM elements safely
    if (daysEl) daysEl.innerText = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.innerText = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, "0");
    
    if (timerMessageEl) {
      timerMessageEl.innerText = "Claim Your 20% Discount Before Promo Ends:";
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ------------------------------------------------------------------------
  // 2. LEAD FORM VALIDATION
  // ------------------------------------------------------------------------
  const leadForm = document.getElementById("discount-form");
  const successMsg = document.getElementById("success-message");

  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("student-name");
      const emailInput = document.getElementById("student-email");
      const termsCheck = document.getElementById("terms-check");

      const nameError = document.getElementById("name-error");
      const emailError = document.getElementById("email-error");
      const termsError = document.getElementById("terms-error");

      let isValid = true;

      // Reset errors
      if (nameError) nameError.innerText = "";
      if (emailError) emailError.innerText = "";
      if (termsError) termsError.innerText = "";

      // Validate Name
      if (!nameInput || nameInput.value.trim() === "") {
        if (nameError) nameError.innerText = "Please enter your full name.";
        isValid = false;
      }

      // Validate Email
      const emailPattern = /^[^s@]+@[^s@]+.[^s@]+$/;
      if (!emailInput || !emailPattern.test(emailInput.value.trim())) {
        if (emailError) emailError.innerText = "Please enter a valid email address.";
        isValid = false;
      }

      // Validate Terms Checkbox
      if (termsCheck && !termsCheck.checked) {
        if (termsError) termsError.innerText = "You must agree to the promo terms.";
        isValid = false;
      }

      if (isValid) {
        leadForm.reset();
        if (successMsg) {
          successMsg.style.display = "block";
          successMsg.innerText = "Success! Your 20% discount voucher code has been sent to your email.";
        }
      }
    });
  }
});