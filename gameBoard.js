const startGameBtn = document.getElementById('startBtn');
const userStartInput = document.getElementById('userStartInput');
const userEndInput = document.getElementById('userEndInput');

startGameBtn.addEventListener("click", startGame);

function startGame() {
    let startLocation = []; 
    let userStartInputVal = userStartInput.value.split(',');
    startLocation.push(parseInt(userStartInputVal[0]));
    startLocation.push(parseInt(userStartInputVal[1]));  
    
    let endLocation = [];
    let userEndInputVal = userEndInput.value.split(',');
    endLocation.push(parseInt(userEndInputVal[0]));
    endLocation.push(parseInt(userEndInputVal[1]));
    
    getKnightShortestPath(startLocation, endLocation);

    // put knight at user input location
    const squareNodes = board.querySelectorAll('.square');
    squareNodes.forEach((squareNode) => {
        if (startLocation.toString() === squareNode.dataset.coordArray) {
            let knight = document.createElement('img');
            knight.src = './knight.PNG';
            squareNode.appendChild(knight);

        }
        if (endLocation.toString() === squareNode.dataset.coordArray) {
            let x = document.createElement('img');
            x.src = './purpleX.PNG';
            squareNode.appendChild(x);
        }
    });

}

// You need to change this so that this is user input - they decide the start location and end location
const container = document.querySelector('.container');
const coordArray = [];
const board = document.createElement('div');

board.setAttribute('class', 'board');

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
            square.style.backgroundColor = 'rgb(180, 180, 290)';
        } board.appendChild(square);
        square.dataset.coordArray = coordArray;
        //square.textContent = coordArray; //DELETE when done 
        coordArray.splice(1, 1);
    }
    document.body.appendChild(board);
    board.appendChild(container);
    coordArray.splice(0,2);
}


class Node {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}

function getNeighbors(row, col) {
   const neighbors = [];
   const directions = [[-2, -1], [-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2]];

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

// Define a function that takes start and end coordinates as parameters
function getKnightShortestPath(startLocation, endLocation) {

    // Create a new node object for the starting position with a row, column, and distance of 0
    const startNode = new Node(startLocation[0], startLocation[1]);
    
    // Initialize a queue data structure with the starting node as its first element
    const queue = [[startNode]];

    // Create a set data structure to keep track of visited nodes and add the starting node to it
    const visited = new Set();
    visited.add([startNode.row, startNode.col]);
    
    // Use a while loop to iterate through the queue
    while(queue.length > 0) {
        
        // Dequeue the first element of the queue and set it to a variable named "path"
        const path = queue.shift();
        
        // Set a variable named "lastNode" to the last element in the "path" array
        const lastNode = path[path.length - 1];

        // Check if the current node is the end node
        if(lastNode.row === endLocation[0] && lastNode.col === endLocation[1]) {
            // If so, set the shortest path to the current path
            const shortestPath = path;
            // Set the shortest length to the length of the current path minus one (to exclude the starting node)
            const shortestLength = path.length - 1;
            // Log the shortest path and its length to the console
            console.log("You have made it in " + shortestLength + " moves! Here's your path: ");
            for(node of shortestPath) {
                console.log([node.row, node.col]);
            }
            // Return the shortest path and its length as an array
            return [shortestPath, shortestLength];
        }

        // Get an array of neighbor coordinates for the current node
        const neighbors = getNeighbors(lastNode.row, lastNode.col);

        // Iterate through the neighbors array
        for(const neighbor of neighbors) {

            // Create a new node object for the neighbor coordinate
            const neighborNode = new Node(neighbor[0], neighbor[1]);

            // Create a new path array that includes the neighbor node and the current path
            const newPath = [...path, neighborNode];

            // If the neighbor node has not been visited before, add it to the visited set and enqueue the new path
            if(!visited.has([neighborNode.row, neighborNode.col])) {
                visited.add([neighborNode.row, neighborNode.col]);
                queue.push(newPath);
            }
        }
    }
    // Return null if no path is found
    return null;
}

