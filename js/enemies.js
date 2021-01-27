// class Prueba {
//     constructor(ctx, canvasSize) {
//         this.ctx = ctx
//         this.canvasSize = canvasSize
//     }
// }
// class Swords extends Prueba {
//     constructor(posX, posY, width, height) {
//         this.swordsPos = { x: posX, y: posY }
//         this.swordsSize = { w: width, h: height }
//         this.speed = 5
//         this.imageName = `swords.png`
//         this.swordsInstance = new Image()
//         this.swordsInstance.src = `images/${this.imageName}`
//     }
//     draw() {
//         this.ctx.drawImage(this.swordsInstance, this.swordsPos.x, this.swordsPos.y, this.swordsSize.w, this.swordscleSize.h)

//     }
//     move() {
//         this.swordsPos.x -= this.speed
//     }

// }
// class Barrel extends Prueba {
//     constructor(posX, posY, width, height) {
//         this.ctx = ctx
//         this.canvasSize = canvasSize
//         this.barrelPos = {
//             x: posX,
//             y: posY
//         }
//         this.barrelSize = {
//             w: width,
//             h: height
//         }
//         this.imageName = `barrel.png`
//         this.barrelInstance = new Image()
//         this.barrelInstance.src = `images/${this.imageName}`

//     }
//     draw() {
//         this.ctx.drawImage(this.barrelInstance, this.barrelPos.x, this.barrelPos.y, this.barrelSize.w, this.barrelSize.h)

//     }
//     move() {
//         this.barrelPos.x -= 5
//     }

// }