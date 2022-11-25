import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { getRandomInt, useTimeout } from './utils';
import { pwa } from "pwafire";

const SIMON_BUTTON: string[] = [
  'yellow', 'green', 'red', 'blue'
]

function App() {

  const [score, setScore] = useState<number>(0);
  const [isIaToPlay, setIsIaToPlay] = useState<boolean>(true);
  const [sequence, setSequence] = useState<string[]>(['red', 'green']);
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    if(key === sequence?.length) {
      setIsIaToPlay(!isIaToPlay);
      setKey(0);
      if(!isIaToPlay) {
        setScore(score + 1);
        setSequence([...sequence, SIMON_BUTTON[getRandomInt(4)]])
      } else {
        pwa.Notification({
          title: 'Simon say',
          options: {
            body: "It's your turn !",
          },
        });
      }
    }
  }, [key, isIaToPlay]);


  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if(isIaToPlay) {
      timeout = setTimeout(() => {
        setKey(key + 1);
      }, 2000);
    }
    return () => timeout && clearTimeout(timeout);
  }, [key, isIaToPlay]);

  useEffect(() => {
    if(!isIaToPlay) {

    } else {

    }
  }, [isIaToPlay]);

  const handleClickSimonButton = useCallback((color: string) => {
    if(!isIaToPlay) {
      if(sequence[key] === color) {
        setKey(key + 1);
      } else {
        pwa.Notification({
          title: 'Simon say',
          options: {
            body: "Looser",
          },
        })
      }
    }
  }, [key, isIaToPlay, sequence]);

  return (
    <div className="container">
      <p className="score">{`Score : ${score}`}</p>
      {SIMON_BUTTON.map((color: string, index: number) => {
        const hover = isIaToPlay && sequence && sequence[key] === color ? 'hover' : '';
        return <button key={index} className={`simon-button ${color} ${hover}`} onClick={() => handleClickSimonButton(color)}>{color}</button>;
      })}
    </div>
  )
}

export default App
