const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");

console.log(menuButton);
console.log(menu);

menuButton.addEventListener("click", function () {
    if (menu.classList.contains("hidden")) {
        (menu.classList.remove("hidden"));
    } else {
        menu.classList.add("hidden");
    }
});