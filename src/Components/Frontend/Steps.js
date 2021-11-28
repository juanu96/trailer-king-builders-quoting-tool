
import { hot } from 'react-hot-loader'
import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'
import StepThree from './Steps/StepThree'
import StepFour from './Steps/StepFour'
import StepFive from './Steps/StepFive'
import StepSix from './Steps/StepSix'
import StepSeven from './Steps/StepSeven'
import StepEight from './Steps/StepEight'
import StepNine from './Steps/StepNine'

const Steps = function (props) {
  const stepToShow = () => {
    switch (props.currentStep) {
      case 1: return <StepOne />
      case 2: return <StepTwo />
      case 3: return <StepThree />
      case 4: return <StepFour />
      case 5: return <StepFive />
      case 6: return <StepSix />
      case 7: return <StepSeven />
      case 8: return <StepEight />
      case 9: return <StepNine />
      default: return <StepOne />
    }
  }
  return (
    stepToShow()
  )
}

export default hot(module)(Steps)
