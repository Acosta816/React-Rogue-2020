import { Map } from 'rot-js';


class World {
    constructor(width, height, tileSize) {
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.worldMap = new Array(this.width);
        for (let x = 0; x < this.width; x++) {
            this.worldMap[x] = new Array(this.height);
        }

        this.createCellularMap();

    }


    createCellularMap() {
       var map = new Map.Cellular(this.width, this.height, { connected: true });
       map.randomize(0.5);
       var userCallback = (x, y, value) => {
           if(x === 0 || y === 0 || x === this.width -1 || y === this.height - 1) {
               this.worldMap[x][y] = 1; //Create walls around edges of map.
               return;
           }
           this.worldMap[x][y] = (value === 0) ? 1 : 0;
       }//end of userCallback()

        map.create(userCallback);
        map.connect(userCallback, 1);

    }//end of createCellularMap()

    draw(context) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if(this.worldMap[x][y] === 1) {
                    this.drawWall(context, x, y);
                }
            }
        }

    }//end of draw()

    drawWall(context, x, y) {
        context.fillStyle = '#000';
        context.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
    }


}


export default World;