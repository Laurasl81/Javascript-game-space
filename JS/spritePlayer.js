class SpritePlayer { 

    constructor(ctx, playerPosX, playerPosY, playerW, playerH) { 
        this.ctx = ctx
        this.playerPosX = playerPosX
        this.playerPosY = playerPosY
        this.playerW = playerW
        this.playerH = playerH
        this.image = new Image()
        //this.image.src = 'images/naveFuegoo.png'
        this.velPlayer = 10
        //this.image.frames = 4
        this.image.framesIndex =0
        this.bullets= []
    }
    drawDead(frames) { 
        this.image.src = 'images/naveKilled.png'
        this.image.frames = 2

        this.ctx.drawImage(this.image, this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.playerPosX,
            this.playerPosY,
            this.playerW,
            this.playerH)

        this.animateDead(frames) 

    }
    animateDead(frames) {
        if (frames % 4 == 0) {
            this.image.framesIndex++
        }

        if (this.image.framesIndex > this.image.frames - 1) {
            this.image.framesIndex = 0
        }

    }
    drawExplode(frames,posX,posY) { 

        this.image.src = 'images/explosion.png'
        this.image.frames = 5

        this.ctx.drawImage(this.image, this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            posX,
            posY,
            this.playerW,
            this.playerH)

        this.animate(frames) 

    }

    drawSpritePlayer(frames) { 
        this.image.frames = 4
        this.image.src = 'images/naveFuegoo.png'

        this.ctx.drawImage(this.image, this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.playerPosX,
            this.playerPosY,
            this.playerW,
            this.playerH)
        
        this.animate(frames) 
            
    }

    animate(frames) { 
        if (frames % 2 == 0) { 
            this.image.framesIndex ++
        }

        if (this.image.framesIndex > this.image.frames - 1) { 
            this.image.framesIndex = 0
        }

    }




    move() {
        
        if (myGame.playerKeys.arrowUp && this.playerPosY <= innerHeight-150) {
            this.playerPosY += this.velPlayer
        } 
        if (myGame.playerKeys.arrowRight && this.playerPosX <= myGame.canvasSize.w - 100) {
            this.playerPosX += this.velPlayer 
        }
        if (myGame.playerKeys.arrowDown && this.playerPosY >= innerHeight/2) {
            this.playerPosY -= this.velPlayer
        }
        if (myGame.playerKeys.arrowLeft && this.playerPosX >= 15) {
            this.playerPosX -= this.velPlayer
        }
       
    }

    shoot(ctx) {
        myGame.audioLaser.play()
        myGame.audioLaser.volume = 0.2

        this.bullets.push(new Bullet(ctx, this.playerPosX, this.playerPosY, 60, 120))

    }

    clearBullets() {

        this.bullets = this.bullets.filter((ene) => ene.bulletY >= -100);

    }

}

