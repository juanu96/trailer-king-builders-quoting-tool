import React, { useContext, useState } from 'react'
import { hot } from 'react-hot-loader'
import { Row, Col, Button } from 'reactstrap'
import FadeIn from 'react-fade-in'
import { QuoteStore } from '../App'
import Spritesheet from 'react-responsive-spritesheet'
import { Slider, Select, Alert, Popover } from 'antd'
import { gql, useQuery } from "@apollo/client";


const StepTwo = function (props) {
  const { Option } = Select
  const store = useContext(QuoteStore)
  const [spriteSheet, setSpritesheet] = useState(null)
  const [currentVehicle, setCurrentVehicle] = useState(null)

  // GQL
  const VEHICLES = gql`
  {
    vehicles {
      nodes {
        id
        title
        content
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        vehicleFeatures {
          sizing {
            conditionsAvailable
            size
            priceNew
            priceUsed
            hasPorch
            porchSize {
              porchSize
              porchPrice
            }
            vehicleSizePicture {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
  `
  const { loading, data , error} = useQuery(VEHICLES)
  
  // Handle vehicle change
  const vehicleChange = () => {
    if (currentVehicle !== null) {
      const vehicle = data.vehicles.nodes.find((x) => x.id === currentVehicle.id)
      return vehicle.featuredImage.node.mediaItemUrl
    } else {
      return ''
    }
  }

  // set vehicle Info
  const theVehicleInfo = () => {
    if (currentVehicle !== null) {
      const vehicle = data.vehicles.nodes.find((x) => x.id === currentVehicle.id)
      return vehicle.content.replace(/<[^>]*>/g, '')
    } else {
      return ''
    }
  }

  // Set Vehicle on state
  const handleChange = (e) => {
    const vehicle = data.vehicles.nodes.find((x) => x.id === e)
    setCurrentVehicle(vehicle)
  }

  // Go to next step and update store
  const nextStep = () => {
    store.setVehicleType({ selectedVehicle: currentVehicle })
    store.setStep(3)
  }
  return (
    <Row className='responsive'>
      <Col className='align-self-center h-100 d-flex align-items-center justify-content-center' xs={12} sm={12} md={6}>
        <FadeIn delay={500} transitionDuration={500}>
          <h2 className='mb-5 font-weight-bold' style={{ fontSize: '36px', lineHeight: '50px' }}>Pick your <br /> Mobile Kitchen Type</h2>
          <p className='mb-5' style={{ fontSize: '18px', lineHeight: '30px' }}>please choose from a type of vehicle, trailer, stepvan or sprinter van.</p>
          <Select loading={loading} style={{ width: '100%' }} onChange={(e) => handleChange(e)}>
            {
              data
                ? data.vehicles.nodes.map((x, i) => <Option key={i} value={x.id}>{x.title}</Option>)
                : null
            }
          </Select>
          <p className='mt-3' style={{ fontSize: '14px', lineHeight: '16px' }}>{theVehicleInfo()}</p>
          <div className='mb-5' style={{ fontSize: '14px', lineHeight: '16px' }}>
            <Popover
              content={
                <>
                  <ul className='pl-3'>
                    <li>15k BTU A/C.</li>
                    <li>6’ Concession Window include screens and door with flush lockable latches with gas shocks.</li>
                    <li>Breaker Panel w/ 50 Amp, 25' Life Line, 6 Outlets (GFI), and LED Light fixtures.</li>
                    <li>Custom cabinet with aluminum for three compartment 15" Sinks w/ two drain boards (8.5 wide) and a separate Hand wash sink.</li>
                    <li>40 Gallon fresh and a 50 Gallon waste water tanks.</li>
                    <li>Water pump w/ a water heater 2.5 gallon.</li>
                    <li>Single piece rubber coin flooring for water protection. Non slippery and easy to clean. ATP Floor on porch.</li>
                    <li>White Aluminum walls and ceiling.</li>
                  </ul>
                </>
              } title='We Include:'
            >
              <Alert
                className='mt-4'
                type='success' description={
                  <>
                    <p style={{ fontSize: '18px' }} className='font-weight-bold mb-0'>All of our Mobile Kitchens include: <span style={{ float: 'right', opacity: 0.4 }}>❔</span></p>
                  </>
                }
              />
            </Popover>
          </div>
          <Row>
            <Col sm={12} md={6} className='d-flex align-items-end pl-0 centerItem'>
              <a className='float-left back-link' onClick={() => store.setStep(1)}>Previous step</a>
            </Col>
            <Col className='centerItem' sm={12} md={6}>
              <Button disabled={!currentVehicle} className='px-5 py-3 mt-5 font-weight-bold float-right' color='primary' size='lg' onClick={() => nextStep()}>Next Step</Button>
            </Col>
          </Row>
        </FadeIn>
      </Col>
      <Col className='align-self-center h-100 d-flex align-items-center justify-content-center flex-column responsive-mt' xs={12} sm={12} md={6}>
        <FadeIn delay={500} transitionDuration={500}>
          <img className='img-fluid mx-auto d-block mb-5' src='https://trailerkingbuilders.com/wp-content/uploads/2020/07/Logo.png' />
          {
            currentVehicle !== null
              ? <div>
                <Spritesheet
                  className='shrink mx-auto'
                  image={vehicleChange()}
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
              </div>
              : null
          }
        </FadeIn>
      </Col>
    </Row>
  )
}

export default hot(module)(StepTwo)
