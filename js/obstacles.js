class Obstacles {
    constructor(ctx, canvasSize, posX, posY, width, height, speed) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.obstaclePos = { x: posX, y: posY }
        this.obstacleSize = { w: width, h: height }
        this.speed = 5
        this.imageName = `swords.png`
        this.obstacleInstance = new Image()
        this.obstacleInstance.src = `images/${this.imageName}`
    }
    draw() {
        this.ctx.drawImage(this.obstacleInstance, this.obstaclePos.x, this.obstaclePos.y, this.obstacleSize.w, this.obstacleSize.h)
    }
    move() {
        this.obstaclePos.x -= this.speed
    }
}