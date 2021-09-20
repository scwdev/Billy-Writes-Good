export const countSyllables = async (string) => {
        const response = await fetch(`https://api.datamuse.com/words?sp=${string}&qe=sp&md=s&max=1`)
        const data = await response.json()
        // const sylCount = data.numSyllables
        // console.log(data['numSyllables'])
        return data[0].numSyllables
    }

export const meterizer = async (string) => {
        let arr = string.split(" ")
        let syllables = 0
        for (let i = 0; i < 20; i++) {
            const count = await countSyllables(arr[i])
            syllables += count
            if (syllables >= 10) {
                arr.splice(i,0,'LINEBREAK')
                syllables = 0
                i++
            }
        }
        console.log(arr)
    }