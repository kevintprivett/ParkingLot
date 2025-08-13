import PKLotImage from './PKLotImage'


const PKLotImages = (props) => {
    const changeImageURL = (id, url) => {
        const newImageURLs = props.imageURLs.with(parseInt(id), url)
        props.setImageURLs(newImageURLs)
    }

    return (
        <>
            <div className='pklot_flexbox'>
                <div className='pklot_image'>
                    <PKLotImage image={props.imageURLs[0]}
                                imageBlob={props.imageBlobs[0]}
                                changeImageURL={changeImageURL}
                                identifyLock={props.identifyLock}
                                setIdentifyLock={props.setIdentifyLock}
                                id='0' />
                </div>
                <div className='pklot_image'>
                    <PKLotImage image={props.imageURLs[1]}
                                imageBlob={props.imageBlobs[1]}
                                changeImageURL={changeImageURL}
                                identifyLock={props.identifyLock}
                                setIdentifyLock={props.setIdentifyLock}
                                id='1' />
                </div>
                <div className='pklot_image'>
                    <PKLotImage image={props.imageURLs[2]}
                                imageBlob={props.imageBlobs[2]}
                                changeImageURL={changeImageURL}
                                identifyLock={props.identifyLock}
                                setIdentifyLock={props.setIdentifyLock}
                                id='2' />
                </div>
            </div>
        </>
    )
}

export default PKLotImages

