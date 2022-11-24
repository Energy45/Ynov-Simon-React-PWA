import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useTimeout } from './utils';

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
      console.log('AH');
      setIsIaToPlay(!isIaToPlay);
      setKey(0);
    }
  }, [key, isIaToPlay]);


  useEffect(() => {
    console.log('increment key', {
      sequence,
      key,
      isIaToPlay,
    })
    if(isIaToPlay) {
      useTimeout(() => {
        setKey(key + 1);
      }, 1000);
      // setTimeout(() => {
      //   setKey(key + 1);
      // }, 1000);
    }
  }, [key, isIaToPlay]);

  // const handleClickSimonButtonCallback = useCallback((simonButton: ISimonButton) => {

  // }, [isIaToPlay]);

  const handleClickSimonButton = (color: string) => {
    if(!isIaToPlay) {

    }
  }

  return (
    <div className="container">
      <div className="wrapper-simon">
        {SIMON_BUTTON.map((color: string) => {
          const hover = sequence && sequence[key] === color ? 'hover' : '';
          return <button className={`simon-button ${color} ${hover}`} onClick={() => handleClickSimonButton(color)}>{color}</button>;
        })}
      </div>
    </div>
  )
}

export default App
