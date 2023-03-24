const startLocation = [0, 0];
const endLocation = [1,2];
const container = document.querySelector(".container");
const coordArray = [];
const board = document.createElement("div");

board.setAttribute("class", "board");
for (var i = 0; i < 8; i++) {
    let cellRowCoord = i;
    coordArray.push(cellRowCoord);
    //console.log(cellRowCoord);
    for (var j = 0; j < 8; j++) {
        let cellColumnCoord = j;
        coordArray.push(cellColumnCoord);
        //console.log(cellColumnCoord)
        const square = document.createElement('div');
        square.className = 'square';
        if((i + j) % 2 == 0) {
            square.style.backgroundColor = 'rgb(0, 0, 0)';
        } board.appendChild(square);
        square.dataset.coordArray = coordArray;
        //square.textContent = coordArray; //DELETE when done 
        coordArray.splice(1, 1);
    }
    document.body.appendChild(board);
    board.appendChild(container);
    coordArray.splice(0,2);
}

//put knight at [0,0]
const squareNodes = board.querySelectorAll(".square");
squareNodes.forEach((squareNode) => {
    if (startLocation.toString() === squareNode.dataset.coordArray) {
        let knight = document.createElement("img");
        knight.src = "./knight.PNG";
        squareNode.appendChild(knight);
    }
    if (endLocation.toString() === squareNode.dataset.coordArray) {
        let knight = document.createElement("img");
        knight.src = "./knight.PNG";
        squareNode.appendChild(knight);
    }
});

class Node {
    constructor(row, col, distanceFromStartPosition) {
        this.row = row;
        this.col = col;
        this.distanceFromStartPosition = distanceFromStartPosition;
    }
    getPositionString() {
        return `${this.row}, ${this.col}`;
    }
}

function getNeighbors(row, col) {
   const neighbors = [];
   const directions = [[-2, -1], [-2, 1], [-1, 2], [2, 1], [2, -1], [1, -2], [-1, -2]];

   for (const direction of directions) {
        const rowChange = direction[0];
        const colChange = direction[1];

        const neighborRow = row + rowChange;
        const neighborCol = col + colChange;

        if (neighborCol >= 0 && neighborCol <= 7) {
            if (neighborRow >= 0 && neighborCol <= 7) {
                neighbors.push([neighborRow, neighborCol]);
            }
        }
    }
    return neighbors;
}

function getKnightShortestPath(targetRow, targetCol) {
    const queue = [];
    let distance = 0;
    let minDistance = Infinity;
    const startNode = new Node(0, 0, distance);
    queue.push(startNode);

    const visited = new Set();
    visited.add(startNode.getPositionString());
    
    while(queue.length > 0) {
        const currentNode = queue.shift();
        if(currentNode.row === targetRow && currentNode.col === targetCol) {
            if(currentNode.distanceFromStartPosition < minDistance) {
                minDistance = currentNode.distanceFromStartPosition;
            }
        } 
        visited.add(currentNode.getPositionString());
        distance ++;

        const neighbors = getNeighbors(currentNode.row, currentNode.col);
        for(const neighbor of neighbors) {
            const neighborNode = new Node(neighbor[0], neighbor[1], distance);
            if(!visited.has(neighborNode.getPositionString)) {
                queue.push(neighborNode);
            }
        }
    }
    console.log(minDistance);
}

getKnightShortestPath(endLocation[0], endLocation[1]);
