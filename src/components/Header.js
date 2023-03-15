import React from "react"
import './Header.css'
import trollImg from '../images/pngwing.png'

export default function Header() {
    return (
        <header className="header">
            <img 
                src={trollImg}
                className="header--image"
                alt="troll img"
            />
            <h2 className="header--title"> Meme Generator</h2>
            <img 
                src={trollImg}
                className="header--image"
                alt="troll img"
                style={{marginLeft: '5px'}}
            />
        </header>
    )
}