function changeMode() {
    head = document.querySelector("header");
    if(head.innerText == "Work Mode") {
        head.innerText = "Proof Mode";
    } else {
        head.innerText = "Work Mode";
    }

    buttons = document.querySelectorAll(".sidebar_button");
}