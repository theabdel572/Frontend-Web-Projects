import React from "react"

export default function Header() {

    return (
        <header className="header">
            <img 
                src={"/src/images/troll-face.png"}
                className="header--image"
                alt="Troll face image"/>
            <h2 className="header--title">Meme Generator</h2>
            <h4 className="header--project">Abdel</h4>
        </header>
    )
}