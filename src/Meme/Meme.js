import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';
// require('dotenv').config({path:'../../../.env'})
require('dotenv').config();
export const Meme = () => {
    //make a call to the meme api
    const [memes, setMemes] = useState([]);
    const [idx, setMemeIndex] = useState(0);
    const shuffle = (memes) => {
        setMemeIndex(Math.floor(Math.random() * memes.length));
    }
    const [captions, setCaptions] = useState([]);
    const updateTheCaption = (e, index) => {
        let text = e.target.value || '';
        setCaptions(captions.map((c, i) => {
            if(index === i) {
                return text;
            }
            else {
                return c;
            }
        }))
    }

    
    const history = useHistory();
    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes').then(res => {
            res.json().then(res => {
                const local_memes = res.data.memes;
                let idx = Math.floor(Math.random() * local_memes.length);
                console.log(local_memes);
                setMemes(local_memes);
                setMemeIndex(idx);
            })
        })
    }, [])
    useEffect(() => {
        if(memes.length) {
            setCaptions(Array(memes[idx].box_count).fill(' '));
        }
    }, [idx, memes])

    const generateCaption = () => {
        let formData = new FormData();
        //please replace username and password with your imgflip account details
        formData.append('username', `${process.env.REACT_APP_USERNAME}`);
        formData.append('password', `${process.env.REACT_APP_PASSWORD}`);
        formData.append('template_id', memes[idx].id);
        captions.forEach((c, index) => {
            formData.append(`boxes[${index}][text]`, c);
        })
        fetch('https://api.imgflip.com/caption_image', {
            method: 'POST',
            body: formData
        }).then(res => {
            res.json().then(res => {
                console.log(res);
                history.push(`/generated?url=${res.data.url}`);
            })
        })
    }

    return (
        memes.length?
        <div className={styles.container}>
            <button onClick={generateCaption} className={styles.generate}>Generate</button>
            <button onClick={() => {shuffle(memes)}} className={styles.skip}>Skip</button>
            {
                captions.map((caption, index) => (
                    <input onChange={(e) => {updateTheCaption(e, index);}} key={index} placeholder="Enter your caption"/>
                ))
            }
            <img alt='meme' src={memes[idx].url} />
        </div>
        :
        <></>   
    );
};
