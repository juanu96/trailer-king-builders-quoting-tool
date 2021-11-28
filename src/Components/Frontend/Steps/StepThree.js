import React, { useContext, useState } from 'react'
import { hot } from 'react-hot-loader'
import { Row, Col, Button } from 'reactstrap'
import FadeIn from 'react-fade-in'
import { QuoteStore } from '../App'
import Spritesheet from 'react-responsive-spritesheet'
import { Slider, Select } from 'antd'

const StepThree = function (props) {
  const { Option } = Select
  const store = useContext(QuoteStore)
  const [spriteSheet, setSpritesheet] = useState(null)
  const [truckSize, setTruckSize] = useState(null)
  const [truckCondition, setTruckCondition] = useState(null)
  const [porchPrice, setPorchPrice] = useState(null)

  // find current vehicle info
  const vehicleInfo = () => {
    return store.vehicleType.selectedVehicle
  }

  

  // Next step
  const nextStep = () => {
    store.setTruckSize({ truckSize: truckSize })
    store.setTruckCondition({ truckCondition: truckCondition })
    store.vehicleType.selectedVehicle.title = `${store.vehicleType.selectedVehicle.title} ${truckSize} ${porchPrice ? porchPrice.price !== 0 ? `+ ${porchPrice.title} porch` : '' : ''}`
    const vehicle = store.vehicleType.selectedVehicle
    let price = truckCondition === 'new' ? vehicleInfo().vehicleFeatures.sizing[vehicleInfo().vehicleFeatures.sizing.map(x => x.size).indexOf(truckSize)].priceNew : vehicleInfo().vehicleFeatures.sizing[vehicleInfo().vehicleFeatures.sizing.map(x => x.size).indexOf(truckSize)].priceUsed
    price = price + (porchPrice ? porchPrice.price : 0)
    vehicle.vehicleFeatures.price = price
    store.setVehicleType({ selectedVehicle: vehicle })
    store.setStep(4)
  }

  console.log(store)

  // Calculate class
  const calculateClass = (truckSize) => {
    if (truckSize === null) {
      return 'shrink'
    }
    const sizes = vehicleInfo().vehicleFeatures.sizing.map(x => x.size).indexOf(truckSize)
    switch (sizes) {
      case 0:
        return 'shrink'
      case 1:
        return 'scale'
      case 2:
        return 'scale-1'
      default:
        return 'scale-2'
    }
  }
  //  console.log(store)
  //  console.log(porchPrice)
  return (
    <Row className='responsive'>
      <Col className='align-self-center h-100 d-flex align-items-center justify-content-center' xs={12} sm={12} md={6}>
        <FadeIn delay={500} transitionDuration={500}>
          <h2 className='mb-5 font-weight-bold' style={{ fontSize: '36px', lineHeight: '50px' }}>Pick your <br />truck size &amp; condition</h2>
          <p className='mb-5' style={{ fontSize: '18px', lineHeight: '30px' }}>Choose from different sizes of trucks or trailers, All trailers are 8.5' Wide and feature an 7.5' interior height, screwless exterior and an extended tongue.</p>
          <Row className='mb-5'>
            <Col md={4} className='px-1 mb-3'>
              <Select
                className='w-100 px-1'
                placeholder='Truck size'
                onChange={(e) => {
                  //  console.log(e)
                  setTruckSize(e)
                }}
              >
                {
                  vehicleInfo().vehicleFeatures.sizing.map((x, i) => <Option key={i} value={x.size}>{x.size} feet</Option>)
                }
              </Select>
            </Col>
            <Col md={4} className='px-1 mb-3'>
              <Select disabled={!truckSize} className='w-100 px-1' placeholder='Condition' onChange={(e) => { setTruckCondition(e) }}>
                {
                  truckSize
                    ? vehicleInfo().vehicleFeatures.sizing[vehicleInfo().vehicleFeatures.sizing.map(x => x.size).indexOf(truckSize)].conditionsAvailable.map((x, i) => <Option key={i} value={x}>{x}</Option>)
                    : null
                }
              </Select>
            </Col>
            {console.log(vehicleInfo())}
              {console.log(vehicleInfo().vehicleFeatures.sizing)}
            {
              truckSize && vehicleInfo().vehicleFeatures.sizing.find((x) => x.size === truckSize).hasPorch
                ? <Col md={4} className='px-1 mb-3'>
                  <Select disabled={!truckSize} className='w-100 px-1' placeholder='include a porch?' onChange={(e) => { setPorchPrice(JSON.parse(e)) }}>
                    <Option value={0}>No</Option>
                    {console.log(truckSize)}
                    {
                      truckSize
                        ? vehicleInfo().vehicleFeatures.sizing.find((x) => x.size === truckSize).porchSize.map((x, i) => <Option key={i} value={`{ "title": "${x.porchSize}", "price": ${x.porchPrice} }`}>{x.porchSize}</Option>)
                        : null
                    }
                  </Select>
                  </Col>
                : null
            }
          </Row>
          <Row>
            <Col sm={12} md={6} className='d-flex align-items-end pl-0 centerItem'>
              <a className='float-left back-link' onClick={() => store.setStep(2)}>Previous step</a>
            </Col>
            <Col className='centerItem' sm={12} md={6}>
              <Button disabled={truckSize === null || truckCondition === null} className='px-5 py-3 mt-5 font-weight-bold float-right' color='primary' size='lg' onClick={() => nextStep()}>Next Step</Button>
            </Col>
          </Row>
        </FadeIn>
      </Col>
      <Col className='align-self-center h-100 d-flex align-items-center justify-content-center flex-column responsive-mt' xs={12} sm={12} md={6}>
        <FadeIn delay={500} transitionDuration={500}>
          <img className='img-fluid mx-auto d-block mb-5' src='https://trailerkingbuilders.com/wp-content/uploads/2020/07/Logo.png' />
          <Spritesheet
            className={`mx-auto ${calculateClass(truckSize)}`}
            image={
              truckSize && vehicleInfo().vehicleFeatures.sizing.find((x) => x.size === truckSize).vehicleSizePicture
                ? vehicleInfo().vehicleFeatures.sizing.find((x) => x.size === truckSize).vehicleSizePicture.mediaItemUrl
                : vehicleInfo().featuredImage.node.mediaItemUrl
            }
            widthFrame={440}
            heightFrame={200}
            steps={60}
            fps={15}
            loop
            isResponsive
            getInstance={spritesheet => {
              setSpritesheet(spritesheet)
            }}
          />
          {
            spriteSheet
              ? <Slider className='pt-5 mt-5' max={[58]} onChange={(e) => { spriteSheet.goToAndPause(e) }} onAfterChange={() => spriteSheet.play()} tooltipVisible={false} />
              : null
          }
        </FadeIn>
      </Col>
    </Row>
  )
}

export default hot(module)(StepThree)
