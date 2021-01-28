window.onload = () => {
    document.onclick = () => {
        document.getElementById("auto").style.display = "none"
        const sound = document.getElementById("audio")
        sound.play()
        game.init()
    }
}