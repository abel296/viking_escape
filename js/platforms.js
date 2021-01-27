class Platforms {
    constructor(ctx, canvasSize, posX, posY, width, height) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.platformPos = {
            x: posX,
            y: posY
        }
        this.platformFloor = this.posY
        this.platformSize = {
            w: width,
            h: height
        }
        this.imageName = `barrel.png`
        this.platformInstance = new Image()
        this.platformInstance.src = `images/${this.imageName}`

    }
    draw() {
        this.ctx.drawImage(this.platformInstance, this.platformPos.x, this.platformPos.y, this.platformSize.w, this.platformSize.h)

    }
    move() {
        this.platformPos.x -= 5
    }


}