import React from 'react'

const Button = ({ word, handleClick, index, line }) => {



    const capitalizer = (word) => {
            if (word === "i") {
                return "I"
            } else if (word === "i,") {
                return "I,"
            } else if (index === 0) {
                return word?.charAt(0).toUpperCase() + word?.slice(1)
            } else {
                return word
            }
    }
 
    return (
        <button className={"line-"+line} onClick={handleClick} >{capitalizer(word)}&nbsp;</button>
    )
}

export default Button