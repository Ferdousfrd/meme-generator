import { useState, useEffect } from "react";
import { toPng } from "html-to-image";              // Importing the toPng function from html-to-image
import download from "downloadjs";                  // Importing download function from downloadjs
import logo from "../assets/memeDemo.png";

export default function Meme() {
    const [memeData, setMemeData] = useState([]);   // State to hold meme data from the API

    const [meme, setMeme] = useState({              // state for our meme obj
        topText: "",
        bottomText: "",
        randomImgUrl: logo 
    });

    useEffect(() => {                                                   // using useEffect to stop stop side effects
        fetch("https://api.imgflip.com/get_memes")                      // Fetching meme data from the API
            .then((res) => res.json())
            .then((data) => setMemeData(data.data.memes));
    }, []);                                                             // Empty dependency array ensures this runs only once

    function getMemeImage() {
        if (memeData.length > 0) {                                      // getting a random index then a random img from random indexed obj
            const randomNumber = Math.floor(Math.random() * memeData.length);
            const imgUrl = memeData[randomNumber].url;
            setMeme((prev) => ({
                ...prev,
                randomImgUrl: imgUrl,                                   // Updating the meme image
            }));
        } else {
            console.log("No data");
        }
    }

    function changeMemeText(event) {
        const { name, value } = event.target;                           // Destructuring the event.target
        setMeme((prev) => ({
            ...prev,
            [name]: value,                                              // Updating text based on input field
        }));
    }

    function downloadMeme() {
        const memeElement = document.querySelector('.meme');            // Selecting the meme container

        toPng(memeElement)                                              // Using html-to-image to convert the meme element to a PNG
            .then((dataUrl) => {
                download(dataUrl, 'my-meme.png');                       // Trigger the download
            })
            .catch((error) => {
                console.error('Oops, something went wrong!', error);    // Error handling
            });
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        className="form--input"
                        name="topText"                                  // Ensuring this name is the same as our state
                        value={meme.topText}                            // Controlled component linked to state
                        onChange={changeMemeText}                       // Tracking input changes
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        className="form--input"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={changeMemeText}
                    />
                </label>

                <button className="form--button" onClick={getMemeImage}>
                    Get a new meme image
                </button>
            </div>

            {/* Meme container with background image */}
            <div className="meme" style={{
                backgroundImage: `url(${meme.randomImgUrl})`,
                backgroundSize: 'cover',                            // Ensures the image covers the entire div
                height: '500px',                                    
                width: '500px',                                     

            }}>
                {/* Top and bottom text positioned over the image */}
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText || "You dare?"}</h2>
            </div>

            <button className="download--button" onClick={downloadMeme}>Download Meme</button>
        </main>
    );
}
