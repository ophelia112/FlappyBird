const landDom = document.querySelector('.land');
const landStyle = getComputedStyle(landDom);
const landWidth = parseFloat(landStyle.width);
const landHeight = parseFloat(landStyle.height);
const landTop = parseFloat(landStyle.top);

class Land extends Rectangle{
    constructor(speed){
        super(landWidth,landHeight,0,landTop,0,speed,landDom);
    }
    onMove(){
       if(this.Left <= -landWidth/2){
           this.Left = 0;
       } 
    }
}

// var land = new Land(-100);

// setInterval(() => {
//     land.move(16/1000);
// }, 16);
