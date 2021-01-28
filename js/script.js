window.onload = () => {

    document.onclick = () => {
        document.getElementById("auto").style.display = "none"
        const sound = document.getElementById("audio")
        console.log(sound)
        sound.play()

        game.init()
    }
}