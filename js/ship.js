class Ship {
    constructor(ctx, canvasSize, posX, posY, width, height) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.shipPos = { x: posX, y: posY }
        this.shipSize = { w: width, h: height }
        this.imageName = `ship.png`
        this.shipInstance = new Image
        this.shipInstance.src = `images/${this.imageName}`
        this.speed = 5
    }
    draw() {
        this.ctx.drawImage(this.shipInstance, this.shipPos.x, this.shipPos.y, this.shipSize.w, this.shipSize.h)
    }
    moveShip() {
        this.shipPos.x -= this.speed
    }
    stop() {
        if (this.shipPos.x <= this.canvasSize.w - 320) {
            this.speed = 0
        }
    }
}