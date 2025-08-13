import PKLotImages from './PKLotImages'
import NewImages from './NewImages'
import { useState } from 'react'

const PKLot = () => {
  const [imageURLs, setImageURLs] = useState([])
  const [imageBlobs, setImageBlobs] = useState([])
  const [identifyLock, setIdentifyLock] = useState(true)

  return (
    <>
      <NewImages setImageURLs={setImageURLs} setImageBlobs={setImageBlobs}/>
      <br />
      <PKLotImages imageURLs={imageURLs} 
                   setImageURLs={setImageURLs}
                   imageBlobs={imageBlobs}
                   identifyLock={identifyLock}
                   setIdentifyLock={setIdentifyLock}
      />
    </>
  )
}

export default PKLot
