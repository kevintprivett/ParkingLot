import { useState } from 'react'
import refreshLogo from '../assets/arrows-rotate.svg'
import axios from 'axios'

const IdentifySpots = (props) => {
    const [refreshClass, setRefreshClass] = useState('refresh')

    const convertBlobToBase64 = (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onloadend = () => {
          const dataUrl = reader.result
          const base64String = dataUrl.split(',')[1]
          resolve(base64String)
        }

        reader.onerror = (error) => {
          reject(error)
        }
        
        reader.readAsDataURL(blob)
      })
    }

    const handleInferImage = async () => {
        spinSymbol()
        lock()

        const base64String = await convertBlobToBase64(
          props.imageBlob
        )

        const post_url = 'https://xdde6o6kmyxji2hqqmf4kwmofy0dzvqp.lambda-url.us-west-1.on.aws'
        const response = await axios.post(post_url, {
          image_data: base64String
        })

        const newBase64String = 'data:image/jpeg;charset=utf-8;base64,' + response.data

        props.changeImageURL(props.id, newBase64String)
        stopSpin()
        unlock()
    }

    const spinSymbol = () => {
        setRefreshClass('refresh-rotate')
    }

    const stopSpin = () => {
        setRefreshClass('refresh')
    }

    const lock = () => {
      props.setIdentifyLock(false)
    }

    const unlock = () => {
      props.setIdentifyLock(true)
    }

  return (
    <div className='identify_spots'>
      <div 
        className={props.identifyLock ? 'button_small' : 'button_small_locked'}
        onClick={props.identifyLock ? handleInferImage : undefined}
      >
        <div className='flexbox'>
          <div>
            Identify Spots
          </div>
          <img src={refreshLogo} className={refreshClass} alt='Refresh symbol' />
        </div>
      </div>
    </div>
  )
}

export default IdentifySpots
