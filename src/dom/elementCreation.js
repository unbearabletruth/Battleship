import editIcon from '../../assets/edit.svg';
import { renderSideBarFleet } from './renderer';

function createBoardElements(player){
    const boardsWrapper = document.querySelector("#boardsWrapper");

    const boardUnit = document.createElement("div");
    boardUnit.id = `${player.name}boardUnit`;
    boardUnit.classList.add("boardUnit");
    boardsWrapper.appendChild(boardUnit);

    const nameBlock = document.createElement("div");
    nameBlock.id = `${player.name}nameBlock`;
    nameBlock.classList.add("boardName");
    boardUnit.appendChild(nameBlock);

    const playerName = document.createElement("p");
    playerName.id = `${player.name}Name`;
    playerName.textContent = player.name;
    nameBlock.appendChild(playerName);

    const changeName = createEditIcon(player, nameBlock);
    nameBlock.appendChild(changeName);
    
    const board = document.createElement("div");
    board.id = `${player.name}Board`;
    board.classList.add("board");
    boardUnit.appendChild(board);
    
    const sideFleet = renderSideBarFleet(player);
    boardUnit.appendChild(sideFleet);
}

function createSquare(player, i, j){
    const board = document.querySelector(`#${player.name}Board`);
    const square = document.createElement("div");
    square.classList.add("square");
    square.id = `${i}${j}${player.id}`
    square.style.background = "white";
    board.appendChild(square);
}

function createEditIcon(player, nameBlock){
    const changeName = document.createElement("img");
    changeName.src = editIcon;
    changeName.id = "editIcon";
    changeName.addEventListener("click", () => {
        createForm(player, nameBlock);
    })
    return changeName;
}

function createForm(player, nameBlock){
    const form = document.createElement("form");
    const nameInput = formName(player);
    const submit = formSubmit();
    const cancel = formCancel(form);
    form.appendChild(nameInput);
    form.appendChild(submit);
    form.appendChild(cancel);
    form.addEventListener("submit", (e) => {
        let nameInput = document.querySelector(`#${player.name}Input`);
        let playerName = document.querySelector(`#${player.name}Name`);
        player.name = nameInput.value;
        playerName.textContent = player.name;
        form.remove();  
        e.preventDefault();   
    });
    nameBlock.appendChild(form);
    return form;
}

function formName(player){
    const nameinput = document.createElement("input");
    nameinput.id = `${player.name}Input`;
    nameinput.type = "text";
    nameinput.placeholder = "Your nickname";
    nameinput.required = true;
    return nameinput;
}

function formSubmit(){
    const submit = document.createElement("button");
    submit.classList.add("formButton");
    submit.innerText = "Change";
    return submit;
}

function formCancel(form){
    const cancel = document.createElement("button");
    cancel.classList.add("formButton");
    cancel.innerText = "Cancel";
    cancel.addEventListener("click", (e) => {
        e.preventDefault(); 
        form.remove();
    })
    return cancel;
}

export {createBoardElements, createSquare}