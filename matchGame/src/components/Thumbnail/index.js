import './index.css'

const Thumbnail = props => {
  const {eachItem, onMatch} = props
  const {imageUrl, thumbnailUrl} = eachItem

  const onImgClick = () => {
    onMatch(imageUrl)
  }

  return (
    <li className="listItem">
      <button type="button" className="thumbnailBtn" onClick={onImgClick}>
        <img src={thumbnailUrl} className="image" alt="thumbnail" />
      </button>
    </li>
  )
}

export default Thumbnail
