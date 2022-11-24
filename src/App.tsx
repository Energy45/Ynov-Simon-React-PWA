import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { getRandomInt, useTimeout } from './utils';
import { pwa } from "pwafire";

const SIMON_BUTTON: string[] = [
  'yellow', 'green', 'red', 'blue'
]

function App() {

  const [arrayColor, setArrayColor] = useState<string[]>();
  const [isIaToPlay, setIsIaToPlay] = useState<boolean>(true);
  const [sequence, setSequence] = useState<string[]>(['red', 'green']);
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    console.log('check end', {
      sequence,
      key,
      isIaToPlay,
    })
    if(key === sequence?.length) {
      setIsIaToPlay(!isIaToPlay);
      setKey(0);
      if(!isIaToPlay) {
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
    console.log('increment key', {
      sequence,
      key,
      isIaToPlay,
    })
    let timeout: NodeJS.Timeout;
    if(isIaToPlay) {
      // useTimeout(() => {
      //   setKey(key + 1);
      // }, 1000);
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
  }, [isIaToPlay])

  // const handleClickSimonButtonCallback = useCallback((simonButton: ISimonButton) => {

  // }, [isIaToPlay]);

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
      <div className="wrapper-simon">
        {SIMON_BUTTON.map((color: string, index: number) => {
          const hover = isIaToPlay && sequence && sequence[key] === color ? 'hover' : '';
          return <button key={index} className={`simon-button ${color} ${hover}`} onClick={() => handleClickSimonButton(color)}>{color}</button>;
        })}
      </div>
    </div>
  )
}

export default App
