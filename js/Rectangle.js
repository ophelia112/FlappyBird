class Rectangle {
    // 定义基本模型的构造方法
    constructor(Width, Height, Left, Top, SpeedY, SpeedX, Dom) {
        this.Width = Width;
        this.Height = Height;
        this.Left = Left;
        this.Top = Top;
        this.SpeedY = SpeedY;
        this.SpeedX = SpeedX;
        this.Dom = Dom;
        this.render();
    }
    render(){
        this.Dom.style.width = this.Width + 'px';
        this.Dom.style.height = this.Height + 'px';
        this.Dom.style.left = this.Left + 'px';
        this.Dom.style.top = this.Top + 'px';
    }

    move(duration){
        const xDis = this.SpeedX * duration;
        const yDis = this.SpeedY * duration;
        this.Left += xDis;
        this.Top += yDis;

        if(this.onMove){
            this.onMove();
        }

        this.render();
    }
}