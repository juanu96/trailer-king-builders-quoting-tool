import React, { useContext, useState } from 'react'
import { hot } from 'react-hot-loader'
import { Row, Col, Button } from 'reactstrap'
import { Select } from 'antd'
import FadeIn from 'react-fade-in'
import { QuoteStore } from '../App'
import { gql, useQuery } from "@apollo/client";

const GENERATORS = gql`
{
  items(first:100 where:{itemType:"generators"}) {
    nodes {
      id
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      itemFeatures {
        itemtype
        features
        price
      }
    }
  }
}
`
const StepSix = function (props) {
  const { loading, data } = useQuery(GENERATORS)
  const store = useContext(QuoteStore)
  const [generator, setGenerator] = useState(null)
  const { Option } = Select

  // Next step
  const nextStep = () => {
    const finalData = data.items.nodes.find(x => x.id === generator)
    store.setGenerator({ generator: finalData })
    store.setStep(7)
  }

  // generator info
  const generatorInfo = () => {
    if (data) {
      const SelectedBulidout = generator !== null ? data.items.nodes.find(x => x.id === generator).itemFeatures.features : ''
      return SelectedBulidout
    } else {
      return ''
    }
  }

  // generator info
  const generatorImage = () => {
    if (data) {
      const SelectedBulidout = generator !== null ? data.items.nodes.find(x => x.id === generator).featuredImage.sourceUrl : ''
      return SelectedBulidout
    } else {
      return ''
    }
  }

  return (
    <Row className='responsive'>
      <Col className='align-self-center h-100 d-flex align-items-center justify-content-center' xs={12} sm={12} md={6}>
        <FadeIn delay={500} transitionDuration={500}>
          <h2 className='mb-5 font-weight-bold' style={{ fontSize: '36px', lineHeight: '50px' }}>
            Pick a <br /> Generator
          </h2>
          <p className='mb-5' style={{ fontSize: '18px', lineHeight: '30px' }}>
          Choose from the list of generators from the drop down list
          </p>
          <Row className='mb-5'>
            <Col className='px-1'>
              <Select
                className='w-100 px-1'
                placeholder='Select your generator'
                loading={loading}
                onChange={(e) => {
                  setGenerator(e)
                }}
              >
                {
                  data
                    ? data.items.nodes.map((x, i) => <Option key={i} value={x.id}>{x.title}</Option>)
                    : null
                }
              </Select>
              <p className='mb-5 mt-3' style={{ fontSize: '14px', lineHeight: '16px' }}>{generatorInfo()}</p>
            </Col>
          </Row>
          <Row>
            <Col className='d-flex align-items-end pl-0'>
              <a className='float-left back-link' onClick={() => store.setStep(5)}>Previous step</a>
            </Col>
            <Col>
              <Button
                className='px-5 py-3 mt-5 font-weight-bold float-right'
                color='primary'
                size='lg'
                onClick={() => nextStep()}
              >
                Next Step
              </Button>
            </Col>
          </Row>
        </FadeIn>
      </Col>
      <Col className='align-self-center h-100 d-flex align-items-center justify-content-center flex-column responsive-mt' xs={12} sm={12} md={6}>
        <FadeIn delay={500} transitionDuration={500}>
          <img className='img-fluid mx-auto d-block mb-5' src='https://trailerkingbuilders.com/wp-content/uploads/2020/07/Logo.png' />
          <img className='img-fluid mx-auto d-block mb-5' src={generatorImage()} />
        </FadeIn>
      </Col>
    </Row>
  )
}

export default hot(module)(StepSix)
