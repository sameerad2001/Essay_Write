import Head from 'next/head'
import React, { useState, useEffect } from "react"

// Components 
import Navbar from '../components/Navbar'
import EssayInput from '../components/EssayInput'
import EssayTest from '../components/EssayTest'
import Settings from '../components/Settings'
import About from '../components/About'
import WordTest from '../components/WordTest'

// MUI
import { ThemeProvider } from '@mui/material/styles';

// Themes 
import { themes } from '../resources/themes';

export default function Home() {

  // Global states 
  let [isEssayTest, setIsEssayTest] = useState(false)
  let [essay, setEssay] = useState("");
  let [essayReceived, setEssayReceived] = useState(false);
  let [wrongWordCount, setWrongWordCount] = useState(0);
  let [correctKeystrokes, setCorrectKeystrokes] = useState(0)
  let [incorrectKeystrokes, setIncorrectKeystrokes] = useState(0)
  let [timeTaken, setTimeTaken] = useState(0) // in minutes
  let [openAboutPage, setOpenAboutPage] = useState(false)

  // Settings
  let [openSettings, setOpenSettings] = useState(false)
  let [neon, setNeon] = useState(false);
  useEffect(() => {
    if (neon) {
      document.getElementsByClassName("logoText")[0].classList.add('neonText');
    } else {
      document.getElementsByClassName("logoText")[0].classList.remove('neonText');
    }

  }, [neon]);

  let [displayStats, setDisplayStats] = useState(true)
  let [bionicReading, setBionicReading] = useState(true)

  // Essay formatting; ⚠ WARNING Needs to be set before the test is displayed
  let [removePunctuations, setRemovePunctuations] = useState(true)
  let [removeCapitalizations, setRemoveCapitalizations] = useState(true)

  let [selectedTheme, setSelectedTheme] = useState(1)
  useEffect(() => {
    if (typeof window !== "undefined") {
      for (let i = 0; i < themes.length; i++) {
        document.getElementsByTagName("body")[0].classList.remove(themes[i].name)
      }

      document.getElementsByTagName("body")[0].classList.add(themes[selectedTheme].name)
    }
  }, [selectedTheme])


  return (
    <ThemeProvider theme={themes[selectedTheme].theme} >
      <Head>
        <title>Essay Write</title>
        <meta name="description" content="Learn to type faster while studying the essay writing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Settings openSettings={openSettings} setOpenSettings={setOpenSettings}
        neon={neon} setNeon={setNeon}
        displayStats={displayStats} setDisplayStats={setDisplayStats}
        bionicReading={bionicReading} setBionicReading={setBionicReading}
        removePunctuations={removePunctuations} setRemovePunctuations={setRemovePunctuations}
        removeCapitalizations={removeCapitalizations} setRemoveCapitalizations={setRemoveCapitalizations}
        essayReceived={essayReceived}
        themes={themes} selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme}
        isEssayTest={isEssayTest}
      />

      <About openAboutPage={openAboutPage} setOpenAboutPage={setOpenAboutPage} />

      <div className="content
                      lg:ml-60 lg:mr-60 
                      md:ml-20 md:mr-20 
                      sm:ml-10 sm:mr-10
                      xs:ml-10 xs:mr-10">

        <Navbar
          setOpenSettings={setOpenSettings}
          setOpenAboutPage={setOpenAboutPage}
          isEssayTest={isEssayTest} setIsEssayTest={setIsEssayTest}
        />

        <div className='pt-16'>

          {isEssayTest ?
            <>
              {essayReceived ?
                <EssayTest
                  isEssayTest={isEssayTest}
                  essay={essay}
                  setEssayReceived={setEssayReceived}
                  wrongWordCount={wrongWordCount} setWrongWordCount={setWrongWordCount}
                  correctKeystrokes={correctKeystrokes} setCorrectKeystrokes={setCorrectKeystrokes}
                  timeTaken={timeTaken} setTimeTaken={setTimeTaken}
                  incorrectKeystrokes={incorrectKeystrokes} setIncorrectKeystrokes={setIncorrectKeystrokes}
                  displayStats={displayStats}
                  bionicReading={bionicReading}
                  removeCapitalizations={removeCapitalizations}
                  removePunctuations={removePunctuations}
                /> :
                <EssayInput
                  essay={essay} setEssay={setEssay}
                  setEssayReceived={setEssayReceived}
                />}
            </> :
            <>
              <WordTest
                isEssayTest={isEssayTest}
                displayStats={displayStats}
                wrongWordCount={wrongWordCount} setWrongWordCount={setWrongWordCount}
                correctKeystrokes={correctKeystrokes} setCorrectKeystrokes={setCorrectKeystrokes}
                timeTaken={timeTaken} setTimeTaken={setTimeTaken}
                incorrectKeystrokes={incorrectKeystrokes} setIncorrectKeystrokes={setIncorrectKeystrokes}
                bionicReading={bionicReading}
                removeCapitalizations={removeCapitalizations}
              />
            </>}

        </div>
      </div>
    </ThemeProvider >
  )
}
