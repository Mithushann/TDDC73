import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, View, Text, Image, screen, Modal, TextInput, Button, Pressable } from 'react-native';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-native-modern-datepicker';


export default function App() {
  //card visible
  const [CardFrontVisible, setCardFrontVisible] = useState(true);
  const [CardBackVisible, setCardBackVisible] = useState(false);

  // Card number state
  const [cardNumber, setCardNumber] = useState("");

  // Card holder state
  const [cardHolder, setCardHolder] = useState("FULL NAME");

  // Card expiry date state
  const [date, setDate] = useState('mm/yy')
  const [open, setOpen] = useState(false)

  // Creadit network state
  const [cardNetwork, setCardNetwork] = useState("visa");

  // Card cvv state
  const [cardCvv, setCardCvv] = useState("CVV");

  //Modal for front of card
  const [modalVisible, setModalVisible] = useState(false);

  //Deal with the card number
  function FormatAndSetCardNumber(number) {

    // Remove all non-digit characters
    number = number.replace(/\D/g, "");

    // Find the card network
    if (number.startsWith("4")) {
      setCardNetwork("visa");
    } else if (number.startsWith("5")) {
      setCardNetwork("mastercard");
    } else if (number.startsWith("6")) {
      setCardNetwork("discover");
    } else if (number.startsWith("3")) {
      setCardNetwork("amex");
    } else {
      setCardNetwork("visa"); // Default to visa
    }

    //Format amex card number (4 digits, 6 digits, 5 digits)
    if (cardNetwork === "amex") {
      number.split(' ').join('');
      if (number.length > 15) {
        number = number.slice(0, 15)
      }
      if (number.length > 9) {
        number = number.slice(0, 10) + "   " + number.slice(10);
      }
      if (number.length > 4) {
        number = number.slice(0, 4) + "   " + number.slice(4);
      }

    }
    // Format the card number if not amex (4 digits, 4 digits, 4 digits, 4 digits)
    else {
      if (number.length > 16) {
        number = number.slice(0, 16);
      }
      if (number.length > 12) {
        number = number.slice(0, 12) + "   " + number.slice(12);
      }
      if (number.length > 8) {
        number = number.slice(0, 8) + "   " + number.slice(8);
      }
      if (number.length > 4) {
        number = number.slice(0, 4) + "   " + number.slice(4);
      }
    }

    // Set the card number
    setCardNumber(number)
  }

  // Deal with the card holder
  function FormatAndSetCardHolder(name) {
    // Capitalize the first letter of each word
    name = name.replace(/\w\S*/g, function (txt) { return txt.toUpperCase() ; });

    //strip all non-alphabetic characters
    name = name.replace(/[^a-zA-Z ]/g, "");

    //Add extra space when space appears
    name = name.replace(/ +(?= )/g, '');

    //cut off name after 21 characters
    if (name.length > 21) {
      name = name.slice(0, 21);
    }


    // Set the card holder
    setCardHolder(name);
  }

  // Deal with the card expiry date
  function FormatAndSetDate(date) {
    setDate(date.split(" ")[1] + "/" + date.split(" ")[0].slice(2, 4));
  }

  // Deal with the card cvv
  function FormatAndSetCardCvv(cvv) {
    // Remove all non-digit characters
    cvv = cvv.replace(/\D/g, "");

    // cut the cvv to 3 digits
    if (cvv.length > 3) {
      cvv = cvv.slice(0, 3);
    }

    // Set the card cvv
    setCardCvv(cvv);
  }



  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        {/* Front side of card */}
        {/* ---------------- */}
        {CardFrontVisible && (
          <View style={{ padding: 25 }}>
            <View>
              <Image style={{ height: 200, width: 337, borderRadius: 10 }} source={require('./assets/Card/13.jpeg')} />

              {/* Credit card network 4 */}
              {cardNetwork === "visa" && (<Image style={{ position: "absolute", height: 50, width: 95, marginLeft: 240, marginTop: 10, resizeMode: "contain" }} source={require('./assets/Card/visa.png')} />)}
              {cardNetwork === "mastercard" && (<Image style={{ position: "absolute", height: 50, width: 95, marginLeft: 240, marginTop: 10, resizeMode: "contain" }} source={require('./assets/Card/mastercard.png')} />)}
              {cardNetwork === "discover" && (<Image style={{ position: "absolute", height: 50, width: 120, marginLeft: 203, marginTop: 10, resizeMode: "contain" }} source={require('./assets/Card/discover.png')} />)}
              {cardNetwork === "amex" && (<Image style={{ position: "absolute", height: 50, width: 95, marginLeft: 225, marginTop: 10, resizeMode: "contain" }} source={require('./assets/Card/amex.png')} />)}

              {/* Chip image */}
              <Image style={{ position: "absolute", height: 50, width: 75, marginLeft: 5, marginTop: 10, resizeMode: "contain" }} source={require('./assets/Card/chip.png')} />

              <Text style={{ position: "absolute", fontSize: 20, marginLeft: 20, marginTop: 100, color: "white" }}> {cardNumber}</Text>

              <Text style={{ position: "absolute", fontSize: 10, marginLeft: 20, marginTop: 150, color: "#dbd9d3" }}>Card Holder</Text>
              <Text style={{ position: "absolute", fontSize: 15, marginLeft: 20, marginTop: 165, color: "white" }}>{cardHolder}</Text>

              <Text style={{ position: "absolute", fontSize: 10, marginLeft: 262, marginTop: 150, color: "#dbd9d3" }}>Expires</Text>
              <Text style={{ position: "absolute", fontSize: 15, marginLeft: 262, marginTop: 165, color: "white" }}>{date}</Text>
            </View>
          </View>
        )}
        {/* ---------------- */}


        {/* Back side of the card */}
        {/* ---------------- */}
        {CardBackVisible && (
          <View style={{ padding: 25 }}>
            <View>
              <Image style={{ height: 200, width: 337, borderRadius: 10 }} source={require('./assets/Card/13.jpeg')} />
              {/* Black bar */}
              <View style={{ position: "absolute", height: 35, width: 337, marginTop: 25, backgroundColor: "black" }}></View>

              <Text style={{ position: "absolute", fontSize: 15, marginLeft: 285, marginTop: 75, color: "white" }}>CVV</Text>

              {/* White bar with cvv */}
              <View style={{ position: "absolute", height: 35, width: 325, marginLeft: 5, marginTop: 100, backgroundColor: "white", borderRadius: 5 }}>
                <Text style={{ position: "absolute", fontSize: 20, marginLeft: 280, marginTop: 5, color: "black" }}>{cardCvv}</Text>
              </View>

              {/* Credit card network 4 */}
              {cardNetwork === "visa" && (<Image style={{ position: "absolute", height: 40, width: 95, marginLeft: 240, marginTop: 150, resizeMode: "contain" }} source={require('./assets/Card/visa.png')} />)}
              {cardNetwork === "mastercard" && (<Image style={{ position: "absolute", height: 40, width: 95, marginLeft: 240, marginTop: 150, resizeMode: "contain" }} source={require('./assets/Card/mastercard.png')} />)}
              {cardNetwork === "discover" && (<Image style={{ position: "absolute", height: 40, width: 120, marginLeft: 203, marginTop: 150, resizeMode: "contain" }} source={require('./assets/Card/discover.png')} />)}
              {cardNetwork === "amex" && (<Image style={{ position: "absolute", height: 40, width: 95, marginLeft: 225, marginTop: 150, resizeMode: "contain" }} source={require('./assets/Card/amex.png')} />)}

            </View>
          </View>
        )}
        {/* ---------------- */}

      </View>


      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', border:5, borderColor:"black" }}>
        <Formik
          initialValues={{ cardNumber_: '', cardHolderName: '', cardExpiry: '', cardCvv: '' }}

          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // Remove all "{} and " from the alert
              alert(JSON.stringify(values, null, ' ').replace(/,/g, '\n').replace(/"/g, '').replace(/{/g, '').replace(/}/g, ''));
           
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ handleBlur, handleChange, handleSubmit, values }) => (
            <View >
              {/* Card Number */}
              <Text style={{ position: "relative", fontSize: 15, marginLeft: 5, marginTop: 20, color: "gray" }}>Card Number</Text>
              <View style={{ borderWidth: 1, borderRadius: 10, }}>
                <TextInput style={{ height: 40, width: 200, borderColor: 'gray', marginLeft: 5, marginRight: 10 }}
                  onChangeText={text => {
                    FormatAndSetCardNumber(text); values.cardNumber_ = text
                  }}

                  value={values.cardNumber_}
                  placeholder="0000 0000 0000 0000"
                  keyboardType="number-pad"
                  onFocus={() => {
                    setCardBackVisible(false)
                    setCardFrontVisible(true)
                  }}
                />
              </View>

              {/* Name */}
              <Text style={{ position: "relative", fontSize: 15, marginLeft: 5, marginTop: 10, color: "gray" }}>Name</Text>
              <View style={{ marginBottom: 15, borderWidth: 1, borderRadius: 10, }}>
                <TextInput
                  style={{ height: 40, width: 200, borderColor: 'gray', marginLeft: 5, marginRight: 10 }}
                  onChangeText={text => { FormatAndSetCardHolder(text); values.cardHolderName = text }}
                  value={values.cardHolderName}
                  onFocus={() => {
                    setCardBackVisible(false)
                    setCardFrontVisible(true)
                  }}
                />
              </View>

              <View style={{flexDirection: "row", alignContent:"space-between", marginBottom:10}}>
                {/* Expiry */}
                <View style={{flex: 1, height:63, justifyContent:"center"}}>
                <Text style={{ position: "relative", fontSize: 15, color: "gray", marginLeft: 5 }}>Expiry</Text>
                <View style={{ height: 5, width: 100, flex: 1, borderWidth: 1, borderRadius: 10,marginTop:5 }}>

                  <Pressable
                    style={{  }}
                    onPress={() => {
                      setModalVisible(!modalVisible)
                      setCardBackVisible(false)
                      setCardFrontVisible(true)
                    }}
                  >
                    <Text style={{marginTop:5, marginLeft:5}}> {date} </Text>
                  </Pressable>

                  {/* ------------------------ */}
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      setModalVisible(!modalVisible);
                     
                    }}
                  >
                    <View style={styles.modalView}>

                      <DatePicker
                        mode="monthYear"
                        selectorStartingYear={2022}
                        onMonthYearChange={selectedDate =>{ 
                          FormatAndSetDate(selectedDate)
                        }
                        }
                      />
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          setModalVisible(!modalVisible)
                          values.cardExpiry=date
                        }}
                      >
                        <Text style={styles.textStyle}>Confirm</Text>
                      </Pressable>
                    </View>
                  </Modal>
                </View>
                </View>
                {/* --------------- */}

                {/* CSV */}
                <View style={{flex: 1, marginLeft:55}}>

                <Text style={{ position: "relative", fontSize: 15, marginLeft: 5, color: "gray" }}>CSV</Text>
                <View style={{height: 35, width: 75, marginBottom: 15, borderWidth: 1, borderRadius: 10,marginTop:5 }}>
                  <TextInput
                    style={{ height: 30, width: 100, borderColor: 'gray', marginLeft: 5, marginRight: 10 }}
                    onChangeText={text => { FormatAndSetCardCvv(text); values.cardCvv = text }}
                    value={cardCvv}
                    placeholder="000"
                    keyboardType="number-pad"
                    onFocus={() => {
                      setCardBackVisible(true)
                      setCardFrontVisible(false)
                    }}

                  />
                </View>
              </View>
              </View>

              <Button
                onPress={handleSubmit}
                title="Submit"
              />
            </View>
          )}

        </Formik>
      </View>
    </View>
  );
}

//style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25
  },

  modalView: {
    margin: 1,
    marginTop: 305,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },

});










