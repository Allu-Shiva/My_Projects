import {Component} from 'react'
import Navbar from '../Navbar'
import Tabs from '../Tabs'
import Thumbnail from '../Thumbnail'

import './index.css'

const initializeFilteredList = props => {
  const {imagesList} = props
  const initialList = imagesList.filter(eachItem => {
    if (eachItem.category === 'FRUIT') {
      return true
    }
    return false
  })
  return initialList
}

class MatchGame extends Component {
  state = {
    score: 0,
    timer: 60,
    tabSelect: 'Fruits',
    imgUrl: '',
    filteredList: initializeFilteredList(this.props),
    gameEnds: false,
  }

  componentDidMount() {
    this.initialImg()
    this.runTimer()
  }

  initialImg = () => {
    const {imagesList} = this.props
    const {imageUrl} = imagesList[0]
    this.setState({imgUrl: imageUrl})
  }

  getRandomImage = () => {
    const {imagesList} = this.props
    const {imageUrl} = imagesList.sort(() => 0.5 - Math.random())[1]
    this.setState({imgUrl: imageUrl})
  }

  onTabClick = (text, tabId) => {
    const {imagesList} = this.props
    const filtered = imagesList.filter(eachItem => {
      if (eachItem.category === tabId) {
        return true
      }
      return false
    })
    this.setState({tabSelect: text, filteredList: [...filtered]})
  }

  runTimer = () => {
    this.uniqueId = setInterval(this.tick, 1000)
  }

  tick = () => {
    const {timer} = this.state
    if (timer > 0) {
      this.setState(prevState => ({timer: prevState.timer - 1}))
    } else {
      this.setState({gameEnds: true})
      this.stopTimer()
    }
  }

  stopTimer = () => {
    clearInterval(this.uniqueId)
  }

  onMatch = matchedImgUrl => {
    const {imgUrl} = this.state
    if (imgUrl === matchedImgUrl) {
      this.setState(prevState => ({
        score: prevState.score + 1,
      }))
      this.getRandomImage()
    } else {
      this.setState({gameEnds: true})
      this.getRandomImage()
    }
  }

  renderGame = () => {
    const {tabSelect, imgUrl, filteredList} = this.state
    const {tabsList} = this.props
    return (
      <div className="contentContainer2">
        <img src={imgUrl} alt="match" className="matchedImg" />
        <ul className="tabsContainer">
          {tabsList.map(eachTab => (
            <Tabs
              displayText={eachTab.displayText}
              tabId={eachTab.tabId}
              key={eachTab.tabId}
              tabSelect={tabSelect}
              onTabClick={this.onTabClick}
            />
          ))}
        </ul>
        <ul className="imagesContainer">
          {filteredList.map(eachItem => (
            <Thumbnail
              key={eachItem.id}
              eachItem={eachItem}
              onMatch={this.onMatch}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderEndOfGame = () => {
    const {score} = this.state
    return (
      <div className="trophyContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          alt="trophy"
          className="trophy"
        />
        <p>YOUR SCORE</p>
        <p className="finalScore">{score}</p>
        <button type="button" className="playAgainBtn" onClick={this.playAgain}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png "
            alt="reset"
          />
          PLAY AGAIN
        </button>
      </div>
    )
  }

  playAgain = () => {
    this.setState({score: 0, timer: 60, gameEnds: false, tabSelect: 'Fruits'})
    this.componentDidMount()
  }

  render() {
    const {score, timer, gameEnds} = this.state

    if (gameEnds) {
      this.stopTimer()
    }
    return (
      <div className="bgContainer">
        <Navbar score={score} timer={timer} />
        <div className="contentContainer">
          {gameEnds ? this.renderEndOfGame() : this.renderGame()}
        </div>
      </div>
    )
  }
}

export default MatchGame
