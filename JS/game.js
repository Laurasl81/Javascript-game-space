const myGame = {
    name: 'Space Invaders drunk',
    description: 'First Proyect on Ironhack',
    version: '1.0',
    author: 'Laura Sanchez, Andres Barros y Gabriel Moreno',
    license: undefined,
    canvasDom: undefined,
    ctx: undefined,
    bgPlanet: undefined,
    bgAsteroids: undefined,
    interval: undefined,
    badCoinCounter: 0,
    explodeCounter: 0,
    audioGame: undefined,
    audioCoin: undefined,
    audioLaser: undefined,
    audioLaser: undefined,
    colisionY: undefined,
    colisionX: undefined,
    enemys: [],
    enemysStrong: [],
    goodCoins: [],
    badCoins: [],
    scoreLife: 3,
    player1: undefined,
    player1Dead: undefined,
    score: 0,
    timer: 60,
    generateCoin: undefined,
    frames: 0,
    numRandom: 0,
    playerKeys: {
        arrowUp: false,
        arrowRight: false,
        arrowDown: false,
        arrowLeft: false,
        space: false
    },
    keyCaps: {
        UP: 87,
        DOWN: 83,
        LEFT: 65,
        RIGHT: 68,
        SHOOT: 76,
    },

    canvasSize: {
        w: 900,
        h: innerHeight,
        bgPosX: 0,
        bgPosY: 0
    },

    init(id) {

        this.canvasDom = document.getElementById(id)
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
        this.ctx = this.canvasDom.getContext('2d')

        this.bgPlanet = new BgPlanet(this.ctx, 0, 0, this.canvasSize.w, this.canvasSize.h, 3)
        this.bgAsteroids = new BgAsteroids(this.ctx, 0, 0, this.canvasSize.w, this.canvasSize.h, 5)
        this.player1 = new SpritePlayer(this.ctx, this.canvasSize.w / 2, innerHeight - 150, 80, 100)
        this.player1Dead = new SpritePlayer(this.ctx, this.canvasSize.w / 2, innerHeight - 150, 80, 100)

        this.setListeners()

        this.start()

    },

    setListeners() {

        document.addEventListener("keydown", e => {
            e.preventDefault();
            if (e.keyCode === 68 && this.badCoinCounter >= 1) {

                this.playerKeys.arrowLeft = true;
            } else if (e.keyCode === 68 && this.badCoinCounter === 0) {
                this.playerKeys.arrowRight = true;

            }
            if (e.keyCode === 65 && this.badCoinCounter >= 1) {
                this.playerKeys.arrowRight = true;
            } else if (e.keyCode === 65 && this.badCoinCounter === 0) {
                this.playerKeys.arrowLeft = true;

            }
        });
        document.addEventListener("keyup", e => {
            e.preventDefault();
            if (e.keyCode === 68 && this.badCoinCounter >= 1) {
                this.playerKeys.arrowLeft = false;
            } else if (e.keyCode === 68 && this.badCoinCounter === 0) {
                this.playerKeys.arrowRight = false;

            }
            if (e.keyCode === 65 && this.badCoinCounter >= 1) {
                this.playerKeys.arrowRight = false;
            } else if (e.keyCode === 65 && this.badCoinCounter === 0) {

                this.playerKeys.arrowLeft = false;

            }
        });
        document.addEventListener("keydown", e => {
            e.preventDefault();
            if (e.keyCode === 83 && this.badCoinCounter >= 1) {
                this.playerKeys.arrowDown = true;
            } else if (e.keyCode === 83 && this.badCoinCounter === 0) {
                this.playerKeys.arrowUp = true;
            }

            if (e.keyCode === 87 && this.badCoinCounter >= 1) {
                this.playerKeys.arrowUp = true;
            } else if (e.keyCode === 87 && this.badCoinCounter === 0) {
                this.playerKeys.arrowDown = true;
            }
        });
        document.addEventListener("keyup", e => {
            e.preventDefault();
            if (e.keyCode === 83 && this.badCoinCounter >= 1) {
                this.playerKeys.arrowDown = false;
            } else if (e.keyCode === 83 && this.badCoinCounter === 0) {
                this.playerKeys.arrowUp = false;
            }
            if (e.keyCode === 87 && this.badCoinCounter >= 1) {
                this.playerKeys.arrowUp = false;
            } else if (e.keyCode === 87 && this.badCoinCounter === 0) {
                this.playerKeys.arrowDown = false;
            }
        });




        document.onkeydown = e => {

            e.keyCode === this.keyCaps.SHOOT ? this.player1.shoot(this.ctx) : null
        }


    },
    //-------------------------------------------------------------------------------------

    start() {

        this.audioCoin = new Audio('audio/moneda.mp3')
        this.audioGame = new Audio('audio/wii.mp3')
        this.audioOver = new Audio('audio/gameOver.mp3')
        this.audioLaser = new Audio('audio/laser.mp3')
        this.audioGame.play()

        this.interval = setInterval(() => {
            

            this.audioButton()

            this.audioGame.volume = 0.2

            this.badCoinCounter--
            this.explodeCounter--

            if (this.badCoinCounter < 0) {

                this.badCoinCounter = 0

            }

            this.clearScreen()


            this.frames++

            this.bgPlanet.drawBg()

            this.bgAsteroids.drawBg()

            //this.player1.drawSpritePlayer(this.frames)

            this.drawScore()

            this.drawTime()


            //this.player1.drawExplode (this.frames)

            this.player1.bullets.forEach((elm) => elm.drawBullet(this.frames))

            this.enemys.forEach(elm => elm.drawEnemy(this.frames))

            this.enemysStrong.forEach(elm => elm.drawEnemy(this.frames))

            this.goodCoins.forEach(elm => elm.drawCoin(this.frames))

            this.badCoins.forEach(elm => elm.drawCoin(this.frames))

            this.player1.clearBullets()

            console.log(this.scoreLife)

            if (this.scoreLife === 0 || this.timer === 0) {

                this.gameOver()

            }
            console.log(this.explodeCounter)
            if (this.explodeCounter > 1) {
                this.player1.drawExplode(this.frames, this.colisionX, this.colisionY)
                this.player1Dead.drawDead(this.frames)
            } else {
                //this.player1Dead.drawDead(this.frames)
                this.player1.drawSpritePlayer(this.frames)
                this.player1.move()
                this.collisions()
            }

            this.drawScoreLife()
            this.generateEnemys()
            this.clearEnemy()
            this.clearCoins()

        }, 60)

    },

    gameOver() {

        this.audioOver.play()
        this.audioOver.volume = 0.2

        this.audioGame.pause()


        let myImage = new Image()
        myImage.src = 'images/GameOver.png'
        myImage.onload = () => this.ctx.drawImage(myImage, this.canvasSize.w / 2 - 200, innerHeight / 2 - 100, 400, 200)
        let filter = new Image()
        filter.src = 'images/filtro.png'
        filter.onload = () => this.ctx.drawImage(filter, 0, 0, this.canvasSize.w, innerHeight)
        clearInterval(this.interval)

        let newDiv = document.createElement('div')
        let newContent = document.createTextNode(`YOUR SCORE IS ${this.score}`)
        newDiv.appendChild(newContent)


        let currentDiv = document.getElementById(".game")
        document.body.insertBefore(newDiv, currentDiv)
        newDiv.classList.add("inexistente")




    },

    drawScoreLife() {

        let heart

        if (this.scoreLife === 3) {
            heart = new Image()
            heart.src = 'images/healNave3.png'
            this.ctx.drawImage(heart, this.canvasSize.w - 140, 10, 120, 50)

        } else if (this.scoreLife === 2) {
            heart = new Image()
            heart.src = 'images/healNave2.png'
            this.ctx.drawImage(heart, this.canvasSize.w - 140, 10, 80, 50)

        } else if (this.scoreLife === 1) {

            heart = new Image()
            heart.src = 'images/healNave1.png'
            this.ctx.drawImage(heart, this.canvasSize.w - 140, 10, 40, 50)

        }

    },

    audioButton() {

        document.getElementById("audio-button").onclick = function () {


            this.audioGame.pause()

        }.bind(myGame)


    },

    drawScore() {

        this.ctx.font = "32px Times New Roman";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Score: " + this.score, 50, 50);

    },
    drawTime() {

        this.ctx.font = "32px Times New Roman";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Timer: " + this.timer, this.canvasSize.w / 2 - 50, 50);
        this.frames % 16 === 0 ? this.timer-- : null

    },

    clearScreen() {

        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)

    },

    generateEnemys() {

        this.frames % 20 === 0 ? this.enemys.push(new SoftEnemy(this.ctx, this.generateRandom(this.canvasSize.w - 100, 0), 0, 70, 70, this.generateRandom(15, 8))) : null
        //SEGUNDA CREACION DE ENEMYS
        this.frames % 36 === 0 ? this.enemysStrong.push(new StrongEnemy(this.ctx, this.generateRandom(this.canvasSize.w - 100, 0), 0, 150, 150, this.generateRandom(20, 8), this.generateRandom(6, 2))) : null

    },

    generateRandom(max, min) {

        this.numRandom = Math.floor(Math.random() * (max - min) + min)

        return this.numRandom
    },

    clearEnemy() {

        this.enemys = this.enemys.filter((ene) => ene.posEnemyY <= innerHeight)
        this.enemysStrong = this.enemysStrong.filter((ene) => ene.posEnemyY <= innerHeight);
    },


    clearCoins() {

        this.goodCoins = this.goodCoins.filter((good) => good.posCoinY <= innerHeight);
        this.badCoins = this.badCoins.filter((bad) => bad.posCoinY <= innerHeight);

    },

    collisions() {

        // COLISION ENEMY- BULLET
        this.enemys.forEach(enemy1 => {
            this.player1.bullets.forEach(bullet1 => {

                if (enemy1.posEnemyX < bullet1.bulletX + bullet1.bulletW &&
                    enemy1.posEnemyX + enemy1.enemyW > bullet1.bulletX &&
                    enemy1.posEnemyY < bullet1.bulletY + bullet1.bulletH &&
                    enemy1.enemyH-50 + enemy1.posEnemyY > bullet1.bulletY) {

                    this.generateCoin = this.generateRandom(11, 1)
                    this.generateCoin <= 4 ? this.badCoins.push(new BadCoins(this.ctx, enemy1.posEnemyX, enemy1.posEnemyY, 40, 40, 20)) : null

                    this.generateCoin > 4 ? this.goodCoins.push(new GoodCoin(this.ctx, enemy1.posEnemyX, enemy1.posEnemyY, 40, 40, 20)) : null

                    this.player1.bullets.pop()

                    enemy1.posEnemyY = 10000

                }

            })

        })

        //COLISION ENEMY-PLAYER
        this.enemys.forEach(enemy1 => {

            if (enemy1.posEnemyX < this.player1.playerPosX + this.player1.playerW &&
                enemy1.posEnemyX + enemy1.enemyW > this.player1.playerPosX &&
                enemy1.posEnemyY < this.player1.playerPosY + this.player1.playerH &&
                enemy1.enemyH + enemy1.posEnemyY > this.player1.playerPosY) {

                this.colisionY = this.player1.playerPosY
                this.colisionX = this.player1.playerPosX

                this.player1.playerPosX = this.canvasSize.w / 2,
                    this.player1.playerPosY = innerHeight - 100
                this.scoreLife--
                enemy1.posEnemyY = 10000
                this.explodeCounter = 40



            }

        })

        //COLISION ENEMYSTRONG-PLAYER
        this.enemysStrong.forEach(enemy1 => {

            if (enemy1.posEnemyX < this.player1.playerPosX + this.player1.playerW &&
                enemy1.posEnemyX + enemy1.enemyW > this.player1.playerPosX &&
                enemy1.posEnemyY < this.player1.playerPosY + this.player1.playerH &&
                enemy1.enemyH-70 + enemy1.posEnemyY > this.player1.playerPosY) {

                this.colisionY = this.player1.playerPosY
                this.colisionX = this.player1.playerPosX

                this.player1.playerPosX = this.canvasSize.w / 2,
                    this.player1.playerPosY = innerHeight - 100
                this.scoreLife--
                enemy1.posEnemyY = 10000
                this.explodeCounter = 40


            }

        })

        //COLISION STRONGENEMY-BULLET
        this.enemysStrong.forEach(enemy1 => {
            this.player1.bullets.forEach(bullet1 => {

                if (enemy1.posEnemyX < bullet1.bulletX + bullet1.bulletW &&
                    enemy1.posEnemyX + enemy1.enemyW > bullet1.bulletX &&
                    enemy1.posEnemyY < bullet1.bulletY + bullet1.bulletH &&
                    enemy1.enemyH -70 + enemy1.posEnemyY > bullet1.bulletY) {

                    enemy1.health--

                    bullet1.bulletY = -100

                    if (enemy1.health === 0) {
                        this.generateCoin = this.generateRandom(11, 1)
                        this.generateCoin <= 4 ? this.badCoins.push(new BadCoins(this.ctx, enemy1.posEnemyX, enemy1.posEnemyY, 40, 40, 20)) : null

                        this.generateCoin > 4 ? this.goodCoins.push(new GoodCoin(this.ctx, enemy1.posEnemyX, enemy1.posEnemyY, 40, 40, 20)) : null
                        enemy1.posEnemyY = 10000
                    }

                }

            })
        })
        //COLISION MONEDA-PLAYER

        this.goodCoins.forEach(enemy1 => {

            if (enemy1.posCoinX < this.player1.playerPosX + this.player1.playerW &&
                enemy1.posCoinX + enemy1.coinSizeW > this.player1.playerPosX &&
                enemy1.posCoinY < this.player1.playerPosY + this.player1.playerH &&
                enemy1.coinSizeH + enemy1.posCoinY > this.player1.playerPosY) {

                enemy1.posCoinY = 10000
                this.score += 10
                this.audioCoin.play()
                this.audioCoin.volume = .3

                if ((this.timer + 5) >= 60) {

                    this.timer = 60

                } else {

                    this.timer += 5

                }

            }

        })

        //COLISION BADMONEDA-PLAYER

        this.badCoins.forEach(enemy1 => {

            if (enemy1.posCoinX < this.player1.playerPosX + this.player1.playerW &&
                enemy1.posCoinX + enemy1.coinSizeW > this.player1.playerPosX &&
                enemy1.posCoinY < this.player1.playerPosY + this.player1.playerH &&
                enemy1.coinSizeH + enemy1.posCoinY > this.player1.playerPosY) {

                this.badCoinCounter = 100
                enemy1.posCoinY = 10000
                this.setListeners()

            }

        })

    }

}







