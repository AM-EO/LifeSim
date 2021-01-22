//alert( 'Привет, мир!' );


let density = 0.5;
let resolution = 10;
let width = 1400;
let height = 700;
let simSpeed = 150;
let plot;
let inTimePlot;
let generation = 1;
let alive = 0;
let elGeneration;
let elAlive;
let intervalID ;


function init() {
    canvas = document.getElementById('plot');
    ctx = canvas.getContext('2d');
    elGeneration = document.getElementById('generation');
    elAlive = document.getElementById('alive');
    if (ctx) {
        plot = new Array(width / resolution);
        inTimePlot = new Array(width / resolution);
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, width, height);
        for (let i = 0; i < width / resolution; i++) {
            plot[i] = new Array(height / resolution);
            inTimePlot[i] = new Array(height / resolution);
            for (let j = 0; j < height / resolution; j++) {
                inTimePlot[i][j] = 0;
                plot[i][j] = 0;
            }
        }

        for (let i = 1; i < width / resolution - 1; i++) {
            for (let j = 1; j < height / resolution - 1; j++) {
                if (Math.random() > density) {
                    plot[i][j] = 1;
                } else
                    plot[i][j] = 0;
            }
        }

    }
    else {
        alert('something is wrong');
    }

}

function startSimulation() {
    generation++;
    alive = 0;
    for (let x = 1; x < width / resolution - 1; x++) {
        for (let y = 1; y < height / resolution - 1; y++) {
            let neighbors = 0;
            for (let xx = -1; xx < 2; xx++) {
                for (let yy = -1; yy < 2; yy++) {
                    neighbors += plot[x + xx][y + yy];
                }
            }
            neighbors -= plot[x][y];
            if (plot[x][y]) {
                if ((neighbors == 2) || (neighbors == 3)) {
                    inTimePlot[x][y] = 1;
                } else {
                    inTimePlot[x][y] = 0;
                }
            } else {
                if (neighbors == 3) {
                    inTimePlot[x][y] = 1;
                }
            }
        }
    }

    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'rgb(200, 0, 0)';
    for (let x = 0; x < width / resolution; x++) {
        for (let y = 0; y < height / resolution; y++) {
            plot[x][y] = inTimePlot[x][y];
            if (plot[x][y]) {
                ctx.fillRect(x * resolution, y * resolution, 10, 10);
                alive++;
            }
        }
    }
    elGeneration.textContent = generation;
    elAlive.textContent = alive;
}


function main() {
    init();
    intervalID = setInterval(startSimulation, simSpeed);
}

function restart(){
    density = document.getElementById('density').value/10;
    generation = 1;
    init();
}

function changeSpeed(){
    simSpeed = document.getElementById('speed').value;
    clearInterval(intervalID);
    intervalID = setInterval(startSimulation, simSpeed);
}