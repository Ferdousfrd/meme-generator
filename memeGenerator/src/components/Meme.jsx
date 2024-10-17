import { useState,useEffect } from "react"

export default function Meme(){
    
    const[memeData, setMemeData] = useState([])
    const[meme,setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImgUrl : "http://i.imgflip.com/1bij.jpg"
    })

    useEffect(() => {                                                   // fetching the data and using useEffect so it runs only once
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setMemeData(data.data.memes))
        , []}
    )

    function getMemeImage(event){

        if(memeData.length>0){
            const randomNumber = Math.floor(Math.random()* memeData.length)     // getting a randonm number
            const imgUrl = memeData[randomNumber].url                           // using randmon number to ger random index in the array for random url
            setMeme(prev=>{
                return {
                    ...prev,
                    randomImgUrl : imgUrl
                }

            })         
        }
        else{
            console.log("no data")
        }
    }

    function changeMemeText(event){
        const {name, value} = event.target                              // destructuring our event.target
        setMeme(prev => {
            return {
                ...prev,
                [name] : value
            }
        })
    }
    

    return (
        <main>
            <div className="form">
                <label>Top Text
                <input 
                    type="text"
                    className="form--input"
                    name="topText"                              // gotta make sure this name is same as our state so we can update it 
                    value={meme.topText}                        // making sure we have controlled comonent by connecting it to our state.
                    onChange={changeMemeText}                   // trackiing every keystroke and running our function
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

            <div className="meme">
                <img src={meme.randomImgUrl} alt="memeImage" className="meme--image"/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>                
            </div>
            
        </main>
    )
}