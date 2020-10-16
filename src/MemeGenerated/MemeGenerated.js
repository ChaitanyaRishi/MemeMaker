import React ,{useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useClipboard } from 'use-clipboard-copy';
import styles from './styles.module.css';


export const MemeGenerated = () => {
    let history = useHistory();
    let location = useLocation();
    let url = new URLSearchParams(location.search).get('url');
    let clipboard = useClipboard();
    const [copied, setCopied] = useState(false);
    let copyLink = () => {
        if(url) {
            clipboard.copy(url);
            setCopied(true);
        }
    }
    return (
        <div className={styles.container}>
            <button onClick={() => {history.push('/')}} className={styles.back}>I want to make more memes!!</button>
            {url && <img alt='meme' src = {url} />}
            <br/>
            <button className={styles.copy} onClick={copyLink}>
                {
                 copied ? <p> congrats you've copied! </p>: <p> click to copy! </p>
                }
            </button>
            
        </div>
    );
};