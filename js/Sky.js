const skyDom = document.querySelector('.sky');
const skyStyle = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyle.width);
const skyHeight = parseFloat(skyStyle.height);


class Sky extends Rectangle{
    constructor(){
        super(skyWidth,skyHeight,0,0,0,-100,skyDom);
    }
    onMove(){
       if(this.Left <= -skyWidth/2){
           this.Left = 0;
       } 
    }
}

// var sky = new Sky();

// setInterval(() => {
//     sky.move(16/1000);
// }, 16);
