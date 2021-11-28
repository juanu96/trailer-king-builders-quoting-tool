
import { hot } from 'react-hot-loader'
import StepOne from '../Frontend/Steps/StepOne'
import StepTwo from '../Frontend/Steps/StepTwo'
import StepThree from '../Frontend/Steps/StepThree'
import StepFour from '../Frontend/Steps/StepFour'
import StepFive from '../Frontend/Steps/StepFive'
import StepSix from '../Frontend/Steps/StepSix'
import StepSeven from '../Frontend/Steps/StepSeven'
import StepEight from '../Frontend/Steps/StepEight'
import StepNine from '../Frontend/Steps/StepNine'

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
