import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { Box, Typography } from '@mui/material'

const aboutModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.main',
    borderRadius: "5px",
    boxShadow: 24,
    p: 2,
};

export default function About(props) {
    let { openAboutPage, setOpenAboutPage } = props

    return (
        <>
            <Modal
                open={openAboutPage}
                maxWidth="md"
                onClose={(e, reason) => {
                    setOpenAboutPage(false)
                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                keepMounted
            >
                <Fade in={openAboutPage}>
                    <Box sx={aboutModalStyle} className="sm:w-full md:w-3/4 lg:w-[60%]">
                        <div className="flex justify-center mb-5">
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                About
                            </Typography>
                        </div>

                        <div className='px-10 py-5'>
                            <Typography id="modal-modal-title" className='text-2xl'>
                                Q. Why does this even exist ?
                            </Typography>
                            <Typography id="modal-modal-title" className='text-xl'>
                                This application was primarily built to practice essay writing and typing.
                                <br />2 birds with one stone .....
                            </Typography>
                        </div>

                        <div className='px-10 py-5'>
                            <Typography id="modal-modal-title" className='text-2xl'>
                                Q. How does it work ?
                            </Typography>
                            <Typography id="modal-modal-title" className='text-xl'>
                                1. Find an essay online that you want to practice<br />
                                2. Paste said essay into the input box<br />
                                3. Change settings to mess with punctuations and capitalizations<br />
                                4. Generate a test
                            </Typography>
                        </div>

                        <div className='px-10 py-5'>
                            <Typography id="modal-modal-title" className='text-2xl'>
                                Q. What is bionic reading ?
                            </Typography>
                            <Typography id="modal-modal-title" className='text-xl'>
                                IDK refer to their&nbsp;
                                <a href="https://bionic-reading.com/" target="_blank" rel="noopener noreferrer">
                                    <Box color="info.main" display="inline" className="underline underline-offset-2">official website</Box>
                                </a>
                            </Typography>
                        </div>

                        <div className='px-10 py-5'>
                            <Typography id="modal-modal-title" className='text-2xl'>
                                ⚠️ Please note
                            </Typography>
                            <Typography id="modal-modal-title" className='text-xl'>
                                If your essay is long, say more than 200 words, then you may want to turn off bionic reading and stats to improve performance
                            </Typography>
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
