import React from "react";

export default function Meme() {

    const [meme, setMeme] = React.useState({
        topText: '',
        bottomText: '',
        memeImg: 'http://i.imgflip.com/1bij.jpg'
    });

    React.useEffect(() => {
        async function getImage() {
            const res = await fetch('https://api.imgflip.com/get_memes');
            const data = await res.json();
            setAllMemeImages(data);
        }

        getImage();

    }, []);

    const [allMemeImages, setAllMemeImages] = React.useState();

    function handleChange(evt) {
        const {name, value} = evt.target;

        setMeme(setMeme => ({
            ...setMeme,
            [name]: value
        }))
    }

    function getMemeImage() {
        const memesArray = allMemeImages.data.memes;
        const randomNumber = Math.floor(Math.random() * memesArray.length);
        const url = memesArray[randomNumber].url;

        setMeme(prevMeme => ({
            ...prevMeme,
            memeImg: url
        }))
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    value={meme.topText}
                    name="topText"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    value={meme.bottomText}
                    name="bottomText"
                    onChange={handleChange}
                />
                <button
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.memeImg} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}