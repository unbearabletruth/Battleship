import editIcon from '../../assets/edit.svg';
import { renderSideBarFleet } from './renderer';
import { player } from '../classes';

function createBoardElements(player, board){
    const playerName = document.createElement("p");
    playerName.id = `${player.name}Name`;
    playerName.textContent = player.name;
    const boardAndName = document.createElement("div");
    boardAndName.id = "boardAndName";
    const sideFleet = renderSideBarFleet(player);
    const boardsWrapper = document.querySelector("#boardsWrapper");
    boardAndName.appendChild(playerName);
    boardAndName.appendChild(board);
    boardAndName.appendChild(sideFleet);
    boardsWrapper.appendChild(boardAndName);
    const changeName = createEditIcon(player);
    boardAndName.appendChild(changeName);
}

function createEditIcon(player){
    const boardAndName = document.querySelector("#boardAndName");
    const changeName = document.createElement("img");
    changeName.src = editIcon;
    changeName.id = "editIcon";
    changeName.addEventListener("click", () => {
        let nameInput = formName(player);
        let submit = formSubmit();
        let form = createForm(player);
        let cancel = formCancel(form);
        form.appendChild(nameInput);
        form.appendChild(submit);
        form.appendChild(cancel);
        boardAndName.appendChild(form);
    })
    return changeName;
}

function createForm(player){
    const form = document.createElement("form");
    form.id = "projectForm";
    form.addEventListener("submit", (e) => {
        let nameInput = document.querySelector(`#${player.name}Input`);
        let playerName = document.querySelector(`#${player.name}Name`);
        player.name = nameInput.value;
        playerName.textContent = player.name;
        form.remove();  
        e.preventDefault();   
    });
    return form;
}

function formName(player){
    const nameinput = document.createElement("input");
    nameinput.id = `${player.name}Input`;
    nameinput.type = "text";
    nameinput.placeholder = "your nickname";
    nameinput.required = true;
    return nameinput;
}

function formSubmit(){
    const submit = document.createElement("button");
    submit.classList.add("projectFormButtons");
    submit.innerText = "Add";
    return submit;
}

function formCancel(form){
    const cancel = document.createElement("button");
    cancel.classList.add("projectFormButtons");
    cancel.innerText = "Cancel";
    cancel.addEventListener("click", (e) => {
        e.preventDefault(); 
        form.remove();
    })
    return cancel;
}

export {createBoardElements}