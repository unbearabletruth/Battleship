(()=>{"use strict";class t{constructor(t){this.length=t,this.timesHit=0,this.sunk=!1}hit(){this.timesHit+=1,this.isSunk()}isSunk(){this.length===this.timesHit&&(this.sunk=!0)}}const e=new class{constructor(t){this.size=t,this.board=[]}createBoard(){for(let t=0;t<this.size;t++){let e=[];this.board.push(e);for(let e=0;e<this.size;e++)this.board[t][e]=""}}makeCoordinates(t){let e,i=!1;for(;!i;){const o=["up","right"],r=Math.floor(Math.random()*this.size),s=Math.floor(Math.random()*this.size),a=o[Math.floor(Math.random()*o.length)];e=this.tryPlace(r,s,t,a),e&&(this.placeShip(r,s,t,a),i=!0)}}tryPlace(t,e,i,o){let r=!1;if("up"===o){for(let o=0;o<i;o++){if(console.log(t,e),t-o<0||"object"==typeof this.board[t-o][e])return r;if(t+1<this.size&&"object"==typeof this.board[t+1][e])return r;if(t-i>0&&"object"==typeof this.board[t-i][e])return r;if(e-1>0&&"object"==typeof this.board[t-o][e-1])return r;if(e+1<this.size&&"object"==typeof this.board[t-o][e+1])return r}return r=!0,r}if("right"===o){for(let o=0;o<i;o++){if(e+o>=this.size||"object"==typeof this.board[t][e+o])return r;if(e-1>0&&"object"==typeof this.board[t][e-1])return r;if(e+i<this.size&&"object"==typeof this.board[t][e+i])return r;if(t-1>0&&"object"==typeof this.board[t-1][e+o])return r;if(t+1<this.size&&"object"==typeof this.board[t+1][e+o])return r}return r=!0,r}}placeShip(e,i,o,r){let s=new t(o);if("up"===r)for(let t=e;t>e-o;t--)this.board[t][i]=s;else if("right"===r)for(let t=i;t<i+o;t++)this.board[e][t]=s}receiveAttack(t,e){if("object"==typeof this.board[t][e])return this.board[t][e].hit();this.board[t][e]="hit"}allSunk(){for(let t=0;t<this.size;t++)for(let e=0;e<this.size;e++)if(!0===this.board[t][e])return!1;return!0}}(10);e.createBoard(),e.makeCoordinates(4),e.makeCoordinates(3),e.makeCoordinates(3),e.makeCoordinates(2),e.makeCoordinates(2),e.makeCoordinates(2),e.makeCoordinates(1),e.makeCoordinates(1),e.makeCoordinates(1),e.makeCoordinates(1),console.log(e.board)})();