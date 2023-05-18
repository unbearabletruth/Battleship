import { Ship, Gameboard, player, computer } from "./classes";
import { renderBoard, renderShips, renderShipsComp } from "./dom/renderer";
import '../assets/style.css';


renderBoard(player);
renderBoard(computer);
renderShips(player);
renderShips(computer);

