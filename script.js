document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        const start = window.scrollY;
        const end = target.getBoundingClientRect().top + window.scrollY;
        const distance = end - start;

        const duration = 1000;
        let startTime = null;

        function animation(currentTime) {

            if (!startTime) startTime = currentTime;

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const ease = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            window.scrollTo(0, start + distance * ease);

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    });

});

const contactForm = document.querySelector(".contact-form");
const formMessage = document.querySelector(".form-message");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "" || email === "" || message === "") {
        formMessage.classList.remove("success");
        formMessage.classList.add("error");
        formMessage.textContent = "Please fill in all fields.";
        return;
    }

    if (!emailPattern.test(email)) {
        formMessage.classList.remove("success");
        formMessage.classList.add("error");
        formMessage.textContent = "Please enter a valid email.";
        return;
    }

    formMessage.classList.remove("error");
    formMessage.classList.add("success");
    formMessage.textContent = "Message sent successfully!";

    contactForm.reset();

});