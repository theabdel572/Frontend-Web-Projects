import React from "react"
import "../style.css"
import reactIcon from "../images/react-icon-small.png"

export default function Navbar() {
    return (
        <nav>
            <img src={reactIcon} className="nav--icon"  alt="React Icon"/>
            <h3 className="nav--logo_text">ReactFacts</h3>
            <h4 className="nav--title">Abdel</h4>
        </nav>
    )
}