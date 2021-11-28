import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer'
import uniqid from 'uniqid'

export const Quote = (props) => {
  const d = new Date().getDate()
  const m = new Date().getMonth() + 1
  const y = new Date().getFullYear()
  const date = `${m}/${d}/${y}`

  const redefinedVehicle = [{
    title: props.info.truckCondition.truckCondition === 'used' ? `${props.info.vehicleType.selectedVehicle.title} (used)` : `${props.info.vehicleType.selectedVehicle.title} (new)`,
    itemFeatures: { price: props.info.vehicleType.selectedVehicle.vehicleFeatures.price }
  }]

  const redefinedBuildout = [{
    title: props.info.buildOption.buildoutOption.title,
    itemFeatures: { price: props.info.buildOption.buildoutOption.features.price }
  }]

  const finalKitchenOptions = () => {
    const multiplied = []
    const repeat = (func, times) => {
      func()
      times && --times && repeat(func, times)
    }
    for (const x of props.info.kitchenOptions.kitchenOptions) {
      if (x.multiplier) {
        repeat(() => multiplied.push(x), x.multiplier)
      } else {
        multiplied.push(x)
      }
    }
    return multiplied
  }

  const finalSpecialtyOptions = () => {
    const multiplied = []
    const repeat = (func, times) => {
      func()
      times && --times && repeat(func, times)
    }
    for (const x of props.info.specialtyItems.specialtyItems) {
      if (x.multiplier) {
        repeat(() => multiplied.push(x), x.multiplier)
      } else {
        multiplied.push(x)
      }
    }
    return multiplied
  }

  const getHood = () => {
    if (props.info.buildOption.buildoutOption.title === 'Kitchen Ready') {
      let fullLength = 0
      for (const x of finalKitchenOptions()) { fullLength = fullLength + x.itemFeatures.width }
      const ftLenght = fullLength / 12
      if (ftLenght <= 6) {
        return [{ title: '6\' hood (included)', itemFeatures: { price: 0 } }]
      } else if (ftLenght > 6 && ftLenght <= 8) {
        return [{ title: '8\' hood', itemFeatures: { price: props.info.buildOption.buildoutOption.features.hood8 } }]
      } else if (ftLenght > 8 && ftLenght <= 10) {
        return [{ title: '10\' hood', itemFeatures: { price: props.info.buildOption.buildoutOption.features.hood10 } }]
      } else if (ftLenght > 10) {
        return [{ title: '12\' hood', itemFeatures: { price: props.info.buildOption.buildoutOption.features.hood12 } }]
      }
    } else {
      return [{ title: 'No hood needed', itemFeatures: { price: 0 } }]
    }
  }

  const fullItems = [
    ...getHood(),
    ...redefinedVehicle,
    ...(props.info.generator.generator !== undefined ? [props.info.generator.generator] : []),
    ...finalKitchenOptions(),
    ...finalSpecialtyOptions(),
    ...redefinedBuildout
  ]

  const finalPrice = () => {
    let finalPrice = 0
    for (const x of fullItems) {
      finalPrice = finalPrice + x.itemFeatures.price
    }
    return finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <Document>
      <Page size={[595.28]} style={styles.body}>
        <View style={styles.flexbox}>
          <View style={styles.fifty}>
            <Image
              style={styles.image}
              src='https://res.cloudinary.com/topfloormarketing/image/upload/v1594181575/trailer%20king%20builders/logo-black.png'
            />
          </View>
          <View style={styles.fifty}>
            <Text style={styles.title}>QUOTE</Text>
            <View style={styles.flexbox}>
              <View style={styles.fiftyTable}>
                <View>
                  <Text style={styles.textMargin}>date:</Text>
                </View>
                <View style={styles.tableBorder}>
                  <Text style={styles.textMargin}>Quote #:</Text>
                </View>
              </View>
              <View style={styles.fiftyTable}>
                <View>
                  <Text style={styles.textMargin}>{date}</Text>
                </View>
                <View style={styles.tableBorder}>
                  <Text style={styles.textMargin}>{uniqid()}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={styles.textIncludes}>(346) 571-3888     •     </Text>
          <Text style={styles.textIncludes}>sales@trailerkingbuilders.com     •      </Text>
          <Text style={styles.textIncludes}>7730 Pinemont Dr. Houston, TX 77040</Text>
        </View>
        <View style={styles.fiftyBT}>
          <View style={styles.coloredHeader}>
            <Text style={styles.textMarginWhite}>Customer Info</Text>
          </View>
          <View>
            <Text style={styles.text}>Name: {props.info.personalInfo.firstName} {props.info.personalInfo.lastName}</Text>
            <Text style={styles.text}>Email: {props.info.personalInfo.email}</Text>
            <Text style={styles.text}>Phone: {props.info.personalInfo.phone}</Text>
            <Text style={styles.text}>Company: {props.info.personalInfo.company}</Text>
            <Text style={styles.text}>State: {props.info.personalInfo.state}</Text>
            <Text style={styles.text}>Financing: {props.info.personalInfo.financing ? 'yes' : 'no'}</Text>
            <Text style={styles.text}>Credit Score: {props.info.personalInfo.creditScore}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.textBold}>All our trailers include:</Text>
          <Text style={styles.textIncludes}>• 15k BTU A/C.</Text>
          <Text style={styles.textIncludes}>• 6’ Concession Window include screens and door with flush lockable latches with gas shocks.</Text>
          <Text style={styles.textIncludes}>• Breaker Panel w/ 50 Amp, 25' Life Line, 6 Outlets (GFI), and LED Light fixtures.</Text>
          <Text style={styles.textIncludes}>• Custom cabinet with aluminum for three compartment 15" Sinks w/ two drain boards (8.5 wide) and a separate Hand wash sink.</Text>
          <Text style={styles.textIncludes}>• 40 Gallon fresh and a 50 Gallon waste water tanks.</Text>
          <Text style={styles.textIncludes}>•  Water  pump w/ a water heater 2.5 gallon.</Text>
          <Text style={styles.textIncludes}>• Single piece rubber coin flooring for water protection.  Non slippery and easy to clean. ATP Floor on porch.</Text>
          <Text style={styles.textIncludes}>• White Aluminum walls and ceiling.</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.coloredHeaderSeven}>
            <Text style={styles.textMarginWhite}>Item Description</Text>
          </View>
          <View style={styles.coloredHeaderThree}>
            <Text style={styles.textMarginWhite}>Price</Text>
          </View>
        </View>
        {
          fullItems.map(
            (x, i) => {
              //  console.log(x)
              if (i % 2 === 0) {
                return (
                  <View style={styles.rowTable}>
                    <View style={styles.rowSeven}>
                      <Text style={styles.text}>{x.title}</Text>
                    </View>
                    <View style={styles.rowThree}>
                      <Text style={styles.text}>${x.itemFeatures.price === null ? 0 : x.itemFeatures.price}</Text>
                    </View>
                  </View>
                )
              } else {
                return (
                  <View style={styles.rowTableDark}>
                    <View style={styles.rowSeven}>
                      <Text style={styles.text}>{x.title}</Text>
                    </View>
                    <View style={styles.rowThree}>
                      <Text style={styles.text}>${x.itemFeatures.price === null ? 0 : x.itemFeatures.price}</Text>
                    </View>
                  </View>
                )
              }
            }
          )
        }
        <View style={styles.rowTable}>
          <View style={styles.rowSeven}>
            <Text style={styles.totalTextRight}>TOTAL</Text>
          </View>
          <View style={styles.rowThree}>
            <Text style={styles.totalText}>${finalPrice()}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.textBold}>Note:</Text>
          <Text style={styles.textIncludes}>
            In order to secure a build date on our production schedule, a down payment (50%) is required for all custom trailers/food trrucks, It will take aproximetaly 4-8 weeks to manufacture/finish your trailer/food truck.  Upon completion your balance is due by "Wire Transfer" or "Cashiers Check" payable to Green Copperfield LLC within 5 days of delivery or pickup whichever comes first.  If buyer is unable to pick up trailer within allotted time frame, Buyer may incur a storage fee of $25 per day in addition to all other monies due under this agreement.  If freight carrier is used for delivery, the final payment is due prior to shipment. Any delivery fees if any are payable to the transport company.  Trailer King Builders is not associated with any transport company nor are we responsible for any damages after the trailer has left our facility.  Due to ever changing state and local policies, please review the specifications outlined above and verify that this trailer complies with required codes.  Standard units do not come with Fire Suppression Systems.  Because of the custom nature of our business please note that all measurements may vary by several inches and are only aproximates.  We do not collect sales tax from out of state residents.  Buyer is responsible for applicable state and local taxes. Any legal action arising out of or concerning this agreement shall be broought in Harris County, Texas.  All sales are final and non refundable.  all work on warranted defects will be performed at the 4309 Northfield Lance Houston Texas Facility and it is the buyer's responsibility to deliver the trailer to the Company's business premises, the company MAY, at the companys discretion, choose to havce work performed at another location.  All cooking and refrigeration comes with a seperate warrant provided by the respective manufacturer.  Once your order/deposit is placed with the factory, any changes if possible will incur a $125 revision fee and must be submitted in wirting.  By sending deposit you agree to the terms above.
          </Text>
        </View>
      </Page>
    </Document>
  )
}

Font.register({
  family: 'Oswald',
  src: 'https://res.cloudinary.com/topfloormarketing/raw/upload/v1594184413/trailer%20king%20builders/Roboto-Regular.ttf'
})

Font.register({
  family: 'OswaldBold',
  src: 'https://res.cloudinary.com/topfloormarketing/raw/upload/v1594184467/trailer%20king%20builders/Roboto-Bold.ttf'
})

const styles = StyleSheet.create({
  section: {
    marginTop: 35,
    display: 'flex',
    flexDirection: 'row'
  },
  rowTable: {
    display: 'flex',
    flexDirection: 'row'
  },
  rowTableDark: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f2f2f2'
  },
  textMargin: {
    marginLeft: 5,
    fontFamily: 'Oswald',
    fontSize: 14,
    textTransform: 'uppercase'
  },
  textMarginWhite: {
    marginLeft: 5,
    fontWeight: 900,
    color: 'white',
    fontSize: 14,
    fontFamily: 'OswaldBold'
  },
  fifty: {
    width: '50%'
  },
  coloredHeader: {
    backgroundColor: '#ED1C24'
  },
  coloredHeaderSeven: {
    backgroundColor: '#ED1C24',
    width: '70%'
  },
  coloredHeaderThree: {
    backgroundColor: '#ED1C24',
    width: '30%'
  },
  rowSeven: {
    width: '70%'
  },
  rowThree: {
    width: '30%'
  },
  fiftyBT: {
    width: '50%',
    borderColor: '#999',
    borderWidth: 0.7,
    marginTop: 30
  },
  fiftyTable: {
    width: '50%'
  },
  tableBorder: {
    backgroundColor: '#f2f2f2',
    margin: 0
  },
  flexbox: {
    display: 'flex',
    flexDirection: 'row'
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  title: {
    fontSize: 24,
    color: '#ED1C24',
    textAlign: 'right',
    fontFamily: 'Oswald',
    marginBottom: 20
  },
  author: {
    fontSize: 12,
    color: '#ED1C24',
    textAlign: 'left',
    marginBottom: 40
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    marginLeft: 5,
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'Oswald'
  },
  textBold: {
    marginLeft: 5,
    marginTop: 20,
    fontSize: 14,
    fontFamily: 'OswaldBold'
  },
  textIncludes: {
    marginLeft: 5,
    marginTop: 5,
    fontSize: 11,
    fontFamily: 'Oswald'
  },
  totalText: {
    marginLeft: 5,
    marginTop: 5,
    fontSize: 20,
    fontFamily: 'OswaldBold'
  },
  totalTextRight: {
    color: '#ED1C24',
    marginRight: 5,
    marginTop: 5,
    textAlign: 'right',
    fontSize: 20,
    fontFamily: 'OswaldBold'
  },
  image: {
    width: 180
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey'
  }
})
