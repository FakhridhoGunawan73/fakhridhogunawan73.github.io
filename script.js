const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", function () {
    if (menu.classList.contains("hidden")) {
        (menu.classList.remove("hidden"));
    } else {
        menu.classList.add("hidden");
    }
});

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(contactForm);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            alert("Pesan berhasil dikirim!");
            contactForm.reset();
        } else {
            alert("Pesan gagal dikirim. Silakan coba lagi.");
        }
    } catch (error) {
        alert("Terjadi kesalahan koneksi. Silakan coba lagi.");
        console.error(error);
    }
});
