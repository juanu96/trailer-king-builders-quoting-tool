import React, { useContext, useState } from 'react'
import { hot } from 'react-hot-loader'
import { Row, Col, Button } from 'reactstrap'
import FadeIn from 'react-fade-in'
import { QuoteStore } from '../App'
import { Form, Input, Switch, Select } from 'antd'
import { usStates } from '../states/usStates'

const { Option } = Select
const StepEight = function (props) {
  const store = useContext(QuoteStore)
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const [company, setCompany] = useState(null)
  const [financing, setFinancing] = useState(false)
  const [state, setState] = useState(null)
  const [creditScore, setCreditScore] = useState(null)

  // Go to next step and update store
  const nextStep = () => {
    store.setPersonalInfo({ firstName: firstName, lastName: lastName, email: email, phone: phone, company: company, state: state, financing: financing, creditScore: creditScore })
    store.setStep(9)
  }

  // verify if required fields are not empty
  const verifyForm = () => {
    if (firstName && lastName && email && phone && company) {
      return false
    } else {
      return true
    }
  }
  //  console.log(store)
  return (
    <Row className='responsive'>
      <Col className='align-self-center h-100 d-flex align-items-center justify-content-center' xs={12} sm={12} md={6}>
        <FadeIn delay={500} transitionDuration={500}>
          <h2 className='mb-5 font-weight-bold' style={{ fontSize: '36px', lineHeight: '50px' }}>Your Information</h2>
          <p className='mb-5' style={{ fontSize: '18px', lineHeight: '30px' }}>
          Please enter your information below.  We offer different types of financing options for every situation and look forward to working with you to achieve your dream of owning your mobile business!
          </p>
          <Form>
            <Row>
              <Col className='px-1'>
                <Form.Item name='First Name' validateTrigger={['onBlur', 'onChange']} className='mb-2' rules={[{ required: true }]}>
                  <Input type='text' placeholder='First name' onChange={(x) => setFirstName(x.target.value)} />
                </Form.Item>
              </Col>
              <Col className='px-1'>
                <Form.Item name='Last Name' validateTrigger={['onBlur', 'onChange']} className='mb-2' rules={[{ required: true }]}>
                  <Input type='text' placeholder='Last name' onChange={(x) => setLastName(x.target.value)} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col className='px-1'>
                <Form.Item
                  name='Email'
                  validateTrigger={['onBlur', 'onChange']}
                  rules={[
                    {
                      type: 'email',
                      required: true
                    }
                  ]}
                  className='mb-2'
                >
                  <Input type='email' placeholder='email@address.com' onChange={(x) => setEmail(x.target.value)} />
                </Form.Item>
              </Col>
              <Col className='px-1'>
                <Form.Item name='Phone' validateTrigger={['onBlur', 'onChange']} className='mb-2' rules={[{ required: true }]}>
                  <Input type='text' placeholder='888 888 8888' onChange={(x) => setPhone(x.target.value)} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col className='px-1'>
                <Form.Item name='Company' className='mb-2' validateTrigger={['onBlur', 'onChange']} rules={[{ required: true }]}>
                  <Input type='text' placeholder='Company name' onChange={(x) => setCompany(x.target.value)} />
                </Form.Item>
              </Col>
              <Col className='px-1'>
                <Form.Item name='State' className='mb-2' validateTrigger={['onBlur', 'onChange']} rules={[{ required: true }]}>
                  <Select initialValues='Texas' onChange={(x) => setState(x)}>
                    {
                      usStates.map((state, i) => (<Option key={i} value={state.abbreviation}>{state.name}</Option>))
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row className='mt-4'>
              <Col className='px-1'>
                <Form.Item name='financing' className='mb-2'>
                  <p className='mb-0'>Do you need financing?</p>
                  <Switch onChange={(x) => setFinancing(x)} />
                </Form.Item>
              </Col>
              <Col className='px-1'>
                {
                  financing
                    ? <Form.Item name='creditScore' className='mb-2'>
                      <Input type='number' className='mt-5' placeholder='Estimated credit score' onChange={(x) => setCreditScore(x.target.value)} />
                    </Form.Item>
                    : null
                }
              </Col>
            </Row>
          </Form>
          <Row>
            <Col sm={12} md={6} className='d-flex align-items-end pl-0'>
              <a className='float-left back-link' onClick={() => store.setStep(7)}>Previous step</a>
            </Col>
            <Col className='centerItem' sm={12} md={6}>
              <Button disabled={verifyForm()} className='px-5 py-3 mt-5 font-weight-bold float-right' color='primary' size='lg' onClick={() => nextStep()}>Next Step</Button>
            </Col>
          </Row>
        </FadeIn>
      </Col>
      <Col className='align-self-center flex-column justify-content-center responsive-mt' xs={12} sm={12} md={6}>
        <FadeIn delay={500} transitionDuration={500}>
          <img className='img-fluid mx-auto d-block mb-5' src='https://trailerkingbuilders.com/wp-content/uploads/2020/07/Logo.png' />
          <Row className='card-3'>
            <Col>
              <Row>
                <Col className='px-0'>
                  <h2 className='red-text text-center font-weight-bold'>QUOTE DETAILS</h2>
                </Col>
              </Row>
              <Row>
                <Col className='px-3'>
                  <h2 className='red-text'>Truck info</h2>
                </Col>
              </Row>
              <Row>
                <Col className='px-3'>
                  <p className='font-weight-bold mb-0'>Truck Type: </p>
                </Col>
                <Col className='px-3'>
                  <p className='mb-0'>{store.vehicleType.selectedVehicle.title}</p>
                </Col>
                <Col className='px-3'>
                  <p className='font-weight-bold mb-0'>Truck Condition: </p>
                </Col>
                <Col className='px-3'>
                  <p className='mb-0'>{store.truckCondition.truckCondition}</p>
                </Col>
              </Row>
              <Row>
                <Col className='px-3'>
                  <p className='font-weight-bold mb-0'>Truck Size: </p>
                </Col>
                <Col className='px-3'>
                  <p className='mb-0'>{store.truckSize.truckSize}'</p>
                </Col>
                <Col className='px-3'>
                  <p className='font-weight-bold mb-0'>build Option: </p>
                </Col>
                <Col className='px-3'>
                  <p className='mb-0'>{store.buildOption.buildoutOption.title}</p>
                </Col>
              </Row>
              <Row className='mt-3'>
                <Col className='px-3'>
                  <h2 className='red-text'>Kitchen Info</h2>
                </Col>
                <Col className='px-3'>
                  <h2 className='red-text'>Specialty Items</h2>
                </Col>
              </Row>
              <Row>
                <Col className='px-3'>
                  <ul className='redUl'>
                    {
                      store.kitchenOptions.kitchenOptions.map(x => <li key={x.id} className='redLi'>{x.title}</li>)
                    }
                  </ul>
                </Col>
                <Col className='px-3'>
                  <ul className='redUl'>
                    {
                      store.specialtyItems.specialtyItems.map(x => <li key={x.id} className='redLi'>{x.title}</li>)
                    }
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col className='px-3 mb-5'>
                  <h2 className='red-text mb-0 pb-1'>Generator Info</h2>
                  <p className='pt-0'>{store.generator.generator !== undefined ? store.generator.generator.title : ''}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </FadeIn>
      </Col>
    </Row>
  )
}

export default hot(module)(StepEight)
