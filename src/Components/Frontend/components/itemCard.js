import React, { useState, useEffect } from 'react'
import {
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle
} from 'reactstrap'
import FadeIn from 'react-fade-in'
import ItemMultiplier from './ItemMultiplier.js'

const ItemCard = ({ id = '', featuredImage = { sourceUrl: '' }, itemFeatures = { price: '' }, title = '', selectIt, showMultiplier = true }) => {
  const [selected, setSelected] = useState(false)
  const [multiplier, setMultiplier] = useState(1)

  const setSelectedItem = (x) => {
    selectIt(x, multiplier)
    setSelected(!selected)
  }

  return (
    <Col className='px-1 py-1 cursor-pointer mb-5' md={4} sm={4} lg={4}>
      <FadeIn delay={500} transitionDuration={500}>
        <Card className='border-0'>
          <div className={selected ? 'overlay' : 'hide'} onClick={() => setSelectedItem({ title, id, featuredImage, itemFeatures })}>
            <i class='fa fa-check fa-5x text-white' aria-hidden='true' />
          </div>
          <CardImg top width='100%' src={featuredImage.sourceUrl} onClick={() => setSelectedItem({ title, id, featuredImage, itemFeatures })} />
          <CardBody className={`position-relative ${showMultiplier ? 'min-height-card' : ''}`}>
            <CardTitle className='text-center'>{title}</CardTitle>
            {
              showMultiplier
                ? <ItemMultiplier disabled={selected} multiply={(e) => setMultiplier(e)} />
                : null
            }
          </CardBody>
        </Card>
      </FadeIn>
    </Col>
  )
}

export default ItemCard
