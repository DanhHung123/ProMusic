import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react'
import BtnControl from './BtnControl'
import { faShuffle, faStepBackward, faForwardStep, faCirclePlay, faRepeat, faCirclePause } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'src/redux/store'
import { currentSongChange, isPlayChange } from 'src/redux/slice/playerSlice'
import { SongInfor } from 'src/types/music.type'

const arrRandom: number[] = []

function MainPlayerControl() {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [isLoop, setIsLoop] = useState<boolean>(false)
  const [percentProcess, setPercentProcess] = useState<number>(0)
  const [isRandom, setIsRandom] = useState<boolean>(false)

  const { isPlay, volume, isMuted, currentSong, playList } = useSelector((state: RootState) => state.player)
  const dispatch = useDispatch()

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    let intervalId: number | NodeJS.Timer
    let timeoutId: number | NodeJS.Timer
    if (isPlay) {
      intervalId = setInterval(calculatePercentProcess, 300)
      timeoutId = setTimeout(() => {
        audioRef.current?.play()
      }, 200)
    }

    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [isPlay, currentSong])

  const handleTooglePlay = useCallback(() => {
    isPlay ? audioRef.current?.pause() : audioRef.current?.play()
    dispatch(isPlayChange(!isPlay))
  }, [isPlay])

  const handleNextSong = () => {
    playList.forEach((song: SongInfor, index: number) => {
      if (song._id === currentSong?._id) {
        if (index === playList.length - 1) {
          dispatch(currentSongChange(playList[0]))
        } else {
          dispatch(currentSongChange(playList[index + 1]))
        }
      }
    });
  }

  const handlePreviousSong = () => {
    playList.forEach((song: SongInfor, index: number) => {
      if (song._id === currentSong?._id) {
        if (index === 0) {
          dispatch(currentSongChange(playList[playList.length - 1]))
        } else {
          dispatch(currentSongChange(playList[index - 1]))
        }
      }
    });
  }

  const handlerSongEnded = useCallback(() => {
    dispatch(isPlayChange(false))
    if (audioRef.current) {
      audioRef.current.currentTime = 0
    }
    setPercentProcess(0)
    if (isRandom) {
      let isDuplicate = true
      while (isDuplicate) {
        let ranDomNumber = Math.floor(Math.random() * playList.length)
        if (arrRandom.length === playList.length) { arrRandom.length = 0 }
        if (!arrRandom.includes(ranDomNumber)) {
          dispatch(currentSongChange(playList[ranDomNumber]))
          arrRandom.push(ranDomNumber)
          console.log(arrRandom, 'length:' + arrRandom.length);
          isDuplicate = false
        }
      }
    } else {
      handleNextSong()
    }
    dispatch(isPlayChange(true))
  }, [audioRef, isPlayChange, setPercentProcess, handleNextSong, isPlayChange, currentSongChange])



  const calculatePercentProcess = useCallback((curTime?: number) => {
    if (currentSong) {
      if (audioRef.current) {
        let percent = Math.round((curTime ? curTime : audioRef.current.currentTime) * 10000 / currentSong.seconds) / 100
        setPercentProcess(percent)
      }
    }
  }, [currentSong, audioRef])

  const handleChangeValueProcess = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    calculatePercentProcess(Number(e.target.value))
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value)
    }
  }, [calculatePercentProcess, audioRef])


  const calculateTime = useCallback((secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  }, [])


  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex items-center gap-8'>
        <BtnControl icon={faShuffle} addClass={`text-xl ${isRandom ? 'text-sky-500' : ''}`} title='Turn on shuffle'
          onClick={() => { setIsRandom(!isRandom); setIsLoop(false) }}
        />
        <BtnControl icon={faStepBackward} addClass='text-xl' title='Previous song'
          onClick={handlePreviousSong}
        />
        <BtnControl icon={isPlay ? faCirclePause : faCirclePlay} addClass='text-4xl hover:text-sky-500'
          onClick={handleTooglePlay}
        />
        <BtnControl icon={faForwardStep} addClass='text-xl' title='Next song'
          onClick={handleNextSong}
        />
        <BtnControl icon={faRepeat} title='Turn on playback' addClass={`text-xl ${isLoop ? 'text-sky-500' : ''}`}
          onClick={() => { setIsLoop(!isLoop); setIsRandom(false) }}
        />
      </div>
      <div className='flex items-center w-full'>
        <span>{calculateTime(audioRef.current?.currentTime ? audioRef.current?.currentTime : 0)}</span>
        <div className='w-full px-3'>
          <input
            className='input_range h-[5px]'
            style={{ backgroundSize: `${percentProcess}%  100%` }}
            type="range" min='0'
            max={currentSong?.seconds}
            value={audioRef.current?.currentTime}
            onChange={handleChangeValueProcess}
          />
          <div className=''>
            <audio
              ref={audioRef}
              src={currentSong?.src_music}
              loop={isLoop}
              onEnded={handlerSongEnded}
              muted={isMuted}
            />
          </div>
        </div>
        <span>{currentSong?.time_format}</span>
      </div>
    </div>
  )
}

export default memo(MainPlayerControl)


