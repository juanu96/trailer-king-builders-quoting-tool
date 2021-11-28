import React, { useContext } from 'react'
import { hot } from 'react-hot-loader'
import { Row, Col, Button } from 'reactstrap'
import Lottie from 'react-lottie'
import * as animationData from '../lottie/intro.json'
import FadeIn from 'react-fade-in'
import { QuoteStore } from '../App'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const StepOne = function (props) {
  const store = useContext(QuoteStore)
  return (
    <Row className='responsive'>
      <Col className='align-self-center h-100 d-flex align-items-center justify-content-center' xs={12} sm={12} md={6}>
        <FadeIn delay={500} transitionDuration={600}>
          <h2 className='mb-5 font-weight-bold' style={{ fontSize: '36px', lineHeight: '50px' }}>Welcome to <br /> Trailer King Builders</h2>
          <p className='mb-5' style={{ fontSize: '18px', lineHeight: '30px' }}>Welcome to our Quoting Wizard, we will guide you through the steps of requesting a custom quote for us to build your dreamed Truck.</p>
          <Button className='px-5 py-3 font-weight-bold' color='primary' size='lg' onClick={() => store.setStep(2)}>Get Me started</Button>
        </FadeIn>
      </Col>
      <Col className='align-self-center h-100 d-flex align-items-center justify-content-center' xs={12} sm={12} md={6}>
        <Lottie style={{ cursor: 'initial' }} options={defaultOptions} />
      </Col>
    </Row>
  )
}

export default hot(module)(StepOne)
