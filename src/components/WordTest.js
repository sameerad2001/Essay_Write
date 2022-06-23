import { useState, useEffect } from 'react';

// Resources
import { commonEnglishWords } from "../resources/wordList"

// Custom components
import DisplayWords from './DisplayWords';
import DisplayStats from './DisplayStats';
import TestInput from './TestInput';
import { Typography } from '@mui/material';


export default function EssayTest(props) {
    // _________________________________STATES_________________________________ 
    let { setEssayReceived,
        isEssayTest,
        wrongWordCount, setWrongWordCount,
        correctKeystrokes, setCorrectKeystrokes,
        timeTaken, setTimeTaken,
        incorrectKeystrokes, setIncorrectKeystrokes,
        displayStats,
        bionicReading
    } = props;

    let [startedTyping, setStartedTyping] = useState(0); // in minutes

    let [words, setWords] = useState([])
    let [wordCount, setWordCount] = useState(120)
    let wordCountOptions = [10, 20, 30, 60, 90, 120]
    // When toggled create a new word list
    let [rerollWords, setRerollWords] = useState(false)
    useEffect(() => {
        if (!wordCount)
            return

        // NOTE : The word list does not have any punctuations or capital letter => no need to remove those

        // Shuffle the array randomly
        const shuffled = [...commonEnglishWords.English_200].sort(() => 0.5 - Math.random());
        // Pick first n numbers
        setWords(shuffled.slice(0, wordCount))
    }, [wordCount, rerollWords])

    // Word states can be :
    // 0 : Not started OR Correct (NO styling)
    // 1 : Wrong (Red background)
    let [wordStates, setWordStates] = useState([]);
    useEffect(() => {
        if (words.length === 0)
            return

        setWordStates(words.map(() => { return 0 }))
    }, [words])

    // Refers to the index of the word/letter being types
    let [currentWord, setCurrentWord] = useState(0);
    let [currentLetter, setCurrentLetter] = useState(0);

    return (<div>
        <div>
            {/* Select the number of words */}
            Word Count : &nbsp;&nbsp;
            {wordCountOptions.map((count, i) => {
                return (<>
                    <Typography
                        key={i}
                        display="inline"
                        color={wordCount === count ? "info.main" : "secondary.main"}
                        className='hover:cursor-pointer'
                        sx={{
                            '&:hover': {
                                color: 'info.main'
                            }
                        }}
                        onClick={() => {
                            setWordCount(count)
                            setRerollWords(!rerollWords)
                        }}
                    >
                        {count}
                    </Typography>&nbsp;&nbsp;
                </>)
            })}

            {displayStats && <DisplayStats
                wordCount={words.length}
                displayWC={false}
                wrongWordCount={wrongWordCount}
                correctKeystrokes={correctKeystrokes}
                incorrectKeystrokes={incorrectKeystrokes}
                timeTaken={timeTaken}
            />}

            <DisplayWords
                words={words}
                bionicReading={bionicReading}
                currentWord={currentWord}
                currentLetter={currentLetter}
                wordStates={wordStates}
            />

            <TestInput
                isEssayTest={isEssayTest}
                setEssayReceived={setEssayReceived}
                wrongWordCount={wrongWordCount} setWrongWordCount={setWrongWordCount}
                correctKeystrokes={correctKeystrokes} setCorrectKeystrokes={setCorrectKeystrokes}
                setTimeTaken={setTimeTaken}
                incorrectKeystrokes={incorrectKeystrokes} setIncorrectKeystrokes={setIncorrectKeystrokes}
                words={words}
                wordStates={wordStates} setWordStates={setWordStates}
                currentWord={currentWord} setCurrentWord={setCurrentWord}
                currentLetter={currentLetter} setCurrentLetter={setCurrentLetter}
                startedTyping={startedTyping} setStartedTyping={setStartedTyping}
            />
        </div>
    </div>
    )
}