import { Box, Typography } from "@mui/material";

export default function DisplayStats(props) {

    let {
        wordCount,
        displayWC,
        wrongWordCount,
        correctKeystrokes,
        incorrectKeystrokes,
        timeTaken,
    } = props

    return (
        <div className="mb-2">
            {
                displayWC &&
                <> Word count : {wordCount}
                    <Box display="inline" color="secondary.main"> &nbsp; | &nbsp; </Box>
                </>
            }

            Incorrect : {wrongWordCount}
            <Box display="inline" color="secondary.main"> &nbsp; | &nbsp; </Box>

            Correct vs Incorrect keystrokes : {<Typography color="success.main" display="inline">{correctKeystrokes}</Typography>}
            {<>&nbsp;</>}vs{<>&nbsp;</>}
            {<Typography color="error" display="inline">{incorrectKeystrokes}</Typography>}
            <Box display="inline" color="secondary.main"> &nbsp; | &nbsp; </Box>

            Time taken : {timeTaken} minute(s)

            {timeTaken != 0 && <>
                <Box display="inline" color="secondary.main"> &nbsp; | &nbsp; </Box>

                {/* 5 keystrokes = 1 word  */}
                {/* words / (time taken) = speed */}
                Speed : {((correctKeystrokes / 5) / timeTaken).toPrecision(2)} WPM
                <Box display="inline" color="secondary.main"> &nbsp; | &nbsp; </Box>

                Accuracy : {incorrectKeystrokes === 0 ? 100 : (correctKeystrokes / (correctKeystrokes + incorrectKeystrokes) * 100).toPrecision(2)} %
            </>}
        </div>
    )
}
