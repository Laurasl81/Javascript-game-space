class Coins {
    constructor(ctx, posCoinX, posCoinY, coinSizeW, coinSizeH, velCoin) {

        this.ctx = ctx
        this.posCoinX = posCoinX
        this.posCoinY = posCoinY
        this.coinSizeW = coinSizeW
        this.coinSizeH = coinSizeH
        this.velCoin = velCoin

    }

    drawCoin(frames) {

        this.ctx.drawImage(this.coinImg,
            this.coinImg.framesIndex * Math.floor(this.coinImg.width / this.coinImg.frames),
            0,
            Math.floor(this.coinImg.width / this.coinImg.frames),
            this.coinImg.height,
            this.posCoinX,
            this.posCoinY,
            this.coinSizeW,
            this.coinSizeH)
        this.animateCoin (frames)

    }

    animateCoin(frames) {

        if (frames % 2 == 0) {
            this.coinImg.framesIndex++
        }

        if (this.coinImg.framesIndex > this.coinImg.frames - 1) {
            this.coinImg.framesIndex = 0
        }

        this.moveCoin()

    }
    
}

class BadCoins extends Coins {
    constructor(ctx, posCoinX, posCoinY, coinSizeW, coinSizeH, velCoin){
        super(ctx, posCoinX, posCoinY, coinSizeW, coinSizeH, velCoin)

        this.velCoinX = 10
        this.coinGravity = .4
        this.coinImg = new Image()
        this.coinImg.src = 'images/RedCoins.png'
        this.coinImg.frames = 6
        this.coinImg.framesIndex = 0

    }
    
    moveCoin() {
        this.posCoinX += myGame.generateRandom (30,-30)
        this.posCoinY += this.velCoin

        this.posCoinY > myGame.canvasSize.h - this.coinSizeH ? this.velCoinY *= -1 : null
        this.posCoinX > myGame.canvasSize.w - this.coinSizeW ? this.velCoinX *= -1 : null
        this.posCoinY < myGame.canvasSize.h + this.coinSizeH ? this.velCoinY *= 1 : null
        this.posCoinX <= 0 + this.coinSizeW / 2 ? this.velCoinX += this.velCoin : null
   
    }

}

class GoodCoin extends Coins { 
    constructor(ctx, posCoinX, posCoinY, coinSizeW, coinSizeH, velCoin){
        super(ctx, posCoinX, posCoinY, coinSizeW, coinSizeH, velCoin)

        this.coinImg = new Image()
        this.coinImg.src = 'images/BlueCoins.png'
        this.coinImg.frames = 6
        this.coinImg.framesIndex = 0

    }

    moveCoin() {

        this.posCoinY += this.velCoin

    }
    
}
