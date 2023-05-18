import { Ship, Gameboard, player, computer } from "./classes";
import { renderBoard, renderShips, clickToHit} from "./dom/renderer";
import '../assets/style.css';
import { playGame } from "./dom/playGame";


renderBoard(player);
renderBoard(computer);
renderShips(player);
//renderShips(computer);
clickToHit();
