import './index.css'

const Tabs = props => {
  const {displayText, tabId, tabSelect, onTabClick} = props
  const tabSelectClassName = displayText === tabSelect ? 'highlightText' : ''
  const lineColor = tabSelectClassName !== '' ? 'highlightLine' : 'hideLine'

  const tabClick = () => onTabClick(displayText, tabId)

  return (
    <li>
      <button
        type="button"
        className={`tabsBtn ${tabSelectClassName}`}
        onClick={tabClick}
      >
        {displayText}
        <hr className={lineColor} />
      </button>
    </li>
  )
}

export default Tabs
