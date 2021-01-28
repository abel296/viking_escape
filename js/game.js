const game = {
    name: `Worrior`,
    description: `Platform game`,
    authors: `Eva Vírseda and Abel Andrés`,
    version: `1.0.0`,
    lincense: undefined,
    canvasDOM: undefined,
    /** @type {CanvasRenderingContext2D} */
    ctx: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    background: undefined,
    player: undefined,
    keys: {
        left: `ArrowLeft`,
        right: `ArrowRight`,
        up: `ArrowUp`
    },
    obstacles: [],
    frames: 0,
    platforms: [],
    shipVikings: undefined,
    score: 0,


    init() {
        this.canvasDOM = document.getElementById(`canvas`)
        this.ctx = this.canvasDOM.getContext(`2d`)
        this.setDimensions()
        this.startGame()
        this.setEventListeners()


    },

    setDimensions() {
        this.canvasSize = {
            w: window.innerWidth,
            h: window.innerHeight
        }
        this.canvasDOM.setAttribute('width', this.canvasSize.w)
        this.canvasDOM.setAttribute('height', this.canvasSize.h)
    },

    startGame() {
        this.createBackground()
        this.createPlayer()
        this.createShip()
        this.interval = setInterval(() => {
            this.drawAll()
            this.moveAll()
            this.clearObstacle()
            this.clearPlatform()


            this.frames++
                this.frames % 250 === 0 ? this.createObstacle() : null
            this.frames % 63 === 0 ? this.createPlatform() : null
            this.stopGame()

            this.isCollision() ? this.gameOver() : null
            this.isPlayerOut() ? this.gameOver() : null
            this.isPlatform()
            this.onPlatform()
            this.win()

        }, 1400 / 60)

    },


    createBackground() {
        this.background = new Background(this.ctx, 0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    createPlayer() {
        this.player = new Player(this.ctx, this.canvasSize)
    },


    drawAll() {
        this.background.draw()
        this.player.draw()
        this.player.fall()
        this.obstacles.forEach(obs => obs.draw())
        this.platforms.forEach(plat => plat.draw())
        if (this.score >= 5) {
            this.shipVikings.draw()
        }

    },

    moveAll() {
        this.obstacles.forEach(obs => obs.move())
        this.platforms.forEach(plat => plat.move())
        if (this.score >= 5) {
            this.shipVikings.moveShip()
        }

    },

    setEventListeners() {
        document.onkeyup = e => {
            if (this.isPlatform() && e.key === this.keys.right) {
                this.player.move(0)


            } else if (e.key === this.keys.right) {
                this.player.move(30)
            }

            if (e.key === this.keys.left) {
                this.player.move(-30)
            } else if (this.player.floor === this.player.posY && e.key === this.keys.up) {
                this.player.jump()
            }
        }
    },



    createObstacle() {
        const obstacle1 = new Obstacles(this.ctx, this.canvasSize, this.canvasSize.w, this.canvasSize.h - 110, 60, 60)
        if (this.score < 5) {
            this.obstacles.push(obstacle1)
        }
    },

    clearObstacle() {
        this.obstacles = this.obstacles.filter(obs => obs.obstaclePos.x >= 0 - 200)
    },


    isCollision() {
        this.obstacles.forEach(obs => {

            if (this.player.posX + this.player.width - 170 >= obs.obstaclePos.x &&
                this.player.posY + this.player.height >= obs.obstaclePos.y &&
                this.player.posX <= obs.obstaclePos.x + obs.obstacleSize.w) {
                // alert(`game`);
                swal("GAME OVER", "Your ship is gone", "warning")

            }
        });
    },

    createPlatform() {
        const platform1 = new Platforms(this.ctx, this.canvasSize, this.canvasSize.w - 80, this.canvasSize.h - 130, 80, 80)
        if (this.score != 5) {
            this.platforms.push(platform1)
            this.score++

        }


    },

    stopGame() {
        if (this.score >= 5) {
            // this.shipVikings.draw()
            this.background.stopBackground()
            this.shipVikings.stop()


        }

    },
    win() {
        if (this.player.posX + this.player.width - 200 >= this.shipVikings.shipPos.x &&
            this.player.posY + this.player.height >= this.shipVikings.shipPos.y &&
            this.player.posX <= this.shipVikings.shipPos.x + this.shipVikings.shipSize.w)
            swal({
                title: "YOU WIN",
                text: "¡¡YOU ARE A WARRIOR!!",
                icon: "success",
            })
    },
    isPlayerOut() {
        console.log(this.player.posX)
        if (this.player.posX < 0 - this.player.width) {
            swal("GAME OVER", "Too slow!", "warning")
            return true


        } else {
            return false
        }

    },


    clearPlatform() {
        this.platforms = this.platforms.filter(plat => plat.platformPos.x >= 0 - 400)
            // this.counterScore()
    },


    isPlatform() {
        this.platforms.forEach(plat => {

            if (this.player.posX + this.player.width - 160 >= plat.platformPos.x &&
                this.player.posY + this.player.height - 50 >= plat.platformPos.y &&
                this.player.posX + 50 <= plat.platformPos.x + plat.platformSize.w - 50) {

                this.player.posX -= 10
                return true
            } else {
                return false
            }
        })

    },
    onPlatform() {
        this.platforms.forEach(plat => {

            if (this.player.posX + this.player.width - 160 >= plat.platformPos.x &&
                this.player.posX + 50 <= plat.platformPos.x + plat.platformSize.w - 50) {

                this.player.posY = this.canvasSize.h - plat.platformSize.h - this.player.height - 10
                return true
            } else {
                return false
            }
        })


    },
    createShip() {
        this.shipVikings = new Ship(this.ctx, this.canvasSize, this.canvasSize.w + 400, this.canvasSize.h - 400, 400, 400)

    },
    gameOver() {
        clearInterval(this.interval)
    }




}