import atLogo from '../assets/at.svg'
import ghLogo from '../assets/github.svg'
import linkLogo from '../assets/linkedin.svg'

const Footer = () => {
  return (
    <>
      <a className='button' href='https://github.com/kevintprivett/ParkingLot'>
        Learn more about this project on GitHub
      </a>
      <h3>
        Created by Kevin Privett
      </h3>
      <div className='grid'>
        <a href='https://github.com/kevintprivett'>
          <img src={ghLogo} className='logo' alt='GitHub logo' />
        </a>
        <a href='https://www.linkedin.com/in/kevin-privett-810722a4'>
          <img src={linkLogo} className='logo' alt='LinkedIn logo' />
        </a>
        <a href='mailto:kevintprivett@gmail.com'>
          <img src={atLogo} className='logo' alt='At symbol' />
        </a>
      </div>
    </>
  )
}

export default Footer
