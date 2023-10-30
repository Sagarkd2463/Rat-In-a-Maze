//setting matrix for levels
let level1 = [
    [1, 0, 1, 0],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [0, 0, 1, 1]
];

let level2 = [
    [1, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0],
    [1, 1, 1, 0, 1, 1]
];

let level3 = [
    [1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 0, 0, 1]
];

//getting all the references
let maze = document.getElementById("maze-container");
let rat = document.getElementById("rat");
let food = document.getElementById("food");
let level = document.getElementById("levelselect");

let mazearray = level1;

// 0 is wall, 1 is space, 2 is rat;

level.addEventListener("change", () => { //displaying maze according to the level 
    let stage = level.value;

    if(stage == 1){
        mazearray = level1;
    } else if(stage == 2){
        mazearray = level2;
    } else {
        mazearray = level3;
    }
    //setting images for other levels 
    maze.innerHTML = `
        <img src="rat.png" alt="rat" id="rat" width="50px" height="50px">
        <img src="food.png" alt="food" id="food" width="50px" height="50px">`
    createMaze();
});

function setRatPosition (x, y) { //setting position for the rat 
    rat.style.top = x + "px";
    rat.style.left = y + "px";
}

function setFoodPosition (x, y) { //setting position for the food 
    food.style.bottom = x + "px";
    food.style.right = y + "px";
}

function createMaze() { //iterating through the matrix i.e. maze 
    for(let i = 0; i < mazearray.length; i++){
        let row = document.createElement("div");
        row.classList.add("row");

        for(let j = 0; j < mazearray[i].length; j++){
            let cell = document.createElement("div");
            cell.classList.add("cell");

            if(mazearray[i][j] == 0){  //rat can't pass the wall 
                cell.classList.add("wall");
            }

            if(i == 0 && j == 0){ //initial position of the rat 
                mazearray[i][j] = 2;
            }
            row.appendChild(cell);
        }
        maze.appendChild(row);
    }
    setRatPosition(0, 0);
    setFoodPosition(0, 0);
    getRatPosition();
}

function getRatPosition () { //setting previous position and updating position of the rat 
    let position = [-1, -1];
    for(let i = 0; i < mazearray.length; i++){
        for(let j = 0; j < mazearray[i].length; j++){
            if(mazearray[i][j] == 2){
                position[0] = i;
                position[1] = j;
            }
        }
    }
    return position;
}

document.addEventListener("keydown", (e) => { //setting rat position through keyboard keys 
    e.preventDefault();
    let rat = document.getElementById("rat");
    let food = document.getElementById("food");
    let ratLeft = rat.offsetLeft;
    let ratTop = rat.offsetTop;
    let foodLeft = food.offsetLeft;
    let foodTop = food.offsetTop;
    let ratposition = getRatPosition();

    if(e.key == "ArrowRight" && ratLeft < (mazearray.length - 1) * 50 && 
    mazearray[ratposition[0]][ratposition[1] + 1] == 1){ //if right then it can't pass the maze length and just changing the columns
        ratLeft += 50;
        rat.style.left = ratLeft + "px";
        mazearray[ratposition[0]][ratposition[1]] = 1;
        mazearray[ratposition[0]][ratposition[1] + 1] = 2;
    }

    if(e.key == "ArrowLeft" && ratLeft > 0 && 
    mazearray[ratposition[0]][ratposition[1] - 1] == 1){ //if left then it should be greater than 0 and just changing the columns  
        ratLeft -= 50;
        rat.style.left = ratLeft + "px";
        mazearray[ratposition[0]][ratposition[1]] = 1;
        mazearray[ratposition[0]][ratposition[1] - 1] = 2;
    }

    if(e.key == "ArrowUp" && ratTop > 0 && 
    mazearray[ratposition[0] - 1][ratposition[1]] == 1){ //if up then it first changes the rows and should be greater than 0
        ratTop -= 50;
        rat.style.top = ratTop + "px";
        mazearray[ratposition[0]][ratposition[1]] = 1;
        mazearray[ratposition[0] - 1][ratposition[1]] = 2;
    }

    if(e.key == "ArrowDown" && 
    ratTop < (mazearray.length - 1) * 50 && 
    mazearray[ratposition[0] + 1][ratposition[1]] == 1){ //if down then it first changes the columns and should not go beyond maze length 
        ratTop += 50;
        rat.style.top = ratTop + "px";
        mazearray[ratposition[0]][ratposition[1]] = 1;
        mazearray[ratposition[0] + 1][ratposition[1]] = 2; 
    }

    if (ratLeft == foodLeft && ratTop == foodTop) { //log to console if won under this conditions  
        console.log("You Won!");
    }

});
