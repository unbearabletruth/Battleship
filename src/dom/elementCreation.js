import editIcon from '../../assets/edit.svg';
import { renderSideBarFleet } from './renderer';

function createBoardElements(player, board){
    const boardsWrapper = document.querySelector("#boardsWrapper");
    const boardUnit = document.createElement("div");
    boardUnit.id = `${player.name}boardUnit`;
    boardUnit.classList.add("boardUnit");
    boardsWrapper.appendChild(boardUnit);  
    const nameAndEdit = document.createElement("div");
    nameAndEdit.id = `${player.name}nameAndEdit`;
    nameAndEdit.classList.add("boardName");
    const playerName = document.createElement("p");
    playerName.id = `${player.name}Name`;
    playerName.textContent = player.name;
    const changeName = createEditIcon(player, nameAndEdit);
    const sideFleet = renderSideBarFleet(player);
    nameAndEdit.appendChild(playerName);
    nameAndEdit.appendChild(changeName);
    boardUnit.appendChild(nameAndEdit);
    boardUnit.appendChild(board);
    boardUnit.appendChild(sideFleet);
}

function createEditIcon(player, nameAndEdit){
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
        nameAndEdit.appendChild(form);
    })
    return changeName;
}

function createForm(player){
    const form = document.createElement("form");
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

export {createBoardElements}