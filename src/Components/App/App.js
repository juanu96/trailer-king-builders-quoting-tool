import React, { createContext, useState } from "react";
import { hot } from "react-hot-loader";
import "../../global.less";
import "./App.scss";
import { Steps } from "antd";
import { Container, Row, Col } from "reactstrap";
import FormSteps from "./Steps";
import FadeIn from "react-fade-in";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://trailerkingbuilder.bytfm.com/graphql",
  cache: new InMemoryCache(),
});

export const QuoteStore = createContext();

const [step, setStep] = useState(1);
const [vehicleType, setVehicleType] = useState(null);
const [truckSize, setTruckSize] = useState(null);
const [truckCondition, setTruckCondition] = useState(null);
const [buildOption, setBuildOption] = useState(null);
const [kitchenOptions, setKitchenOptions] = useState(null);
const [generator, setGenerator] = useState(null);
const [specialtyItems, setSpecialtyItems] = useState(null);
const [personalInfo, setPersonalInfo] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: null,
  company: "",
  state: "",
  financing: false,
  creditScore: null,
});
const { Step } = Steps;

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <QuoteStore.Provider
          value={{
            step,
            setStep,
            vehicleType,
            setVehicleType,
            truckSize,
            setTruckSize,
            truckCondition,
            setTruckCondition,
            buildOption,
            setBuildOption,
            kitchenOptions,
            setKitchenOptions,
            generator,
            setGenerator,
            specialtyItems,
            setSpecialtyItems,
            personalInfo,
            setPersonalInfo,
          }}
        >
          <Container fluid style={{ backgroundColor: "transparent" }}>
            <Row>
              <Col xs={12} sm={12} md={1}>
                <FadeIn delay={100} transitionDuration={500}>
                  <Steps
                    current={step - 1}
                    className="desktop"
                    direction="vertical"
                  >
                    <Step />
                    <Step />
                    <Step />
                    <Step />
                    <Step />
                    <Step />
                    <Step />
                    <Step />
                  </Steps>
                </FadeIn>
                <Steps
                  current={step - 1}
                  className="mobile mb-5"
                  direction="horizontal"
                >
                  <Step />
                  <Step />
                  <Step />
                  <Step />
                  <Step />
                  <Step />
                  <Step />
                  <Step />
                </Steps>
              </Col>
              <Col xs={12} sm={12} md={11}>
                <FormSteps currentStep={step} />
              </Col>
            </Row>
          </Container>
        </QuoteStore.Provider>
      </ApolloProvider>
    </>
  );
}

export default App;
