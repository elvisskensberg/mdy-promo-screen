import React from 'react'

const SliderItem = ({ imageUrl, title, html }) => {
  return (
    <div className="item" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="content">
        <div className="name">{title}</div>
        <div className="des" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}

export default SliderItem
