import { useEffect, useState } from 'react';

// MUI
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Box, Typography, Zoom } from '@mui/material';

const CustomToolTip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        // color: theme.palette.common.black,
        color: theme.palette.secondary.main
    },
    [`& .${tooltipClasses.tooltip}`]: {
        // backgroundColor: theme.palette.common.black,
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
    }
}))

export default function EssayInput(props) {

    let { essay, setEssay, setEssayReceived } = props;
    const essayLength = { min: 10, max: 500 }

    let [displayError, setDisplayError] = useState(false);

    useEffect(() => {
        if (!displayError)
            return

        let wordCount = essay.trim().split(" ").length
        if (wordCount >= essayLength.min && wordCount <= essayLength.max)
            setDisplayError(false)
    }, [essay])

    return <div>
        <div>
            {displayError && <Typography color="error">
                Essay must contain anywhere between {essayLength.min} to {essayLength.max} words
            </Typography>}
        </div>

        <CustomTextField
            multiline
            fullWidth
            rows={22}
            autoFocus
            inputProps={{
                sx: {
                    color: 'primary.main',
                    fontSize: "1.3rem",
                    padding: "0.5rem"
                }
            }}
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
        />

        <div className="flex justify-between p-2">
            <div className="flex items-center">
                <span> Word count : {essay == "" ? "0" : essay.trim().split(/\s+/).length} &nbsp;</span>
                <Box display="inline" color="secondary.main"> | &nbsp; </Box>
                {/* 5 keystroke === 5 chars === 1 word | NOT including spaces */}
                Keystrokes(~) : {parseInt(essay.replaceAll(' ', '').length)}
            </div>

            <div>
                <CustomToolTip title="Start Test" TransitionComponent={Zoom}>
                    <IconButton color="success" onClick={() => {
                        if (essay == "" || essay.split(" ").length < essayLength.min || essay.split(" ").length > essayLength.max) {
                            setDisplayError(true)
                            return;
                        }

                        setEssayReceived(true)
                    }}>
                        <NavigateNextIcon />
                    </IconButton>
                </CustomToolTip>

                <CustomToolTip title="⚠ Clear" TransitionComponent={Zoom}>
                    <IconButton color="error" onClick={() => {
                        setEssay("")
                    }}>
                        <DeleteIcon />
                    </IconButton>
                </CustomToolTip>
            </div>
        </div>
    </div >
}