import React, { useContext, useState } from 'react'
import { hot } from 'react-hot-loader'
import { Row, Col, Button } from 'reactstrap'
import { Select } from 'antd'
import FadeIn from 'react-fade-in'
import { QuoteStore } from '../App'
import { gql, useQuery } from "@apollo/client";

const BUILDOUT = gql`
{
  buildout {
    nodes {
      id
      title
      content
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      features {
        price
        hood8
        hood10
        hood12
        features {
          feature
        }
      }
    }
  }
}
`
const StepFour = function (props) {
  const { loading, data } = useQuery(BUILDOUT)
  const store = useContext(QuoteStore)
  const [buildOut, setBuildOut] = useState(null)
  const { Option } = Select

  // Next step
  const nextStep = () => {
    const finalData = data.buildout.nodes.find(x => x.id === buildOut)
    store.setBuildOption({ buildoutOption: finalData })
    store.setStep(5)
  }

  // buildout info
  const buildoutInfo = () => {
    if (data) {
      const SelectedBulidout = buildOut !== null ? data.buildout.nodes.find(x => x.id === buildOut).content.replace(/<[^>]*>/g, '') : ''
      return SelectedBulidout
    } else {
      return ''
    }
  }

  // buildout features
  const buildoutFeatures = () => {
    if (data) {
      const SelectedFeatures = buildOut !== null ? data.buildout.nodes.find(x => x.id === buildOut).features.features : ''
      return SelectedFeatures
    } else {
      return ''
    }
  }

  // buildout image
  const buildoutImage = () => {
    if (data) {
      const SelectedImage = buildOut !== null ? data.buildout.nodes.find(x => x.id === buildOut).featuredImage.node.mediaItemUrl : ''
      return SelectedImage
    } else {
      return ''
    }
  }
  //  console.log(store)
  return (
    <Row className='responsive'>
      <Col className='align-self-center h-100 d-flex align-items-center justify-content-center' xs={12} sm={12} md={6}>
        <FadeIn delay={500} transitionDuration={500}>
          <h2 className='mb-5 font-weight-bold' style={{ fontSize: '36px', lineHeight: '50px' }}>
            Pick your <br /> Build Out Options
          </h2>
          <p className='mb-5' style={{ fontSize: '18px', lineHeight: '30px' }}>
          Choose either a Snow Cone-Coffee-Snack Style trailer or Kitchen Ready trailer, the Kitchen ready trailers will feature a 6 ft hood, extractor fan and gas lines included in the buildout.
          </p>
          <Row className='mb-3'>
            <Col className='px-1'>
              <Select
                className='w-100 px-1'
                placeholder='Select your build out option'
                loading={loading}
                onChange={(e) => {
                  setBuildOut(e)
                }}
              >
                {
                  data
                    ? data.buildout.nodes.map((x, i) => <Option key={i} value={x.id}>{x.title}</Option>)
                    : null
                }
              </Select>
              <p className='mb-3 mt-3 doesNot' style={{ fontSize: '14px', lineHeight: '16px' }}>{buildoutInfo()}</p>
              <ul className={`featureList ${buildoutInfo().includes('does not') ? 'bad' : 'good'}`}>
                {
                  buildoutFeatures() !== ''
                    ? buildoutFeatures().map((x, i) => {
                      return <li key={i}>{x.feature}</li>
                    })
                    : null
                }
              </ul>
            </Col>
          </Row>
          <Row>
            <Col className='d-flex align-items-end pl-0'>
              <a className='float-left back-link' onClick={() => store.setStep(3)}>Previous step</a>
            </Col>
            <Col>
              <Button
                className='px-5 py-3 mt-5 font-weight-bold float-right'
                color='primary'
                size='lg'
                disabled={!buildOut}
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
          <img className='img-fluid mx-auto d-block mb-5' src={buildoutImage()} />
        </FadeIn>
      </Col>
    </Row>
  )
}

export default hot(module)(StepFour)
