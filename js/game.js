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

        setInterval(() => {
            this.drawAll()
            this.moveAll()
            this.clearObstacle()
            this.clearPlatform()


            this.frames++
                this.frames % 200 === 0 ? this.createObstacle() : null
            this.frames % 100 === 0 ? this.createPlatform() : null
            this.stopGame()
                // this.shipVikings.move()

            this.isCollision()
            this.isPlatform()
                // this.win()

        }, 1000 / 60)

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
        const obstacle1 = new Obstacles(this.ctx, this.canvasSize, this.canvasSize.w, this.canvasSize.h - 130, 80, 80)
        if (this.score < 5) {
            this.obstacles.push(obstacle1)
        }
    },

    clearObstacle() {
        this.obstacles = this.obstacles.filter(obs => obs.obstaclePos.x >= 0 - 200)
    },


    isCollision() {
        this.obstacles.forEach(obs => {

            if (this.player.posX + this.player.width - 130 >= obs.obstaclePos.x &&
                this.player.posY + this.player.height >= obs.obstaclePos.y &&
                this.player.posX <= obs.obstaclePos.x + obs.obstacleSize.w) {
                // alert(`game`);
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

        // this.score += num
        // this.score = this.platforms.filter(plat => plat.platformPos.x < 0)

        // },
        // win() {

        //     if (this.score.length >= 2) {
        //       
        //         this.backgroundSpeed = 0
        //     }
    },


    clearPlatform() {
        this.platforms = this.platforms.filter(plat => plat.platformPos.x >= 0 - 400)
            // this.counterScore()
    },


    isPlatform() {
        this.platforms.forEach(plat => {

            if (this.player.posX + this.player.width - 160 >= plat.platformPos.x &&
                this.player.posY + this.player.height >= plat.platformPos.y &&
                this.player.posX <= plat.platformPos.x + plat.platformSize.w) {

                this.player.posX -= 5
                return true
            } else {
                return false
            }
        })

    },
    createShip() {
        this.shipVikings = new Ship(this.ctx, this.canvasSize, this.canvasSize.w + 400, this.canvasSize.h - 400, 400, 400)

    }




}