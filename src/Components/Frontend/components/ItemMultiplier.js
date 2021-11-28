import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'

export default function ItemMultiplier (props) {
  const [currentAmount, setCurrentAmount] = useState(1)

  useEffect(() => {
    props.multiply(currentAmount)
  })

  return (
    <div style={{ bottom: 0 }} className='d-flex position-absolute'>
      <Button disabled={props.disabled} type='primary' onClick={currentAmount > 1 ? () => setCurrentAmount(currentAmount - 1) : null}> - </Button>
      <Input disabled={props.disabled} className='text-center' type='text' value={currentAmount} />
      <Button disabled={props.disabled} type='primary' onClick={() => setCurrentAmount(currentAmount + 1)}> + </Button>
    </div>
  )
}
