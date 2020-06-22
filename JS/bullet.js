class Bullet {
    constructor(ctx, bulletX, bulletY, bulletW, bulletH) {

        this.ctx = ctx
        this.bulletX = bulletX + 10
        this.bulletY = bulletY - 80
        this.bulletW = bulletW
        this.bulletH = bulletH
        this.bulletVel = 40

        this.bulletImg = new Image()
        this.bulletImg.src = 'images/laser-sprite-png-3.png'
        this.bulletImg.frames = 3
        this.bulletImg.framesIndex = 0
    }

    drawBullet(frames) {




        this.ctx.drawImage(this.bulletImg,
            this.bulletImg.framesIndex * Math.floor(this.bulletImg.width / this.bulletImg.frames),
            0,
            Math.floor(this.bulletImg.width / this.bulletImg.frames),
            this.bulletImg.height,
            this.bulletX,
            this.bulletY,
            this.bulletW,
            this.bulletH)


        this.animateBullet(frames)
    }
    animateBullet(frames) {
        if (frames % 2 == 0) {
            this.bulletImg.framesIndex++
        }

        if (this.bulletImg.framesIndex > this.bulletImg.frames - 1) {
            this.bulletImg.framesIndex = 0
        }

        this.moveBullets()

    }


    moveBullets() {
        this.bulletY -= this.bulletVel

    }

}