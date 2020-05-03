setTimeout(bananaSwitch, 3000);

function bananaSwitch(){
    let entirePage = document.querySelector("body");
    entirePage.innerHTML = entirePage.innerHTML
        .replace(/the/g, "banana")
        .replace(/The/g, "Banana");
}