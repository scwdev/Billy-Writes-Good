import React, { useState, useEffect } from 'react'

import Button from './Button'
import '../Stylesheets/textfield.sass'

const TextField = ({ sonnet, setSonnet, updateText }) => {

    const handleRemove = (line, index) => {
        let sonnetHolder = {...sonnet}
        for (let key of Object.keys(sonnet)) {
            if (parseInt(key) === parseInt(line)) {
                sonnetHolder[key].splice(index)
            }
            if (parseInt(key) > parseInt(line)) {
                sonnetHolder[key] = []
            }
        }
        setSonnet(sonnetHolder)
        updateText(concatinate(sonnetHolder), 1000)
    }

    const concatinate = (input) => {
        let text = []
        for (let arr of Object.values(input)) {
            text = [...text, ...arr]
        }
        return text
    }

    const handleClick = (line, index) => {
        handleRemove(line, index)
    }

    const displaySonnet = () => {
        return(
            Object.values(sonnet).map((line, lineNum) => (
                <>
                    {line.map((word, index) => (
                        <Button
                            key={word+"-"+index} word={word} line={lineNum} index={index}
                            handleClick={() => {handleClick(lineNum+1, index)}}
                        />
                    ))}
                    <br/>
                </>
                
            ))
        )
    }

    return (
        <div>
            {/* <h2>{count?.numSyllables}</h2> */}
            <main className="sonnet" >
                {displaySonnet()}
            </main>
        </div>
    )
}

export default TextField
