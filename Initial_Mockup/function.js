function changeMode() {
    head = document.querySelector("header");
    if(head.innerText == "Work Mode") {
        head.innerText = "Proof Mode";
    } else {
        head.innerText = "Work Mode";
    }

    buttons = document.querySelectorAll(".sidebar_button");
    for(var i = 0; i < buttons.length; i++) {
        if(head.innerText == "Word Mode") {
            if(buttons[i].classList.contains("proof_button")) {
                buttons[i].style.background = "gray";
            } else {
                buttons[i].style.background = "white";
            }
        } else {
            if(buttons[i].classList.contains("word_button")) {
                buttons[i].style.background = "gray";
            } else {
                buttons[i].style.background = "white";
            }
        }
    }
}