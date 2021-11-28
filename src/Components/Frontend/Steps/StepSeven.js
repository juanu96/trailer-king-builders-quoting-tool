import React, { useContext, useState } from 'react'
import { hot } from 'react-hot-loader'
import { Row, Col, Button } from 'reactstrap'
import FadeIn from 'react-fade-in'
import { QuoteStore } from '../App'
import { gql, useQuery } from "@apollo/client";
import { Tag, Tooltip } from 'antd'
import ItemCard from '../components/itemCard'

const MISCELLANEOUS = gql`
{
    items(first:100 where:{itemType:"miscellaneous"}) {
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
          width
        }
      }
    }
  }
`

const StepSeven = function (props) {
  const store = useContext(QuoteStore)
  const [selectedItems, setSelectedItems] = useState([])
  const { error, loading, data } = useQuery(MISCELLANEOUS)

  // Next step
  const nextStep = () => {
    store.setSpecialtyItems({ specialtyItems: selectedItems })
    store.setStep(8)
  }

  // Add or remove Item
  const addOrRemoveItem = (x, m) => {
    x.multiplier = m
    //  console.log(x)
    const matchFound = selectedItems.find((j) => j.id === x.id)
    if (matchFound === undefined) {
      setSelectedItems([x, ...selectedItems])
    } else {
      const unique = selectedItems.filter((j) => j.id !== x.id)
      setSelectedItems(unique)
    }
  }

  // Get Misc items
  const getMisc = () => {
    if (data && data.items) {
      const FilteredData = data.items.nodes
      return FilteredData
    } else {
      return null
    }
  }

  return (
    <Row className='responsive'>
      <Col className='align-self-center h-100 d-flex flex-column justify-content-center' xs={12} sm={12} md={6}>
        <FadeIn delay={500} transitionDuration={500}>
          <h2 className='mb-5 font-weight-bold' style={{ fontSize: '36px', lineHeight: '50px' }}>
            Pick your <br />
            Specialty Items
          </h2>
          <p className='mb-5' style={{ fontSize: '18px', lineHeight: '30px' }}>
          Choose from the list of specialty items
          </p>
        </FadeIn>
        <div>
          {
            selectedItems.length > 0 ? selectedItems.map((x, i) => <Tooltip title={x.title} key={i} color='blue'><Tag className='mb-2' color='#06B3FF'>{x.title}</Tag></Tooltip>) : ''
          }
        </div>
        <FadeIn>
          <Row>
            <Col className='d-flex align-items-end pl-0'>
              <a className='float-left back-link' onClick={() => store.setStep(6)}>Previous step</a>
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
      <Col className='align-self-center d-flex flex-column justify-content-center responsive-mt' xs={12} sm={12} md={6}>
        <div className='scrollBar' style={{ maxHeight: '50vh' }}>
          <FadeIn delay={500} transitionDuration={500}><h2><b>Specialty Items</b></h2></FadeIn>
          <Row className='mr-0'>
            {loading && 'Loading...'}
            {error && 'Error'}
            {
              getMisc() !== null ? getMisc().map(j => <ItemCard {...j} key={j.id} selectIt={(x, m) => addOrRemoveItem(x, m)} />) : null
            }
          </Row>
        </div>
      </Col>
    </Row>
  )
}

export default hot(module)(StepSeven)
