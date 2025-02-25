let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");

let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true
let count = 0;      //playerx,playery 
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [2, 4, 6], [0, 4, 8]
];
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");  // hide msg-container

}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;   // buttons clickable
        box.innerText = "";
    }
};


winPatterns.forEach((element) => {
    console.log(element)
});
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked")
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            showDraw();
        }
    });
});
const showDraw = () => {
    msg.innerText = "😢 It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes(); // Disable further clicks
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;   // to disabled the buttns
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();   // pattern match --disable
}
const checkWinner = () => {
    for (let patterns of winPatterns) {
        /*    console.log(patterns[0], patterns[1], patterns[2])
           console.log(boxes[patterns[0]].innerText, boxes[patterns[1]].innerText, boxes[patterns[2]].innerText); */
        let pos1 = boxes[patterns[0]].innerText;
        let pos2 = boxes[patterns[1]].innerText;
        let pos3 = boxes[patterns[2]].innerText;
        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3 && pos3 === pos1) {
                console.log("winner" + pos1);

                showWinner(pos1);

            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);