const gameWidth = gameDom.clientWidth;
// 派生类
class Pipe extends Rectangle{
    constructor(height,top,speed,dom){
        super(52,height,gameWidth,top,0,speed,dom);
    }

    onMove(){
        if(this.Left <= -this.Width){
            this.Dom.remove();
        }
    }
}
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

class PipePair{

    constructor(speed){
        this.spaceHeight = 150;
        this.minHeight = 80;
        this.maxHeight = landTop -this.spaceHeight - this.minHeight;
        const upHeight = getRandom(this.minHeight,this.maxHeight);
        const upDom = document.createElement("div");
        upDom.className='pipe pipeUp';

        this.upPipe = new Pipe(upHeight,0,speed,upDom);

        const downHeight = landTop - upHeight - this.spaceHeight;
        const downTop = landTop - downHeight;
        const downDom = document.createElement("div");
        downDom.className='pipe pipeDown';
        this.downPipe = new Pipe(downHeight,downTop,speed,downDom);

        gameDom.append(upDom);
        gameDom.append(downDom);
        
    }

    move(duration){
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }

    get useLess(){
        return this.upPipe.Left < -this.Left;
    }
}

class PipePairProducer{
    constructor(speed){
        this.speed = speed;
        this.pairs = [];
        this.timer = null;
        this.tick = 1500;
    }

    startProduce(){
        if(this.timer){
            return;
        }
        this.timer = setInterval(() => {
            // 每隔一段时间产生一种柱子对，为提高性能将已经滑过的柱子对在数组中去掉
            this.pairs.push(new PipePair(this.speed));
            for(let i = 0; i<this.pairs.length;i++){
                var pair = this.pairs[i];
                if(pair.useLess){
                    this.pairs.slice(i,1);
                    i--
                }
            }
        }, this.tick);
    }

    endProduce(){
        clearInterval(this.timer);
        this.timer = null;
    }
}

// var pair = new PipePair(-100);

// setInterval(() => {
//     pair.move(16/1000)
// }, 16);

// var producer = new PipePairProducer(-100);
// producer.startProduce();
// setInterval(() => {
//     producer.pairs.forEach((pair)=>{
//         pair.move(16/1000);
//     })
// }, 16);