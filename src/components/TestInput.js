import { useState, useEffect } from 'react';

// MUI
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Zoom } from '@mui/material';

const CustomToolTip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.secondary.main
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.secondary.main
    },
}));

let CustomTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.secondary.main,
        opacity: 0.5
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.secondary.main,
        borderWidth: "2px",
        opacity: 1
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.secondary.main,
        borderWidth: "2px",
        opacity: 1
    },
    "& .MuiInputBase-root.Mui-disabled": {
        backgroundColor: "#E4E3E325",
    }
}))

export default function TestInput(props) {
    let {
        isEssayTest,
        setEssayReceived,
        wrongWordCount, setWrongWordCount,
        correctKeystrokes, setCorrectKeystrokes,
        setTimeTaken,
        incorrectKeystrokes, setIncorrectKeystrokes,
        words,
        wordStates, setWordStates,
        currentWord, setCurrentWord,
        currentLetter, setCurrentLetter,
        startedTyping, setStartedTyping
    } = props

    let [userInput, setUserInput] = useState("")
    let [prevCorrectLength, setPrevCorrectLength] = useState(0)
    let [prevIncorrectLength, setPrevIncorrectLength] = useState(0)

    // Full check : if user pressed space when entering an alphabet
    // Partial check : no spaces
    // Note : Keystrokes are counted up until a wrong char is encountered.
    useEffect(() => {
        if (userInput.trim() === "") {
            setUserInput("")
            return
        }

        if (startedTyping == 0) {
            setStartedTyping(new Date().getTime())
        }

        // Full word check
        if (userInput.includes(" ")) {
            setWordStates(wordStates.map((state, index) => {
                if (index === currentWord) {
                    if (words[currentWord].localeCompare(userInput.split(" ")[0]) === 0) {
                        return 0
                    } else {
                        setWrongWordCount(wrongWordCount + 1)
                        return 1;
                    }
                }
                return state
            }))

            if (currentWord == words.length - 1) {
                setTimeTaken(((new Date().getTime() - startedTyping) / (1000 * 60)).toPrecision(2)) // in minutes
            }

            setCurrentWord(currentWord + 1)
            setCurrentLetter(0)
            setUserInput("")
            setPrevCorrectLength(0)
            setPrevIncorrectLength(0)
            return
        }

        // Partial word check 
        // i.e if user types "abc" and the word is "abcc", then it's NOT wrong bcc user has not finished typing the word 
        // match length then match chars
        setWordStates(wordStates.map((state, index) => {
            if (index === currentWord) {
                let tempWord = words[currentWord].slice(0, userInput.length)

                if (tempWord.localeCompare(userInput) === 0) {
                    if (userInput.length > prevCorrectLength) {
                        setCorrectKeystrokes(correctKeystrokes + 1)
                        setPrevCorrectLength(userInput.length)
                        setCurrentLetter(currentLetter + 1)
                    }
                    else
                        setCurrentLetter(userInput.length - 1)

                    return 0
                } else {
                    if (userInput.length > prevIncorrectLength)
                        setIncorrectKeystrokes(incorrectKeystrokes + 1)

                    setPrevIncorrectLength(userInput.length)
                    return 1;
                }
            }
            return state
        }))
    }, [userInput])

    let [testEnded, setTestEnded] = useState(false);
    useEffect(() => {
        if (words.length === 0)
            return

        if (currentWord >= words.length)
            setTestEnded(true)
    }, [currentWord])

    // _____________________________FUNCTIONS__________________________________
    function resetStates() {
        setWordStates(wordStates.map(() => { return 0 }))

        setUserInput("")
        setPrevCorrectLength(0)
        setPrevIncorrectLength(0)

        setCurrentWord(0)
        setCurrentLetter(0)
        setWrongWordCount(0)
        setCorrectKeystrokes(0)
        setIncorrectKeystrokes(0)

        setStartedTyping(0)
        setTestEnded(false)
        setTimeTaken(0)
    }

    useEffect(() => {
        resetStates()
    }, [isEssayTest, words])

    return (
        <div className="flex justify-center pt-10">
            {isEssayTest &&
                <CustomToolTip title="Go back" TransitionComponent={Zoom}>
                    <IconButton color="warning" className="mr-5" onClick={() => {
                        resetStates();
                        setEssayReceived(false);
                    }}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                </CustomToolTip>
            }
            <CustomTextField
                inputProps={{
                    sx: {
                        color: 'primary.main',
                        fontSize: "1.3rem",
                        padding: "0.5rem"
                    }
                }}
                autoComplete="off"
                disabled={testEnded === true ? true : false}
                value={userInput}
                autoFocus
                onChange={(e) => setUserInput(e.target.value)}
            />

            <CustomToolTip title="Restart" TransitionComponent={Zoom}>
                <IconButton
                    color="error"
                    className="ml-5"
                    onClick={() => {
                        resetStates()
                    }}>
                    <ReplayIcon />
                </IconButton>
            </CustomToolTip>
        </div>
    )
}
