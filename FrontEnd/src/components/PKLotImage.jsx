import IdentifySpots from './IdentifySpots'

const PKLotImage = (props) => {
  return (
    <>
      <img className='pklot_image' id={props.id} src={props.image} />
      <IdentifySpots imageBlob={props.imageBlob}
                     changeImageURL={props.changeImageURL}
                     identifyLock={props.identifyLock}
                     setIdentifyLock={props.setIdentifyLock}
                     id={props.id} />
    </>
  )
}

export default PKLotImage
