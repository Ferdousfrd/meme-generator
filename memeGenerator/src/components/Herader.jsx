import logo from "../assets/troll-face.png"

export default function Header( {handleClick} ){                                // added a function prop so we can add onClick on our made component
    return(
        <header className="header">
            <img src={logo} alt="laughing skull" className="header--logo"/>      
            <h1 className="header--title">Meme Generator</h1>
            <h1 className="header--about" onClick={handleClick}>About</h1>      
        </header>    
    )
}