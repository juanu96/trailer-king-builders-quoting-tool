import React, { useContext, useState } from "react";
import { hot } from "react-hot-loader";
import { Row, Col } from "reactstrap";
import FadeIn from "react-fade-in";
import { QuoteStore } from "../App";
import uniqid from "uniqid";
import { post } from "axios";
import { Quote } from "../quote/QuoteTemplate";
import { PDFDownloadLink } from "@react-pdf/renderer";
import LogRocket from "logrocket";
import { LoadingOutlined } from "@ant-design/icons";

const StepNine = function (props) {
  const store = useContext(QuoteStore);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [finalBlob, setFinalBlob] = useState(null);

  //  //console.log(store)

  const generateQuote = (blob) => {
    const quoteID = uniqid();
    const d = new Date().getDate();
    const m = new Date().getMonth() + 1;
    const y = new Date().getFullYear();
    const date = `${m}/${d}/${y}`;

    const finalKitchenOptions = () => {
      const multiplied = [];
      const repeat = (func, times) => {
        func();
        times && --times && repeat(func, times);
      };
      for (const x of store.kitchenOptions.kitchenOptions) {
        if (x.multiplier) {
          repeat(() => multiplied.push(x), x.multiplier);
        } else {
          multiplied.push(x);
        }
      }
      return multiplied;
    };

    const finalSpecialtyOptions = () => {
      const multiplied = [];
      const repeat = (func, times) => {
        func();
        times && --times && repeat(func, times);
      };
      for (const x of store.specialtyItems.specialtyItems) {
        if (x.multiplier) {
          repeat(() => multiplied.push(x), x.multiplier);
        } else {
          multiplied.push(x);
        }
      }
      return multiplied;
    };

    const redefinedVehicle = [
      {
        title:
          store.truckCondition.truckCondition === "used"
            ? `${store.vehicleType.selectedVehicle.title} (used)`
            : `${store.vehicleType.selectedVehicle.title} (new)`,
        itemFeatures: {
          price: store.vehicleType.selectedVehicle.vehicleFeatures.price,
        },
      },
    ];

    const redefinedBuildout = [
      {
        title: store.buildOption.buildoutOption.title,
        itemFeatures: {
          price: store.buildOption.buildoutOption.features.price,
        },
      },
    ];

    const getHood = () => {
      if (store.buildOption.buildoutOption.title === "Kitchen Ready") {
        let fullLength = 0;
        for (const x of finalKitchenOptions()) {
          fullLength = fullLength + x.itemFeatures.width;
        }
        const ftLenght = fullLength / 12;
        if (ftLenght <= 6) {
          return [{ title: "6' hood (included)", itemFeatures: { price: 0 } }];
        } else if (ftLenght > 6 && ftLenght <= 8) {
          return [
            {
              title: "8' hood",
              itemFeatures: {
                price: store.buildOption.buildoutOption.features.hood8,
              },
            },
          ];
        } else if (ftLenght > 8 && ftLenght <= 10) {
          return [
            {
              title: "10' hood",
              itemFeatures: {
                price: store.buildOption.buildoutOption.features.hood10,
              },
            },
          ];
        } else if (ftLenght > 10) {
          return [
            {
              title: "12' hood",
              itemFeatures: {
                price: store.buildOption.buildoutOption.features.hood12,
              },
            },
          ];
        }
      } else {
        return [{ title: "No hood needed", itemFeatures: { price: 0 } }];
      }
    };
    const fullItems = [
      ...getHood(),
      ...redefinedVehicle,
      ...(store.generator.generator !== undefined
        ? [store.generator.generator]
        : []),
      ...finalKitchenOptions(),
      ...finalSpecialtyOptions(),
      ...redefinedBuildout,
    ];

    const finalPrice = () => {
      let finalPrice = 0;
      for (const x of fullItems) {
        finalPrice = finalPrice + x.itemFeatures.price;
      }
      return finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const makeTable = () => {
      let tableRows = "";
      for (const x of fullItems) {
        if (x !== undefined) {
          tableRows = tableRows + `${x.title} - $${x.itemFeatures.price}; `;
        }
      }
      return tableRows;
    };
    //console.log(makeTable());

    const getReCaptcha = () => {
      grecaptcha
        .execute("6Ldd4A4aAAAAAKKTrBwCHyzKn8gGhVsWVJxmyxso", {
          action: "submit",
        })
        .then(function (token) {
          // This is an example script - don't forget to change it!
          LogRocket.identify(quoteID, {
            name: `${store.personalInfo.firstName} ${store.personalInfo.lastName}`,
            email: `${store.personalInfo.email}`,
            allItems: fullItems,
          });

          const form = new FormData();
          form.append("tkb-quoteID", `${quoteID}`);
          form.append("tkb-date", `${date}`);
          form.append("tkb-firstName", `${store.personalInfo.firstName}`);
          form.append("tkb-lastName", `${store.personalInfo.lastName}`);
          form.append("tkb-userEmail", `${store.personalInfo.email}`);
          form.append("tkb-userTel", `${store.personalInfo.phone}`);
          form.append("tkb-companyName", `${store.personalInfo.company}`);
          form.append("tkb-state", `${store.personalInfo.state}`);
          form.append("tkb-financing", `${store.personalInfo.financing}`);
          form.append(
            "tkb-creditScore",
            `${
              store.personalInfo.creditScore === null
                ? ""
                : store.personalInfo.creditScore
            }`
          );
          form.append("tkb-allItems", `${makeTable()}`);
          form.append("tkb-finalPrice", `$${finalPrice()}`);
          form.append("file-pdf", blob, `tkb-quote-${quoteID}.pdf`);
          form.append("_wpcf7_recaptcha_response", token);
          //  //console.log(form)
          const submitForm = (x) => {
            const config = {
              headers: {
                "content-type": "multipart/form-data",
              },
            };
            post(
              "https://trailerkingbuilders.com/wp-json/contact-form-7/v1/contact-forms/598/feedback",
              x,
              config
            )
              .then(function (response) {
                //console.log("envio del primer formulario");
                //console.log(response);
                setSuccessMessage(response.data.message);
                setShowSuccess(true);
                setTimeout(() => {
                  store.setStep(1);
                }, 5000);
              })
              .catch(function (error) {
                setShowError(true);
                //console.log(error.message);
              });
          };

          const submitForm2 = (x) => {
          const config = {
            headers: {
              'content-type': 'multipart/form-data'
            }
          }
          post('/wp-json/tkb/v1/form', x, config)
            .then(function (response) {
              //console.log('envio del segundo formulario')
              //console.log(response)
              setSuccessMessage(response.data.message)
              setShowSuccess(true)
              setTimeout(() => {
                store.setStep(1)
              }, 5000)
            })
            .catch(function (error) {
              setShowError(true)
              //console.log(error.message)
            })
        } 

          submitForm(form);

          const form2 = new FormData();
          form2.append("date", `${date}`);
          form2.append("firstName", `${store.personalInfo.firstName}`);
          form2.append("lastName", `${store.personalInfo.lastName}`);
          form2.append("userEmail", `${store.personalInfo.email}`);
          form2.append("userTel", `${store.personalInfo.phone}`);
          form2.append("companyName", `${store.personalInfo.company}`);
          form2.append("state", `${store.personalInfo.state}`);
          form2.append("financing", `${store.personalInfo.financing}`);
          form2.append(
            "00N2E00000JqnRR",
            `${
              store.personalInfo.creditScore === null
                ? ""
                : store.personalInfo.creditScore
            }`
          );
          form2.append("pdf", blob, `tkb-quote-${quoteID}.pdf`);

          const captcha_settings = {
            keyname: "TFMv2",
            fallback: "true",
            orgId: "00D2E000001GiVv",
            ts: new Date().getTime(),
          };

          const oid = "00D2E000001GiVv";
          const retURL = "https://trailerkingbuilders.com/";
          const debug = 1;
          const debugEmail = "juan@topfloormarketing.net";

          form2.append("captcha_settings", JSON.stringify(captcha_settings ));
          form2.append("oid", oid);
          form2.append("retURL", retURL);
          form2.append("debug", debug);
          form2.append("debugEmail", debugEmail);

          submitForm2(form2);
        });
    };
    getReCaptcha();
  };

  return (
    <>
      <Row className="responsive">
        <>
          
          <PDFDownloadLink
            document={<Quote info={store} />}
            fileName="tkb-quote.pdf"
          >
            {({ blob, url, loading, error }) => {
              if (error) {
                //console.log(error);
              }
              if (loading === false) {
                if (finalBlob === null) {
                  // //console.log(blob)
                  setFinalBlob(blob);
                  setTimeout(() => {
                    generateQuote(blob);
                  }, 1000);
                }
              }
              return null;
            }}
          </PDFDownloadLink>
        </>
        <Col
          className="align-self-center h-100 d-flex flex-column align-items-center justify-content-center"
          xs={12}
          sm={12}
          md={12}
        >
          <FadeIn delay={500} transitionDuration={600}>
            <img
              className="img-fluid mx-auto d-block mb-5"
              src="https://trailerkingbuilders.com/wp-content/uploads/2020/07/Logo.png"
            />
          </FadeIn>
          <FadeIn delay={500} transitionDuration={600}>
            <h2
              className="mb-1 text-center font-weight-bold"
              style={{ fontSize: "36px", lineHeight: "50px" }}
            >
              Thank you for requesting a Trailer King Builder's Quote!
            </h2>
            <p
              className="mb-5 text-center"
              style={{ fontSize: "18px", lineHeight: "30px" }}
            >
              If you have any question or have an even more custom build
              request, please dont hessitate to contact us!
            </p>
            <Row>
              <Col className="text-center">
                {showSuccess ? (
                  <p className="mt-3">{successMessage}</p>
                ) : (
                  <div className="mt-3 text-danger">
                    <LoadingOutlined style={{ fontSize: 40 }} spin />
                  </div>
                )}
                {showError && successMessage !== "" ? (
                  <p>There was a problem with your request, try again later.</p>
                ) : null}
              </Col>
            </Row>
          </FadeIn>
        </Col>
      </Row>
    </>
  );
};

export default hot(module)(StepNine);
