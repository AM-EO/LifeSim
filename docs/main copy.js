//alert( 'Привет, мир!' );

class lifeSim {
    constructor() {
        this.density = 0.5;
        this.resolution = 10;
        this.width = 1400;
        this.height = 700;
        this.plot;
        this.inTimePlot;
        this.canvas = document.getElementById('plot');
        this.ctx = document.getElementById('plot').getContext('2d');
    }

    init() {
        if (this.ctx) {
            this.plot = new Array(this.width / this.resolution);
            this.inTimePlot = new Array(this.width / this.resolution);
            this.ctx.fillStyle = 'rgb(0, 0, 0)';
            this.ctx.fillRect(0, 0, this.width, this.height);
            for (let i = 0; i < this.width / this.resolution; i++) {
                this.plot[i] = new Array(this.height / this.resolution);
                this.inTimePlot[i] = new Array(this.height / this.resolution);
                for (let j = 0; j < this.height / this.resolution; j++) {
                    this.inTimePlot[i][j] = 0;
                    this.plot[i][j] = 0;
                }
            }

            for (let i = 1; i < this.width / this.resolution - 1; i++) {
                for (let j = 1; j < this.height / this.resolution - 1; j++) {
                    if (Math.random() > this.density) {
                        this.plot[i][j] = 1;
                    } else
                    this.plot[i][j] = 0;
                }
            }

        }
        else {
            alert('something is wrong');
        }

    }

    startSimulation() {
        for (let x = 1; x < this.width / this.resolution - 1; x++) {
            for (let y = 1; y < this.height / this.resolution - 1; y++) {
                let neighbors = 0;
                for (let xx = -1; xx < 2; xx++) {
                    for (let yy = -1; yy < 2; yy++) {
                        neighbors += this.plot[x + xx][y + yy];
                    }
                }
                neighbors -= this.plot[x][y];
                if (this.plot[x][y]) {
                    if ((neighbors == 2) || (neighbors == 3)) {
                        this.inTimePlot[x][y] = 1;
                    } else {
                        this.inTimePlot[x][y] = 0;
                    }
                } else {
                    if (neighbors == 3) {
                        this.inTimePlot[x][y] = 1;
                    }
                }
            }
        }

        this.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = 'rgb(200, 0, 0)';
        for (let x = 0; x < this.width / this.resolution; x++) {
            for (let y = 0; y < this.height / this.resolution; y++) {
                this.plot[x][y] = this.inTimePlot[x][y];
                if (this.plot[x][y]) {
                    this.ctx.fillRect(x * this.resolution, y * this.resolution, 10, 10);
                }
            }
        }
    }
}

function main() {
    game = new lifeSim;
    game.init();
    setInterval(game.startSimulation, 250);
}
