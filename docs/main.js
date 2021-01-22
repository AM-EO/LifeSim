//alert( 'Привет, мир!' );

var plot = new Array(130);
var inTimePlot = new Array(130);

var resolution = 0;
var density = 0.5;
function _init(){
    for (i = 0; i < 130; i++) {
        plot[i] = new Array(65);
        inTimePlot[i] = new Array(65);
        for (j = 0; j < 65; j++) {
            inTimePlot[i][j]=0;
            plot[i][j]=0; 
        }
    }

    for (i = 1; i < 129; i++) {
        for (j = 1; j < 64; j++) {
            if (Math.random() > density) {
                plot[i][j]=1;
            }else 
            plot[i][j]=0;          
        }
    } 
}
_init();



function draw(){
var canvas = document.getElementById('plot');
var ctx = canvas.getContext('2d');
if (ctx) {
    // drawing code here
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, 1300, 650);
    updatePlot();
    setInterval(life, 250);

  } else {
      alert( 'some shit' );

  }
}


function life() {
    for(let x = 1; x < 129; x++){
        for(let y = 1; y < 64; y++){
            var neighbors = 0;
            for(xx = -1; xx < 2; xx++){
                for(yy = -1; yy < 2; yy++){
                    neighbors += plot[x+xx][y+yy]; 
                }
            }
            neighbors -= plot[x][y];
            if (plot[x][y]){
                if ((neighbors == 2) || (neighbors == 3)){
                    inTimePlot[x][y] = 1;
                }else{
                    inTimePlot[x][y] = 0;
                }

            }else{
                if(neighbors == 3){
                    inTimePlot[x][y] = 1;
                }

            }
        }
    }


    for(let x = 0; x < 130; x++){
        for(let y = 0; y < 65; y++){
            plot[x][y] = inTimePlot[x][y];
        }
    }
    updatePlot();
}


function updatePlot() {
    var canvas = document.getElementById('plot');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, 1300, 650);
    ctx.fillStyle = 'rgb(200, 0, 0)';
    for (let x = 0; x < 130; x++) {
        for (let y = 0; y < 65; y++) {
            if(plot[x][y]){
                ctx.fillRect(x*10, y*10, 10, 10); 
            }            
        }        
    }
}