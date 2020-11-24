// Shuffles the tiles
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Helper function to create a tile
function createTile(top, left, side) {
    let tile = document.createElement('div');
    tile.className = 'tile';
    tile.style.width = `${100 / side}%`;
    tile.style.height = `${100 / side}%`;
    let image = document.createElement('img');
    image.className = 'image';
    image.src = './ponyo.jpg';
    image.style.top = `-${top}%`;
    image.style.left = `-${left}%`;
    tile.appendChild(image);

    return tile;
}

// Create a global tile list
let tileList = [];
let count = 0;
for (let i = 0; i < 8; i++) {
    for (let k = 0; k < 8; k++) {
        tileList.push({
            top: i * 100,
            left: k * 100,
            id: count,
        });
        count++;
    }
}

// Renders the tiles on the page
function render() {
    while (tilebox.firstChild) {
        tilebox.removeChild(tilebox.firstChild);
    }
    for (const tile of tileList) {
        tilebox.appendChild(createTile(tile.top, tile.left, 8));
    }
}

// Animates the sort
let tilebox = document.querySelector('.tile-box');
function animate(animations) {
    let tiles = document.getElementsByClassName('tile');
    for (let animation of animations) {
        setTimeout(() => {
            let tmp = { ...tiles[animation[0]].firstChild.style };

            tiles[animation[0]].firstChild.style.top = tiles[animation[1]].firstChild.style.top;
            tiles[animation[0]].firstChild.style.left = tiles[animation[1]].firstChild.style.left;

            tiles[animation[1]].firstChild.style.top = tmp.top;
            tiles[animation[1]].firstChild.style.left = tmp.left;
        }, 1000);
    }
}

// Get the animations for a bubblesort
function bubbleSort() {
    let animations = [];
    let len = tileList.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            if (tileList[j].id > tileList[j + 1].id) {
                animations.push([j, j + 1]);
                let tmp = tileList[j];
                tileList[j] = tileList[j + 1];
                tileList[j + 1] = tmp;
            }
        }
    }
    return animations;
};

// Listener to do sort animation
let sortbutton = document.getElementById('sort');
sortbutton.addEventListener('click', () => {
    animate(bubbleSort());
});

// Listener to reshuffle tiles
let shufflebutton = document.getElementById('shuffle');
shufflebutton.addEventListener('click', () => {
    shuffle(tileList);
    render(tileList);
});

// Initially shuffle and render 
shuffle(tileList);
render();
