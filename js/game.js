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
    platforms: [],
    frames: 0,

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

        setInterval(() => {
            this.drawAll()
            this.moveAll()
            this.clearObstacle()
            this.frames++
                this.frames % 200 === 0 ? this.createObstacle() : null
            this.frames % 100 === 0 ? this.createPlatform() : null
                // this.isCollision() ? this.gameOver() : null
            this.isPlatform()
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
    },
    moveAll() {
        this.obstacles.forEach(obs => obs.move())
        this.platforms.forEach(plat => plat.move())



    },
    setEventListeners() {
        document.onkeyup = e => {
            if (e.key === this.keys.right) {
                this.player.move(30)
                    // do {
                    //     e.key.preventDefault === this.keys.right
                    // } while (this.isPlatform())
            } else if (e.key === this.keys.left) {
                this.player.move(-30)
            } else
            if (e.key === this.keys.up) {
                this.player.jump(200)
            }
        }
    },
    createObstacle() {
        const obstacle1 = new Obstacles(this.ctx, this.canvasSize, this.canvasSize.w, this.canvasSize.h - 130, 80, 80)
        this.obstacles.push(obstacle1)
    },
    clearObstacle() {
        this.obstacles = this.obstacles.filter(obs => obs.obstaclePos.x >= -80)
    },
    isCollision() {
        this.obstacles.forEach(obs => {
            if (this.player.posX + this.player.width - 160 >= obs.obstaclePos.x &&
                this.player.posY + this.player.height >= obs.obstaclePos.y &&
                this.player.posX <= obs.obstaclePos.x + obs.obstacleSize.w) {
                alert("GAME OVER")
            }
        })
    },
    createPlatform() {
        const platform1 = new Platforms(this.ctx, this.canvasSize, this.canvasSize.w - 80, this.canvasSize.h - 130, 80, 80)
        this.platforms.push(platform1)
    },
    isPlatform() {
        this.platforms.forEach(plat => {
            if (this.player.posX + this.player.width - 160 >= plat.platformPos.x &&
                this.player.posY + this.player.height >= plat.platformPos.y &&
                this.player.posX <= plat.platformPos.x + plat.platformSize.w) {
                console.log("STAY UP")
                this.player.posX -= 5
            }

        })
    }

    // gameOver() {
    //     clearInterval(this.interval)

    // }
}