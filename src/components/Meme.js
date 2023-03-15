import React from "react"
import './Meme.css'

import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = React.useState([])
    
    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }
    
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    
    const handleCaptureClick = async () => {
        const memeElement =
          document.querySelector('.meme');
        if (!memeElement) return;
    
        const canvas = await html2canvas(memeElement, { useCORS: true });
        const dataURL = canvas.toDataURL('image/png');
        downloadjs(dataURL, 'download.png', 'image/png');
      };
    
      
      
    
    return (
        <main>
            <div className="form">
                {/* <label for="topText" style={{margin: "0", padding: "0"}}>Top Text</label>
                <label for="bottomText" style={{margin: "0", padding: "0"}}>Bottom Text</label> */}
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                    style={{marginTop:"0"}}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                    style={{marginTop:"0"}}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Generate New Meme Image 
                </button>
               
                <button 
                    className="form--button"
                    onClick={handleCaptureClick}  
                >
                    Download Meme ⬇️
                </button>
            </div>
            <div className="meme" >
                <div className="meme--image" >
                <img src={meme.randomImage}  alt="meme-img" crossOrigin="anonymous"
                style={{marginLeft: "auto", marginRight: "auto",maxWidth: "100%"}} />
                </div>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
                
            </div>
            
            
        </main>
    )
}