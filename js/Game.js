class Game{
    constructor(){
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Bird();
        this.pipeProducer = new PipePairProducer(-100);
        this.timer = null;
        this.tick = 16;
        this.gameOver = false;
    }

    start(){
        if(this.timer){
            return;
        }
        if (this.gameOver) {
            //重新开始游戏
            window.location.reload();
        }
        this.pipeProducer.startProduce();
        this.bird.startSwing();
        this.timer = setInterval(() => {
            const duration = this.tick/1000;
            this.bird.move(duration);
            this.sky.move(duration);
            this.land.move(duration);
            this.pipeProducer.pairs.forEach(pair=>{
                pair.move(duration);
            })
            if(this.isGameOver()){
                this.stop();
                this.gameOver = true;
            }
        }, this.tick);
    }

    isHit(rec1,rec2){
        var centerX1 = rec1.Left + rec1.Width/2;
        var centerY1 = rec1.Top + rec1.Height/2;
        var centerX2 = rec2.Left + rec2.Width/2;
        var centerY2 = rec2.Top + rec2.Height/2;
        var disX = Math.abs(centerX1 - centerX2);
        var disY = Math.abs(centerY1 - centerY2);
        if(disX < (rec1.Width + rec2.Width) / 2 &&
        disY < (rec1.Height + rec2.Height) / 2){
            return true;
        }
        return false;
    }
    

    isGameOver(){
        if(this.bird.Top === this.bird.maxHeight){
            return true;       
        }
        for(let i = 0; i < this.pipeProducer.pairs.length;i++){
            const pair = this.pipeProducer.pairs[i];
            if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
                return true;
            }
        }
        return false;
    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.bird.endSwing();
        this.pipeProducer.endProduce();
    }
    regEvent() {
        window.onkeydown = (e) => {
            if (e.key === "Enter") {
                if (this.timer) {
                    this.stop();
                }
                else {
                    this.start();
                }
            }
            else if (e.key === " ") {
                this.bird.jump();
            }
        }
    }
}

var g = new Game();
g.regEvent();