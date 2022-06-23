import { useState, useEffect } from 'react';

// Custom components
import DisplayWords from './DisplayWords';
import DisplayStats from './DisplayStats';
import TestInput from './TestInput';


export default function EssayTest(props) {
    // _________________________________STATES_________________________________ 
    let { essay, setEssayReceived,
        isEssayTest,
        wrongWordCount, setWrongWordCount,
        correctKeystrokes, setCorrectKeystrokes,
        timeTaken, setTimeTaken,
        incorrectKeystrokes, setIncorrectKeystrokes,
        displayStats,
        bionicReading,
        removePunctuations,
        removeCapitalizations,
    } = props;

    let [startedTyping, setStartedTyping] = useState(0); // in minutes

    // Break essay into words
    let [words, setWords] = useState([]);
    useEffect(() => {
        if (essay == "")
            return;

        // Remove any white space at the end
        let temp = essay.trim();

        if (removeCapitalizations)
            temp = temp.toLowerCase()

        if (removePunctuations)
            temp = temp.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '')

        // Remove new lines
        temp = temp.replace(/(\r\n|\n|\r)/gm, " ")

        setWords(temp.split(/\s+/));
    }, [essay])

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
            {displayStats && <DisplayStats
                wordCount={words.length}
                displayWC={true}
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