import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  ScrollView,
  AsyncStorage,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ColorDotsLoader } from 'react-native-indicator';
//import * as nominatim from 'nominatim-geocode';

const Reporting = (props) => {
  const [rainIntensityVal, setRainIntensityVal] = useState(0);
  const [filename, setFileName] = useState(0);
  const [description, setDescription] = useState("");
  const [floodLevelVal, setFloodLevelVal] = useState(null);
  const [rainIntensityText, setRainIntensityText] = useState("No Rain");
  const [floodLevelText, setFloodLevelText] = useState("No Flood");
  const [textInputplaceholder, setTextInputplaceholder] = useState("Add description here");
  const [dispLat, setDispLat] = useState(0);
  const [dispLong, setDispLong] = useState(0);
  const [accR, setAccR] = useState("Analyzing . . .");
  const [showLoading, setShowLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [colorNR, setColorNR] = useState("white");
  const [colorLR, setColorLR] = useState("white");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAlertVisible, setModalAlertVisible] = useState(false);
  const [modalGraphicDescriptionVisible, setModalGraphicDescriptionVisible] = useState(false);
  const [modalAlertName, setModalAlertName] = useState("");
  const [modalAlertDescription, setModalAlertDescription] = useState("");
  const [locName, setLocName] = useState(" Location is loading . . . ");
  const [modalAlertReportVisible, setModalAlertReportVisible] = useState(false);
  const [imageDescription, setImageDescription] = useState("");
 
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;
    //console.log('Your current position is:');     //console.log(`Latitude : ${crd.latitude}`);     //console.log(`Longitude: ${crd.longitude}`);     //console.log(`More or less ${crd.accuracy} meters.`);
    setDispLat(crd.latitude);
    setDispLong(crd.longitude);
    setAccR(crd.accuracy);
    //setShowMap(true);
    fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + crd.latitude + '&lon=' + crd.longitude + '&zoom=18&addressdetails=1')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('Your Location => ' + JSON.stringify(responseJson.display_name));
            var trial = JSON.stringify(responseJson.display_name);
            setLocName(trial.replace(/['"]+/g, ''));
    })
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const introAlert = () =>
    Alert.alert(
      "You are now in Reporting!",
      "Your Location is: Latitude : " + dispLat + ", Longitude: " + dispLong,
      [{ text: "Okay", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );

  const updateMyLoc = () => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  changeOne = () => {
    setRainIntensityVal(0);
    setRainIntensityText("No Rain");
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeTwo = () => {
    setRainIntensityVal(1.25);
    setRainIntensityText("Light Rain");
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeThree = () => {
    setRainIntensityVal(2.5);
    setRainIntensityText("Medium Rain");
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeFour = () => {
    setRainIntensityVal(7.5);
    setRainIntensityText("Heavy Rain");
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeFive = () => {
    setRainIntensityVal(10);
    setRainIntensityText("Intense Rain");
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeSix = () => {
    setRainIntensityVal(15);
    setRainIntensityText("Torrential Rain");
    console.log("Rain Intensity Set at: " + rainIntensityVal);
  };

  changeOneF = () => {
    setFloodLevelVal(0);
    setFloodLevelText("No Flood");
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeTwoF = () => {
    setFloodLevelVal(25);
    setFloodLevelText("Ankle Deep");
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeThreeF = () => {
    setFloodLevelVal(50);
    setFloodLevelText("Knee Deep");
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeFourF = () => {
    setFloodLevelVal(75);
    setFloodLevelText("Waist Deep");
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeFiveF = () => {
    setFloodLevelVal(100);
    setFloodLevelText("Neck Deep");
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeSixF = () => {
    setFloodLevelVal(125);
    setFloodLevelText("Above Head Deep");
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeSevenF = () => {
    setFloodLevelVal(150);
    setFloodLevelText("1 Storey High");
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeEightF = () => {
    setFloodLevelVal(175);
    setFloodLevelText("1.5 Storey High");
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  changeNineF = () => {
    setFloodLevelVal(200);
    setFloodLevelText("2 Storeys or Higher");
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  //Reset
  resetValue = () => {
    floodLevelVal = -1;
    rainIntensityVal = -1;
    console.log("Rain Intensity Set at: " + rainIntensityVal);
    console.log("Flood Level Set at: " + floodLevelVal);
  };

  const getLoc = () => {
    fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + dispLat + '&lon=' + dispLong + '&zoom=18&addressdetails=1')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('Your Location => ' + JSON.stringify(responseJson.display_name));
            var trial = JSON.stringify(responseJson.display_name);
            setLocName(trial.replace(/['"]+/g, ''));
            console.log(trial.replace(/['"]+/g, ''));
  })
  }  

  const LRainAlert = () =>{
    setModalAlertName("Light rain description:");
    setModalAlertDescription("Individual drops easily identified and puddles form slowly. Small streams may flow in gutters. \n\nDriver doesn't need the wiper to be working to see the road.");
    setImageDescription("LRain");
    setModalAlertVisible(true);
    changeTwo();
  }
    
    /*Alert.alert(
      "Light rain description:",
      "Scattered drops that do not completely wet an exposed surface regardless of duration.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeTwo() },
      ],
      { cancelable: false }
    );*/

  const MRainAlert = () => {
    setModalAlertName("Medium rain description:");
    setModalAlertDescription("From scattered drops that, regardless of duration, do not completely wet an exposed surface up to a condition where individual drops are easily seen. \n\nWiper must be set at intermittent to see the road.");
    setImageDescription("MRain");
    setModalAlertVisible(true);
    changeThree();
  }
    /*Alert.alert(
      "Medium rain description",
      "Individual drops easily identified and puddles(small muddy pools) form slowly. Small streams may flow in gutters.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeThree() },
      ],
      { cancelable: false }
    );*/

  const HRainAlert = () => {
    setModalAlertName("Heavy rain description:");
    setModalAlertDescription("Individual drops are not clearly identifiable. Spray is observable just above pavements and other hard surfaces. \n\nWiper must be slow and continuous to see the road.");
    setImageDescription("HRain");
    setModalAlertVisible(true);
    changeFour();
  }
    /*Alert.alert(
      "Heavy rain description",
      "Puddles rapidly forming and down pipes flowing freely.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeFour() },
      ],
      { cancelable: false }
    );*/

  const TRainAlert = () => {
    setModalAlertName("Torrential rain description:");
    setModalAlertDescription("Strongest downpour of rain and may persist for hours. \n\nEven with fast and continuous wiper speed, the driver will not be able to see the road.");
    setImageDescription("TRain");
    setModalAlertVisible(true);
    changeSix();
  }
    /*Alert.alert(
      "Torrential rain description",
      "Strongest downpour of rain and may persist for hours.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeSix() },
      ],
      { cancelable: false }
    );*/

  const EHRainAlert = () => {
    setModalAlertName("Intense rain description:");
    setModalAlertDescription("Rain seemingly falls in sheets. Individual drops are not identifiable. Heavy spray to height of several inches is observed over hard surfaces.\n\nWiper must be fast and continuous to see the road.");
    setImageDescription("IRain");
    setModalAlertVisible(true);
    changeFive();
  }
    /*Alert.alert(
      "Extremely heavy rain description",
      "The sky is overcast, there is a continuous precipitation. Falls in sheets, misty spray over hard surfaces.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeFive() },
      ],
      { cancelable: false }
    );*/

  const ADeepAlert = () => {
    setModalAlertName("Ankle deep description:");
    setModalAlertDescription("Flood is around 0.25 meters high. \n\nPassable to all types of vehicles.");
    setImageDescription("floodLevel");
    setModalAlertVisible(true);
    changeTwoF();
  }
    /*Alert.alert(
      "Ankle deep description",
      "Flood is around 0.25 meters high. Passable to all types of vehicles.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeTwoF() },
      ],
      { cancelable: false }
    );*/

  const KDeepAlert = () => {
    setModalAlertName("Knee deep description:");
    setModalAlertDescription("Flood is around 0.5 meters high. \n\nNot Passable to light vehicles.");
    setImageDescription("floodLevel");
    setModalAlertVisible(true);
    changeThreeF();
  }
    /*Alert.alert(
      "Knee deep description",
      "Flood is around 0.5 meters high. Not Passable to light vehicles. ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeThreeF() },
      ],
      { cancelable: false }
    );*/

  const WDeepAlert = () => {
    setModalAlertName("Waist deep description:");
    setModalAlertDescription("Flood is threatening, around 1 meter high. \n\nNot passable to all types of vehicles.");
    setImageDescription("floodLevel");
    setModalAlertVisible(true);
    changeFourF();
  }
    /*Alert.alert(
      "Waist deep description",
      "Flood is threatening, around 1 meter high. Not passable to all types of vehicles. ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeFourF() },
      ],
      { cancelable: false }
    );*/

  const AWDeepAlert = () => {
    setModalAlertName("Neck deep description:");
    setModalAlertDescription("Serious flooding expected in low lying areas. \n\nNot passable to all types of vehicles.");
    setImageDescription("floodLevel");
    setModalAlertVisible(true);
    changeFiveF();
  }
    /*Alert.alert(
      "Neck deep description",
      "Serious flooding expected in low lying areas. Not passable to all types of vehicles. ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeFiveF() },
      ],
      { cancelable: false }
    );*/

    const ANDeepAlert = () => {
      setModalAlertName("Above head deep description:");
      setModalAlertDescription("Flood level is above critical level. Flood Level is between 1.6 to 2 meters high. \n\nNot passable to all types of vehicles.");
      setImageDescription("floodLevel");
      setModalAlertVisible(true);
      changeSixF();
    }
    /*Alert.alert(
      "Above head deep description",
      "Flood level is above critical level. Flood Level is between 1.6 to 2 meters high. Not passable to all types of vehicles. ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeSixF() },
      ],
      { cancelable: false }
    );*/

    const OSDeepAlert = () => {
      setModalAlertName("One storey high description:");
      setModalAlertDescription("Flood level is between 2 to 3 meters high. \n\nNot passable to all types of vehicles.");
      setImageDescription("floodLevel");
      setModalAlertVisible(true);
      changeSevenF();
    }
    /*Alert.alert(
      "One storey high description",
      "Flood level is between 2 to 3 meters high. Not passable to all types of vehicles. ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeSevenF() },
      ],
      { cancelable: false }
    );*/

    const OFSDeepAlert = () => {
      setModalAlertName("1.5 Storey high description:");
      setModalAlertDescription("Flood level is between 3 to 4.5 meters high. \n\nNot passable to all types of vehicles.");
      setImageDescription("floodLevel");
      setModalAlertVisible(true);
      changeEightF();
    }
    /*Alert.alert(
      "1.5 Storey high description",
      "Flood level is between 3 to 4.5 meters high . Not passable to all types of vehicles. ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeEightF() },
      ],
      { cancelable: false }
    );*/

    const TSDeepAlert = () => {
      setModalAlertName("Two storeys high description:");
      setModalAlertDescription("Flood level is 4.5 meters high. \n\nNot passable to all types of vehicles.");
      setImageDescription("floodLevel");
      setModalAlertVisible(true);
      changeNineF();
    }
    /*Alert.alert(
      "Two storeys high description",
      "Flood level is 4.5 meters high. Not passable to all types of vehicles. ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Report", onPress: () => changeNineF() },
      ],
      { cancelable: false }
    );*/

    const modalAlertReport = () => {
      setModalAlertReportVisible(true);
    }
  

  const alertUserReport = () => {
    Alert.alert(
      "Report Now",
      "You are about to report this information \nAddress: " +
        locName +
        "\n\n\n\nRain Intensity: " +
        rainIntensityText +
        "\n\nFlood Level: " +
        floodLevelText +
        "\n\nDescription: " + 
        description + 
        "\n\nImage: " + 
        image,

      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Report",
          onPress: () => isUserLogged(),
        },
      ],
      { cancelable: false }
    );
  };

  const alertUserLogin = () => {
    setModalAlertReportVisible(false);
    Alert.alert(
      "You cannot report without an account!",
      "Tap Login to continue. Tap Cancel if you want to cancel reporting." ,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Login",
          onPress: () => {props.navigation.navigate("Login")},
        },
      ],
      { cancelable: false }
    );
  };

  const isUserLogged = async () => {
    let token = await AsyncStorage.getItem("token");
    if(token == null){
      alertUserLogin();
    }
    else{
      reportUserReport();
    }
  }

  const reportUserReport = async () => {
    setShowLoading(true);
    let token = await AsyncStorage.getItem("token");
    let formdata = new FormData();
    formdata.append("latitude", dispLat);
    formdata.append("longitude", dispLong);
    formdata.append("rainfall_rate", rainIntensityVal);
    formdata.append("flood_depth", floodLevelVal);
    formdata.append("description", description);
    formdata.append("address", locName);
    if (image !== null) {
      let match = /\.(\w+)$/.exec(filename);
      let type1 = match ? `image/${match[1]}` : `image`;
      let fileType = image.substring(image.lastIndexOf(".") + 1);
      console.log("Filename: " + filename);
      console.log("Filetype: " + fileType);
      formdata.append("image", {
        uri: image,
        name: filename,
        type: `image/${fileType}`,
      });
    }
    console.log("Formdata: " + formdata);
    
    fetch("https://rainflow.live/api/report/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
          //console.log("Error: " + response)
        }
        
        //alert("Report submitted! Thank you");
        console.log(response.json().then((data) => console.log(data)));
      })
      .catch((error) => {
        console.log("ERROR: " + error);
      });
      setTimeout(function(){
        setShowLoading(false);
        setImage(null);
        setDescription("");
        setFloodLevelVal(0);
        setFloodLevelText("No Flood");
        setRainIntensityVal(0);
        setRainIntensityText("No Rain");
        setModalAlertReportVisible(false);
        setTextInputplaceholder("Add description here");
        
        alert("Report submitted! Thank you");
      }, 500);
    
    console.log("Fetch Done");
    
    
    //setRainIntensityVal(3);
    //setFloodLevelVal(3);
  };

  const checkIfNoReport = () => {
    if (rainIntensityVal == null && floodLevelVal == null) {
      alert("Missing rain intensity and flood level data to be reported");
    } else if (rainIntensityVal == null) {
      alert("Missing rain intensity data to be reported");
    } else if (floodLevelVal == null) {
      alert("Missing flood level data to be reported");
    } else {
      modalAlertReport();
    }
  };

  const [image, setImage] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    console.log("At Pick Image");
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      // maxWidth: 500,
      // maxHeight: 500,
      // aspect: [1, 1],
      quality: 0.1,
    });

    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   // allowsEditing: true,
    //   // aspect: [4, 3],
    //   quality: 1,
    // });

    console.log(result);
    setShowImage(true);

    if (!result.cancelled) {
      setImage(result.uri);
      setFileName(result.uri.split("/").pop());
    }
  };

  const closeImageViewer = () => {
    setModalGraphicDescriptionVisible(!modalGraphicDescriptionVisible);
    setModalAlertVisible(!modalAlertVisible)
    setImageDescription("");
  };

  return (
    <ScrollView style={{height: "100%"}} persistentScrollbar={true}>

<View style={styles.userHeader}>
<Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            paddingTop: 30,
            fontSize: 30,
          }}
        >
          REPORTING
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            paddingBottom: 0,
          }}
        >
          ({locName}){"\n"}
          {/* Accuracy: {accR} meters. {"\n"} */}
          
        </Text>
          </View>
    
      <View style={styles.contentContainer}>
        
        

        
        
        {showMap ? (
            
            /*<MapView
            initialRegion={{
            latitude: dispLat,
            longitude: dispLong,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421,
            }}
            style={{width: "100%", height: 150}}
          >
            <Marker 
            coordinate={{
              latitude: dispLat,
              longitude: dispLong,
            }}
            >
              
            </Marker>
          </MapView>*/
          <View />
          ) : null}

                     {/*Rain Intensity START*/}
        {showLoading ? (
            <View style = {styles.loadingContainer}>
            <ColorDotsLoader size = {30} color1 = {"#4FC69A"} color2 = {"#1EA78C"} color3 = {"#0E956A"} /> 
            <Text style = {{fontWeight: "bold", color : "black"}}>Loading</Text>       
            </View>
          ) : null}


      <View style={styles.sLine}>
      <Text
          style={{
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          RAIN INTENSITY 
        </Text>

        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
            
          }}
        >
          (Currently Selected: { rainIntensityText } )
        </Text>
      </View>
        
      <View style = {{paddingBottom: 10, width: 325}}>
        <ScrollView
          horizontal = {true}
          showsHorizontalScrollIndicator={true}
          persistentScrollbar={true}
        >
          <View style={styles.overView}>
          <TouchableOpacity
            style={styles.choiceContainer}
            onPress={() => changeOne()}
          >
            <Text style={{ color: "#00ae4d", fontWeight: "bold" }}>No Rain</Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice2Container}
            onPress={() => LRainAlert()}
          >
            <Text style={{ color: "#b2d235", fontWeight: "bold" }}>
              Light Rain
            </Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice3Container}
            onPress={() => MRainAlert()}
          >
            <Text style={{ color: "#ffd100", fontWeight: "bold" }}>
              Medium Rain
            </Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice4Container}
            onPress={() => HRainAlert()}
          >
            <Text style={{ color: "#f78d1e", fontWeight: "bold" }}>
              Heavy Rain
            </Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice5Container}
            onPress={() => EHRainAlert()}
          >
            <Text style={{ color: "#ed1b39", fontWeight: "bold" }}>
              Intense Rain
            </Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice6Container}
            onPress={() => TRainAlert()}
          >
            <Text style={{ color: "#c12026", fontWeight: "bold" }}>Torrential Rain</Text>
          </TouchableOpacity>
        </View>

        </ScrollView>
      </View>

        <View style={styles.sLine}>
        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          FLOOD LEVEL 
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
            
          }}
        >
          (Currently Selected: { floodLevelText } )
        </Text>
        </View>
        
        <View style = {{paddingBottom: 10, width: 325}}>
        <ScrollView
          horizontal = {true}
          showsHorizontalScrollIndicator={true}
          persistentScrollbar={true}
        >
          <View style={styles.overView2}>
          <TouchableOpacity
            style={styles.choiceContainer2}
            onPress={() => changeOneF()}
          >
            <Text style={{ color: "#00ae4d", fontWeight: "bold" }}>No Flood</Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice2Container2}
            onPress={() => ADeepAlert()}
          >
            <Text style={{ color: "#b2d235", fontWeight: "bold" }}>
              Ankle Deep
            </Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice3Container2}
            onPress={() => KDeepAlert()}
          >
            <Text style={{ color: "#ffd100", fontWeight: "bold" }}>
              Knee Deep
            </Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice4Container2}
            onPress={() => WDeepAlert()}
          >
            <Text style={{ color: "#f78d1e", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
              Waist Deep
            </Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice5Container2}
            onPress={() => AWDeepAlert()}
          >
            <Text style={{ color: "#ed1b39", fontWeight: "bold" }}>
              Neck Deep
            </Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice6Container2}
            onPress={() => ANDeepAlert()}
          >
            <Text style={{ color: "#c12026", fontWeight: "bold" }}>Above Head Deep</Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice7Container2}
            onPress={() => OSDeepAlert()}
          >
            <Text style={{ color: "#941619", fontWeight: "bold" }}>
              1 Storey High
            </Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice8Container2}
            onPress={() => OFSDeepAlert()}
          >
            <Text style={{ color: "#7c112f", fontWeight: "bold" }}>
              1.5 Storey High
            </Text>
          </TouchableOpacity>

          <View style={styles.pads}></View>

          <TouchableOpacity
            style={styles.choice9Container2}
            onPress={() => TSDeepAlert()}
          >
            <Text style={{ color: "#5f001e", fontWeight: "bold" }}>
              2 Storeys or Higher
            </Text>
          </TouchableOpacity>

        </View>
        </ScrollView>
        </View>
        
        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          FURTHER DETAILS 
        </Text>
        
        <View style={styles.descriptionContainer}>
          <TextInput
            placeholder={textInputplaceholder}
            style={{color: "black"}}
            multiline={true}
            onChangeText={(e) => setDescription(e)}
          />
        </View>
    
    <View style={styles.pictureButtonContainer}>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => pickImage()}>
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              Take a photo
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              View Photo
            </Text>
          </TouchableOpacity>
        </View>
    </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => getLoc()}>
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
            >
              Update My Location
            </Text>
          </TouchableOpacity>
        </View>
      
        <View style={styles.buttonCancelContainer}>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => checkIfNoReport()}
          >
            <Text
              style={{ textAlign: "center", color: "black", fontWeight: "bold" }}
            >
              R E P O R T
            </Text>
          </TouchableOpacity>
        </View>

        <Modal //MODAL ALERT OI
          visible={modalAlertVisible} 
          animationType="slide"
          transparent={true} > 
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 10,}}>
            {modalAlertName}
          </Text>
          <Text style={{marginBottom: 10, textAlign: "justify"}}>
            {modalAlertDescription}
          </Text>
          
          <TouchableOpacity style={styles.buttonDescriptionModal} onPress={() => setModalAlertVisible(!modalAlertVisible)}>
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold", width: "50%"}}
            >
              CLOSE
            </Text>
          </TouchableOpacity>
          <View style={{marginBottom:10}}/>
          <TouchableOpacity style={styles.buttonDescriptionModal} onPress={() => setModalGraphicDescriptionVisible(!modalGraphicDescriptionVisible)}>
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold", width: "50%"}}
            >
              Image Description
            </Text>
          </TouchableOpacity>
        </View>
          </View>
        </Modal>

        <Modal //MODAL NA PICTURE
          visible={modalGraphicDescriptionVisible} 
          animationType="slide"
          transparent={true} >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 10,}}>
                {modalAlertName}
              </Text>
              <Text style={{fontSize: 15, marginBottom: 10,}}>
                Give about 15 seconds for the video/image to load. 
              </Text>
              { imageDescription == "floodLevel" ? (
                
                  <Image source={require("../../assets/FloodLevels.png")} style={{height:350, width:350, resizeMode: "center"}}/>
                
                ): imageDescription == "LRain"? (
                  <Image source={require("../../assets/RainIntensity-1.gif")} style={{width:350, resizeMode: "contain"}}/>
                ): imageDescription == "MRain"? (
                  <Image source={require("../../assets/RainIntensity-2.gif")} style={{width:350, resizeMode: "contain"}}/>
                ): imageDescription == "HRain"? (
                  <Image source={require("../../assets/RainIntensity-3.gif")} style={{width:350, resizeMode: "contain"}}/>
                ): imageDescription == "IRain"? (
                  <Image source={require("../../assets/RainIntensity-4.gif")} style={{width:350, resizeMode: "contain"}}/>
                ): imageDescription == "TRain"? (
                  <Image source={require("../../assets/RainIntensity-5.gif")} style={{width:350, resizeMode: "contain"}}/>
                ): null}
                <TouchableOpacity style={styles.buttonAlertModal} onPress={() => closeImageViewer() } >
                  <Text
                    style={{ textAlign: "center", color: "#fff", fontWeight: "bold", width: "50%"}}
                  >
                    CLOSE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>

        <Modal //MODAL ALERT REPROT OI
          visible={modalAlertReportVisible} 
          animationType="fade"
          transparent={true} > 
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 10,}}>
            Report Summary
          </Text>
          <Text style={{marginBottom: 10, textAlign: "justify", fontWeight: "bold"}}>
            Address: 
          </Text>
          <Text style={{marginBottom: 0, textAlign: "justify"}}>
            {locName} {"\n"} 
          </Text>
          <Text style={{marginBottom: 0, textAlign: "justify", fontWeight: "bold"}}>
            Rain Intensity: 
          </Text>
          <Text style={{marginBottom: 0, textAlign: "justify"}}>
            {rainIntensityText} {"\n"}
          </Text>
          <Text style={{marginBottom: 0, textAlign: "justify", fontWeight: "bold"}}>
            Flood Level: 
          </Text>
          <Text style={{marginBottom: 0, textAlign: "justify"}}>
            {floodLevelText} {"\n"}
          </Text>
          { description !== "" ? (
            <View>
              <Text style={{marginBottom: 0, textAlign: "justify", fontWeight: "bold"}}>
                Description: 
              </Text>
              <Text style={{marginBottom: 0, textAlign: "justify"}}>
                {description} {"\n"}
              </Text>
            </View>
          ): null}
          
          {image !== null ? (
            <View>
            <Text style={{marginBottom: 0, textAlign: "justify", fontWeight: "bold"}}>
              Image: 
            </Text>
            <View style={{marginBottom: 5}} />
            <Image
              source={{
                uri: image,
               }}
              style={{ height: 100, width: 100, alignItems: "center", paddingBottom: 20}}
            />
            </View>
          ): null}
          
         

          
         <View style={{marginBottom: 10}}>

        </View>
          <View style={{flexDirection: "row"}}>
          <TouchableOpacity style={styles.buttonAlertModal} onPress={() => setModalAlertReportVisible(!modalAlertReportVisible)}>
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold", width: "50%"}}
            >
              CLOSE
            </Text>
          </TouchableOpacity>
          <View style={{marginLeft: 10}}>

        </View>
          <TouchableOpacity style={styles.buttonAlertModal} onPress={() => isUserLogged()}>
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold", width: "50%"}}
            >
              REPORT
            </Text>
          </TouchableOpacity>
          </View>
        </View>
          </View>
          
          
        </Modal>
        
        <Modal 
          visible={modalVisible} 
          animationType="slide"
          transparent={false} 
          >
            <Text style={{textAlign: "center", alignItems: "center", justifyContent: "center", fontWeight: "bold", paddingTop: 55, paddingBottom: 20}}>
              Image to upload:
            </Text>
            <View style={{ alignItems: "center"}}>
        <Image
          source={{
            uri: image,
          }}
          style={{ height: 350, width: 350, alignItems: "center", paddingBottom: 20}}
        />
        </View>
          
          <View style={styles.buttonContainerModal}>
          <TouchableOpacity style={styles.buttonModal} onPress={() => setModalVisible(!modalVisible)}>
            <Text
              style={{ textAlign: "center", color: "#fff", fontWeight: "bold", width: "50%"}}
            >
              Close Image Viewer
            </Text>
          </TouchableOpacity>
        </View>
            
          
        </Modal>
      </View>
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? 10 : 0,
  },

  pictureButtonContainer: {
    paddingTop: 20,
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  userHeader: {
    flexDirection: "column", 
    width: "100%", 
    backgroundColor: "#47b28a", 
    height: 190, 
    justifyContent: "center", 
    alignItems: "center", 
  },

  loadingContainer: {
    flex: 1, 
    height: "100%", 
    width: "100%",
    flexDirection: "column", 
    alignItems: "center", 
    //justifyContent: "center", 
    position: "absolute",
    paddingTop: 150,
   },

  contentContainer: {
    flex: 1,
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingTop: Platform.OS === "android" ? 0 : 0,
  },

  reportcontentContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },

  pads: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 3,
    paddingRight: 3,
  },

  choiceContainer: {
    width: 75,
    height: 55,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#00ae4d",
  },

  choice2Container: {
    width: 75,
    height: 55,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#b2d235",
    paddingLeft: 3,
    paddingRight: 3,
  },

  choice3Container: {
    width: 75,
    height: 55,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#ffd100",
    paddingLeft: 2,
  },

  choice4Container: {
    width: 75,
    height: 55,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#f78d1e",
    paddingLeft: 0,
  },

  choice5Container: {
    width: 75,
    height: 55,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#ed1b39",
    paddingLeft: 0,
  },

  choice6Container: {
    width: 75,
    height: 55,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#c12026",
    paddingLeft: 1,
  },

  choice7Container: {
    width: 60,
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#941619",
    paddingLeft: 3,
  },

  choice8Container: {
    width: 60,
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#7c112f",
    paddingLeft: 3,
  },

  choice9Container: {
    width: 60,
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#5f001e",
    paddingLeft: 3,
  },

  choiceContainer2: {
    width: 75,
    height: 55,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#00ae4d",
  },

  choice2Container2: {
    width: 75,
    height: 55,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#b2d235",
    paddingLeft: 3,
    paddingRight: 3,
  },

  choice3Container2: {
    width: 75,
    height: 55,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#ffd100",
    paddingLeft: 1,
  },

  choice4Container2: {
    width: 75,
    height: 55,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#f78d1e",
    paddingLeft: 0  ,
  },

  choice5Container2: {
    width: 75,
    height: 55,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#ed1b39",
    paddingLeft: 1,
  },

  choice6Container2: {
    width: 75,
    height: 55,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#c12026",
    paddingLeft: 3,
  },

  choice7Container2: {
    width: 75,
    height: 55,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#941619",
    paddingLeft: 3,
  },

  choice8Container2: {
    width: 75,
    height: 55,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#7c112f",
    paddingLeft: 3,
  },

  choice9Container2: {
    width: 75,
    height: 55,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#5f001e",
    paddingLeft: 3,
  },

  rbuttonContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  logoContainer: {
    flex: 1.5,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#434343",
    paddingBottom: 0,
  },

  overView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
  },

  overView2: {
    //width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
  },

  button: {
    width: "80%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#1EA78C",
  },

  buttonModal: {
    width: "70%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#1EA78C",
  },

  buttonAlertModal: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#1EA78C",
  },

  buttonDescriptionModal: {
    width: 200,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#1EA78C",
  },

  buttonCancel: {
    width: "80%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#1EA78C",
  },
  descriptionContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 15,
    borderWidth: 1,
    paddingTop: 0,
    paddingBottom: 5,
    paddingHorizontal: 5,
    
  },

  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 5,
    paddingTop: 0,
    paddingBottom: 10,
  },

  buttonContainerModal: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 5,
    paddingTop: 200,
    paddingBottom: 20,
  },


  buttonCancelContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 5,
    paddingTop: 0,
    paddingBottom: 20,
  },

  sLine: {
    borderBottomWidth: 0.5, 
    borderBottomColor: "#bcbcbc", 
    paddingVertical: 10,
    paddingBottom: 5,
  },
  
  
});

export default Reporting;
