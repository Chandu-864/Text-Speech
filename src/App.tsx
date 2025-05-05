import React, { useState } from 'react'
import './App.css'

const App: React.FC = () => {

  const [text, setText] = useState<string>('');
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);

  const handleSpeak = () => {
    if(!text.trim()) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    let wordIndex = 0;

    utterance.onboundary =(event) => {
      if(event.name === "word") {
        setCurrentWordIndex(wordIndex);
        wordIndex++
      }
    }

    utterance.onend = () => {
      setCurrentWordIndex(null);
    }

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);

  }
  
  const highlightext = () => {
    const words = text.trim().split(/\s+/);
    return (
      words.map((word, index) => (
        <span key={index} className={index === currentWordIndex ? "highlight" : ''}>{word + " "}</span>

      ))
    )
  };

  return (
    <div className='container'>
      <h1>Text to Speech Reader</h1>
      <textarea rows={5} placeholder='Enter the text to read aloud' value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSpeak}>Read Aloud</button>
      {text && (
        <div className='output'>
          <h3>Highlighted Words: </h3>
          <p>{highlightext()}</p>
        </div>
      )}
    </div>
  )
}

export default App