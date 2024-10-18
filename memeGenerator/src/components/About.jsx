export default function About(){
    return(
        <div className="about--para">
            <h1>About this app : </h1>
            <p>A simple React application that allows users to create and download memes using randomly fetched images from an API. The app provides an intuitive interface for adding custom text to memes and downloading the finished product as an image.</p>
            
            <h1>Instructions</h1>
            <ol>
                <li>Enter text in the "Top Text" and "Bottom Text" input fields.</li>
                <li>Click on the "Get a new meme image" button to fetch a random meme image.</li>
                <li>Customize your meme with your text.</li>
                <li>Click the "Download Meme" button to download your created meme as a PNG file.</li>
            </ol>
        </div>
    )
}