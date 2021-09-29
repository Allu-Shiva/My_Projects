import './index.css'

const Navbar = props => {
  const {score, timer} = props

  return (
    <ul className="navbar">
      <li className="navImgContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
          alt="website logo"
          className="websiteLogo"
        />
      </li>
      <li className="dynamicContainer">
        <p>
          Score: <span className="scoreSpan">{score}</span>
        </p>
        <div className="timerContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
            alt="timer"
            className="timerLogo"
          />
          <p className="scoreSpan">{timer} sec</p>
        </div>
      </li>
    </ul>
  )
}

export default Navbar
