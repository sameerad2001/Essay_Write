import { useState } from 'react';

// MUI
import Modal from '@mui/material/Modal';
import { Box, Typography } from '@mui/material'
import Backdrop from '@mui/material/Backdrop';
import Switch from '@mui/material/Switch';
import Fade from '@mui/material/Fade';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Settings modal style 
const settingsModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.main',
    borderRadius: "5px",
    boxShadow: 24,
    p: 2,
};

export default function Settings(props) {

    let { openSettings, setOpenSettings,
        neon, setNeon,
        displayStats, setDisplayStats,
        bionicReading, setBionicReading,
        removePunctuations, setRemovePunctuations,
        removeCapitalizations, setRemoveCapitalizations,
        essayReceived,
        themes, selectedTheme, setSelectedTheme,
        isEssayTest
    } = props;

    return (
        <>
            <Modal
                open={openSettings}
                maxWidth="md"
                onClose={(e, reason) => {
                    setOpenSettings(false)
                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                keepMounted
            >
                <Fade in={openSettings}>

                    <Box sx={settingsModalStyle} className="sm:w-full md:w-1/2 lg:w-[40%]">
                        <div className="flex justify-center mb-5">
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Settings
                            </Typography>
                        </div>

                        <div className="flex justify-between mx-7">
                            <span>
                                Neon logo : <Typography display="inline" color={neon ? "success.main" : "primary"} size="small">
                                    {neon ? "ON" : "OFF"}
                                </Typography >
                            </span>

                            <Switch
                                value={neon}
                                checked={neon}
                                onClick={function () {
                                    setNeon(!neon);
                                }} />
                        </div>

                        <div className="flex justify-between mx-7">
                            <span>
                                Display stats : <Typography display="inline" color={displayStats ? "success.main" : "primary"} size="small">
                                    {displayStats ? "ON" : "OFF"}
                                </Typography >
                            </span>

                            <Switch
                                value={displayStats}
                                checked={displayStats}
                                onClick={function () {
                                    setDisplayStats(!displayStats);
                                }} />
                        </div>

                        <div className="flex justify-between mx-7">
                            <span>
                                Discount bionic reading <Typography display="inline" color="secondary">(Highlights a portion of the word) </Typography>
                                : <Typography display="inline" color={bionicReading ? "success.main" : "primary"} size="small">
                                    {bionicReading ? "ON" : "OFF"}
                                </Typography >
                            </span>

                            <Switch
                                value={bionicReading}
                                checked={bionicReading}
                                onClick={function () {
                                    setBionicReading(!bionicReading);
                                }} />
                        </div>

                        {(!essayReceived && isEssayTest) && <>
                            <div className="flex justify-between mx-7">
                                <span>
                                    Remove punctuations
                                    : <Typography display="inline" color={removePunctuations ? "success.main" : "primary"} size="small">
                                        {removePunctuations ? "ON" : "OFF"}
                                    </Typography >
                                </span>

                                <Switch
                                    value={removePunctuations}
                                    checked={removePunctuations}
                                    onClick={function () {
                                        setRemovePunctuations(!removePunctuations);
                                    }} />
                            </div>

                            <div className="flex justify-between mx-7">
                                <span>
                                    Remove capitalizations
                                    : <Typography display="inline" color={removeCapitalizations ? "success.main" : "primary"} size="small">
                                        {removeCapitalizations ? "ON" : "OFF"}
                                    </Typography >
                                </span>

                                <Switch
                                    value={removeCapitalizations}
                                    checked={removeCapitalizations}
                                    onClick={function () {
                                        setRemoveCapitalizations(!removeCapitalizations);
                                    }} />
                            </div>
                        </>}

                        <div className="flex justify-between mx-7">
                            <span>
                                Theme :
                            </span>

                            <FormControl size="small" variant="standard">
                                <Select
                                    color="success"
                                    sx={{
                                        color: "success.main",
                                    }}
                                    size='sm'
                                    value={selectedTheme}
                                    label="Theme"
                                    onChange={(e) => {
                                        setSelectedTheme(e.target.value)
                                    }}>
                                    {themes.map((curr, i) => {
                                        return <MenuItem
                                            value={i}
                                            key={i} >
                                            {curr.name}
                                        </MenuItem>
                                    })}
                                </Select>
                            </FormControl>

                        </div>

                        <div className="flex justify-center mt-7">
                            <a href="https://github.com/sameerad2001">
                                <Typography
                                    display="inline"
                                    color="secondary"
                                    className='hover:opacity-100 
                                            transition 
                                            opacity-60'
                                    sx={{
                                        '&:hover': {
                                            color: 'info.main'
                                        }
                                    }}
                                >
                                    Made by Sameer Ahmed <span className="opacity-50">| {new Date().getFullYear()} </span>
                                </Typography>
                            </a>
                        </div>
                    </Box>

                </Fade>
            </Modal>
        </>
    )
}
