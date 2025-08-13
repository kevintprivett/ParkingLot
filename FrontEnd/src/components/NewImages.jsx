import { useEffect, useState, useCallback } from 'react'
import refreshLogo from '../assets/arrows-rotate.svg'

const images = [
  '2012-12-07_18_57_27_jpg.rf.72938c105108d4b7e00f3f42a6c31867.jpg',
  '2012-12-08_07_40_02_jpg.rf.514a97250de408b03ea5869cfa9c143e.jpg',
  '2013-02-23_07_05_01_jpg.rf.9c1d2d346f917e9ada670302a20b16b9.jpg',
  '2012-12-08_07_50_02_jpg.rf.ecc9bd950c7c6908600838b3509cdac4.jpg',
  '2013-02-22_18_15_13_jpg.rf.88ef49ed2cb9a2b311bc22cb18169a1c.jpg',
  '2012-09-12_11_56_00_jpg.rf.041680c3e728940e946ad42134b7362a.jpg',
  '2012-12-07_17_02_25_jpg.rf.f56e7d14beb8b989bdbf95af0c12238c.jpg',
  '2012-09-12_11_19_23_jpg.rf.6117980a95928044af18001e3c3bbdb8.jpg',
  '2013-02-22_17_30_12_jpg.rf.2eec3a193041808e01369f32727b8fa6.jpg',
  '2012-12-07_18_32_26_jpg.rf.cc06ea7f06f01a2fdbe351d55d2a44be.jpg',
  '2012-12-11_15_36_07_jpg.rf.f5e9ea88ef188f3651d8dd32886f5552.jpg',
  '2012-09-12_09_18_46_jpg.rf.d95bc1a314fb384813111f94c25b4ef3.jpg',
  '2012-12-07_20_32_28_jpg.rf.c948990150620ff17831b1b00b1077c9.jpg',
  '2012-12-08_08_40_03_jpg.rf.e79d887173bbbaa3576f09da0bd693f6.jpg',
  '2012-09-11_15_53_00_jpg.rf.8282544a640a23df05bd245a9210e663.jpg',
  '2012-09-12_06_36_36_jpg.rf.08869047c7e9f62f5ce9334546b52958.jpg',
  '2013-02-23_06_15_00_jpg.rf.a5ab599a6fb01aac090c7e89a5f72172.jpg',
  '2013-02-22_18_35_13_jpg.rf.fe206325a985b85e158b6c9bd93c539a.jpg',
  '2013-02-23_06_10_00_jpg.rf.55825682d4cf0d1abc20e8a65f191250.jpg',
  '2013-02-22_15_35_10_jpg.rf.a693f07a4a2092b22d4399cc15067d6b.jpg',
  '2012-09-12_08_15_53_jpg.rf.025635f821fe24c12ab497efbfd3d35c.jpg',
  '2013-02-22_17_05_11_jpg.rf.ed2871c6a0258af80b0e080b29843daf.jpg',
  '2012-09-12_12_48_19_jpg.rf.eccec03cf08ccc4f50d46b8212b2668f.jpg',
  '2013-02-23_06_50_00_jpg.rf.c4fab98f16a84fce662cbeb8945c893f.jpg',
  '2012-12-07_20_12_28_jpg.rf.6e26d4070b348e6796a26015a3b93ac7.jpg',
  '2012-09-12_10_05_57_jpg.rf.5f9542ab6498fd436eef35d5ac8f5c04.jpg',
  '2012-09-12_14_12_08_jpg.rf.667489b9945bf933e519cc5c39c3a084.jpg',
  '2012-09-11_16_48_36_jpg.rf.4ecc8c87c61680ccc73edc218a2c8d7d.jpg',
  '2012-12-07_18_17_26_jpg.rf.9bb457e890eba1c27668c648834a31e9.jpg',
  '2013-02-22_14_40_09_jpg.rf.cf928f82889b98dd6bf07a8223794630.jpg'
]

const NewImages = ({ setImageURLs, setImageBlobs }) => {
    const [refreshClass, setRefreshClass] = useState('refresh')

    const getNewImages = useCallback(async () => {
        try {
            const newImageURLs = []
            while (newImageURLs.length < 3) {
              const sampleURL = images[(Math.random() * images.length) | 0]
              if (!newImageURLs.includes(sampleURL)) {
                newImageURLs.push(sampleURL)
              }
            }
            const imageBlobs = []
            const blobURLs = []

            for (const imageURL of newImageURLs) {
                const response = await fetch(imageURL)

                const blob = await response.blob()

                imageBlobs.push(blob)
                blobURLs.push(imageURL)
            }
            setImageURLs(blobURLs)
            setImageBlobs(imageBlobs)
        }
        catch (error) {
            console.log(error)
        }
    }, [setImageURLs, setImageBlobs])

    useEffect(() => {
        getNewImages()
    }, [getNewImages])

    const generateNewImages = async () => {
        spinSymbol()
        await getNewImages()
        stopSpin()
    }

    const spinSymbol = () => {
        setRefreshClass('refresh-rotate')
    }

    const stopSpin = () => {
        setRefreshClass('refresh')
    }

    return (
        <>
            <div className='button_small' onClick={generateNewImages} >
                <div className='flexbox'>
                    <div>
                        New Images
                    </div> 
                    <img src={refreshLogo} className={refreshClass} alt='Refresh symbol' />
                </div>
            </div>
        </>
    )
}

export default NewImages
