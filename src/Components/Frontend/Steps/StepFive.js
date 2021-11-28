import React, { useContext, useState } from 'react'
import { hot } from 'react-hot-loader'
import { Row, Col, Button } from 'reactstrap'
import FadeIn from 'react-fade-in'
import { QuoteStore } from '../App'
import { gql, useQuery } from "@apollo/client";
import { Tag, Tooltip, Modal } from 'antd'
import ItemCard from '../components/itemCard'

const GAS_ITEMS = gql`
{
  items(first: 100) {
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

const StepFive = function (props) {
  const store = useContext(QuoteStore)
  const [selectedItems, setSelectedItems] = useState([])
  const { error, loading, data } = useQuery(GAS_ITEMS)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    store.setKitchenOptions({ kitchenOptions: selectedItems })
    store.setStep(6)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  // Next step
  const nextStep = () => {
    if (selectedItems.length === 0) {
      showModal()
    } else {
      store.setKitchenOptions({ kitchenOptions: selectedItems })
      store.setStep(6)
    }
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

  const getGasUnits = () => {
    if (data && data.items) {
      const FilteredData = data.items.nodes.filter(u => u.itemFeatures.itemtype === 'gas-equipment-units')
      return FilteredData
    } else {
      return null
    }
  }

  const getCabinets = () => {
    if (data && data.items) {
      const FilteredData = data.items.nodes.filter(u => u.itemFeatures.itemtype === 'cabinets')
      return FilteredData
    } else {
      return null
    }
  }

  const getRefrigerationUnits = () => {
    if (data && data.items) {
      const FilteredData = data.items.nodes.filter(u => u.itemFeatures.itemtype === 'refrigeration-units')
      return FilteredData
    } else {
      return null
    }
  }
  //  console.log(store)
  return (
    <>
      <Modal title='Kitchen Items' visible={isModalVisible} cancelText='Add kitchen items' okText="I don't need kitchen items" onOk={handleOk} onCancel={handleCancel}>
        <h3 className='text-danger'>You have not added any kitchen items to your buildout</h3>
        <h4> are you sure you want to continue?</h4>
      </Modal>
      <Row className='responsive'>
        <Col className='align-self-center h-100 flex-column d-flex justify-content-center' xs={12} sm={12} md={6}>
          <FadeIn delay={500} transitionDuration={500}>
            <h2 className='mb-5 font-weight-bold' style={{ fontSize: '36px', lineHeight: '50px' }}>
            Pick your <br />
            Kitchen Options
            </h2>
            <p className='mb-5' style={{ fontSize: '18px', lineHeight: '30px' }}>
          Choose from the list of equipment needed for your trailer, please keep spacing in mind as more equipment is needed the dimensions of the trailer/truck may need to change.
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
                <a className='float-left back-link' onClick={() => store.setStep(4)}>Previous step</a>
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
        <Col className='align-self-center flex-column h-100 d-flex align-items-center justify-content-center responsive-mt' xs={12} sm={12} md={6}>
          <div className='scrollBar' style={{ maxHeight: '50vh' }}>
            {
              store.buildOption.buildoutOption.id === 'cG9zdDozNw=='
                ? <>
                  <FadeIn delay={500} transitionDuration={500}><h2 className='mt-5'><b>Refrigeration Units</b></h2></FadeIn>
                  <Row className='mr-0'>
                    {loading && 'Loading...'}
                    {error && 'Error'}
                    {
                      getRefrigerationUnits() !== null ? getRefrigerationUnits().map(j => <ItemCard {...j} key={j.id} selectIt={(x, m) => addOrRemoveItem(x, m)} />) : null
                    }
                  </Row>
                </>
                : <>
                  <FadeIn delay={500} transitionDuration={500}><h2><b>Gas Equipment Units</b></h2></FadeIn>
                  <Row className='mr-0'>
                    {loading && 'Loading...'}
                    {error && 'Error'}
                    {
                      getGasUnits() !== null ? getGasUnits().map(j => <ItemCard {...j} key={j.id} selectIt={(x, m) => addOrRemoveItem(x, m)} />) : null
                    }
                  </Row>
                  <FadeIn delay={500} transitionDuration={500}><h2 className='mt-5'><b>Cabinets</b></h2></FadeIn>
                  <Row className='mr-0'>
                    {loading && 'Loading...'}
                    {error && 'Error'}
                    {
                      getCabinets() !== null ? getCabinets().map(j => <ItemCard {...j} key={j.id} selectIt={(x, m) => addOrRemoveItem(x, m)} />) : null
                    }
                  </Row>
                  <FadeIn delay={500} transitionDuration={500}><h2 className='mt-5'><b>Refrigeration Units</b></h2></FadeIn>
                  <Row className='mr-0'>
                    {loading && 'Loading...'}
                    {error && 'Error'}
                    {
                      getRefrigerationUnits() !== null ? getRefrigerationUnits().map(j => <ItemCard {...j} key={j.id} selectIt={(x, m) => addOrRemoveItem(x, m)} />) : null
                    }
                  </Row>
                </>
            }
          </div>
        </Col>
      </Row>
    </>
  )
}

export default hot(module)(StepFive)
