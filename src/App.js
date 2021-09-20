import { useState, useEffect } from 'react'

import TextField from './Components/TextField';

import './Stylesheets/button.sass'
import './App.sass';

function App() {
  const [ text, setText ] = useState([])
  const [ sonnet, setSonnet ] = useState(
    {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
      13: [],
      14: []
    }
  )
  const [ poet, setPoet ] = useState("")

  const markovUrl = `https://markov-turk.herokuapp.com/${process.env.REACT_APP_API_KEY}/generate-text/matrix/6`
  // ?start=love

  const fetchText = async (length,start) => {
    const response = await fetch(markovUrl + '/' + length + "?start=" + start)
    const data = await response.json()
    setText(data['generated_text'].split(' '))
  }

  const updateText = async (input,length) => {
    const start = input[-1]
    console.log(start)
    const response = await fetch(markovUrl + '/' + length + "?start=" + start)
    const data = await response.json()
    const newText = data['generated_text'].split(' ')
    const textSplice = [...input, ...newText]
    setText(textSplice)
  }

  const countSyllables = async (string) => {
    const response = await fetch(`https://api.datamuse.com/words?sp=${string}&qe=sp&md=s&max=1`)
    const data = await response.json()
    return data[0].numSyllables
  }

  const buildSonnet = async (input) => {
    let sonnetHolder = {}
    let syllables = 0
    let line = []
    let lineCount = 1
    let i = 0
    while (lineCount <= 14) {
      const count = await countSyllables(input[i])
      syllables += count
      line.push(input[i])
      i++
      if (syllables >= 10) {
        sonnetHolder = {...sonnetHolder, [lineCount]: line}
        line = []
        lineCount++
        syllables = 0
      }
    }
    setSonnet((sonnetHolder))
  }
 
  const getPoet = async () => {
    const response = await fetch(`https://markov-turk.herokuapp.com/${process.env.REACT_APP_API_KEY}/generate-text/sample/8/5/char/19`)
    const data = await response.json()
    let upper = data['generated_text'].split(" ")
    let billy = []
    upper.map(word => {
      word = word.charAt(0).toUpperCase() + word.slice(1)
      billy.push(word)
    })
    setPoet(billy.join(" "))
  }

  useEffect(() => {
    fetchText(800)
    getPoet()
  }, [])
  useEffect(() => {buildSonnet(text)}, [text])

  return (
    <div className="App">
      <h1>A Poem by {poet}:</h1>
      <TextField key={'sonnet'} sonnet={sonnet} setSonnet={setSonnet} text={text} updateText={updateText}/>
    </div>
  );
}

export default App;
