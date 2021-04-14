class Player {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.width = 300
        this.height = 300
        this.posX = 5
        this.posY = this.canvasSize.h - this.height - 20
        this.floor = this.posY
        this.velY = 1
        this.velX = 5
        this.gravity = 0.4
        this.gravitySpeed = 0
        this.imageName = `walk1.png`
        this.playerInstance = new Image()
        this.playerInstance.src = `images/${this.imageName}`
    }
    draw() {
        this.ctx.drawImage(this.playerInstance, this.posX, this.posY, this.width, this.height)
    }
    move(distance) {
        this.posX += distance
    }
    jump() {
        this.posY -= 70
        this.velY -= 8
    }
    fall() {
        if (this.posY < this.floor) {
            this.posY += this.velY
            this.velY += this.gravity
        } else {
            this.posY = this.floor
            this.velY = 1
        }
    }
}