const birdDom = document.querySelector('.bird');
const birdStyle = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyle.width);
const birdHeight = parseFloat(birdStyle.height);
const birdTop = parseFloat(birdStyle.top);
const birdLeft = parseFloat(birdStyle.left);
const gameDom = document.querySelector('.game');
const gameHeight = parseFloat(getComputedStyle(gameDom).height);

class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
        this.g = 1500;
        this.maxHeight = gameHeight - landHeight - birdHeight;
        this.swingStatus = 1;
        this.timer = null;
        this.render();
    }

    startSwing(){
        if(this.timer){
            return;
        }
        this.timer = setInterval(() => {
            this.swingStatus = (this.swingStatus+1)%3+1;
            // console.log(this.swingStatus)
            this.render();
        }, 300);
    }
    
    render(){
        super.render();
        this.Dom.className = `bird swing${this.swingStatus}`;
    }

    endSwing(){
        clearInterval(this.timer);
        this.timer = null;
    }    

    move(duration) {
        super.move(duration);
        this.SpeedY += this.g * duration;
    }


    onMove() {
        if (this.Top <= 0) {
            this.Top = 0;
        }
        if (this.Top >= this.maxHeight) {
            this.Top = this.maxHeight;
        }
    }

    jump(){
        this.SpeedY = -450;
    }
}

// var bird = new Bird();

// setInterval(() => {
//     bird.move(16/1000);
// }, 16);
