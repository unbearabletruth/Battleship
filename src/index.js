import { player, computer } from "./classes";
import { renderBoard, renderShips} from "./dom/renderer";
import { clickToHit, restartEvent } from "./dom/playGame";
import '../assets/style.css';

function initGame(){
    let status = document.querySelector("#status");
    status.textContent = "Let's Play! Hit the enemy board!";
    renderBoard(player);
    renderBoard(computer);
    renderShips(player);
    clickToHit();
}

initGame();
restartEvent();

export {initGame};
