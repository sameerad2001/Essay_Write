import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export default function DisplayWords(props) {
    let {
        bionicReading,
        words,
        currentWord,
        currentLetter,
        wordStates
    } = props;

    // Bionic reading: highlight 1 / 2 of each word
    function styleWords(word, index) {
        return (
            <span key={index}>

                {/* Word */}
                <span style={
                    // Check if current word is wrong
                    wordStates[index] === 1 ?
                        { padding: 3, backgroundColor: "#522546", textDecoration: "underline 2px red" } :
                        { padding: 3 }
                }>

                    {/* Map letter by letter */}
                    {word.split("").map((letter, i) => {
                        if (bionicReading && i < Math.ceil(word.length / 2))
                            return <Box sx={{ color: `info.main` }} display="inline" key={i}>
                                <b>
                                    {currentLetter === i && currentWord === index ?
                                        <Box sx={{
                                            backgroundColor: `cursor.main`
                                        }}
                                            display="inline">
                                            {letter}
                                        </Box>
                                        : <>{letter}</>}
                                </b>
                            </Box>
                        else
                            return <>
                                {currentLetter === i && currentWord === index ?
                                    <Box sx={{
                                        backgroundColor: `cursor.main`,
                                    }}
                                        display="inline">
                                        {letter}
                                    </Box>
                                    : <>{letter}</>}
                            </>
                    })}
                </span>

                {/* Spaces */}
                &nbsp;&nbsp;
            </span >
        )
    }

    return <div className="max-h-[50vh] overflow-auto">
        <Typography
            style={{ wordBreak: "break-word" }}
            className='text-2xl'
            color="secondary"
        >
            {words.length !== 0 && words.map(styleWords)}
        </Typography>
    </div>
}
