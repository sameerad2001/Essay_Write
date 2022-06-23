import Image from 'next/image'

// MUI
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { Box, IconButton, Switch, Zoom } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import GitHubIcon from '@mui/icons-material/GitHub';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import CasinoIcon from '@mui/icons-material/Casino';
import ArticleIcon from '@mui/icons-material/Article';

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

export default function Navbar(props) {
    let { setOpenSettings,
        setOpenAboutPage,
        isEssayTest, setIsEssayTest,
    } = props;

    return (
        <div className="navbar flex items-end justify-between pt-5">

            <div className="flex items-end">
                <Box display="inline" color="info.main" className="mr-2">
                    {/* <KeyboardIcon fontSize='large' /> */}
                    <Image src="/KeyboardDracula.svg" width="45" height="30" alt="logo" />
                </Box>

                <div className="flex flex-col">
                    {/* <span className="text-sm"> Essay read</span> */}
                    <span className="logoText text-4xl"> EssayWrite </span>
                </div>
            </div>

            <div>
                <CustomToolTip title="About" TransitionComponent={Zoom} >
                    <IconButton color="primary" className='opacity-50 mr-2' onClick={() => { setOpenAboutPage(true) }} >
                        <QuestionMarkIcon />
                    </IconButton>
                </CustomToolTip>

                <CustomToolTip title="Github repo" TransitionComponent={Zoom}>
                    <IconButton color="primary" className="opacity-50 mr-2">
                        <GitHubIcon />
                    </IconButton>
                </CustomToolTip>

                <CustomToolTip title="Settings" TransitionComponent={Zoom}>
                    <IconButton color="primary" className='mr-2' onClick={() => { setOpenSettings(true) }}>
                        <SettingsIcon />
                    </IconButton>
                </CustomToolTip>

                <CustomToolTip title="Essay or Random" TransitionComponent={Zoom}>
                    <IconButton color="primary"
                        onClick={() => {
                            setIsEssayTest(!isEssayTest)
                        }}>
                        {isEssayTest ? <ArticleIcon /> : <CasinoIcon />}
                    </IconButton>
                </CustomToolTip>
            </div>
        </div >
    )
}
