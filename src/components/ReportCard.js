import React, { useState, useEffect } from 'react'
import {StyleSheet, 
        View, 
        Text, 
        TouchableOpacity } from 'react-native'

import { MaterialCommunityIcons } from "react-native-vector-icons";
import moment from 'moment'


const ReportCard = props => {
    const {createdAt, latitude, longitude, id, rain, flood, image} = props;
    const [img, setImg] = useState();
    const convertedTime = moment(createdAt).format("DD MMM YYYY (dddd) HH:mm")

    useEffect(()=>{
        if(image){
            setImg(
                <MaterialCommunityIcons
                name="camera"
                color="#3d3d3d"
                size={25}
              />
            )
        }else{
            setImg(null)
        }
    },[])


  return(
    <View style={styles.cardContainer}>
      <View style = {styles.cardContent}>
          <View style = {{flexDirection: "row", alignItems: "center", width: "100%", borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: "#BCBCBC", marginBottom: 5}}>
          <Text style = {styles.dateText}>{convertedTime}</Text>
          <View style = {{right: 0, position: "absolute"}}>
            {img}
          </View>
          </View>
          <Text>Location: [{latitude}, {longitude}]</Text>
          <View style = {{flexDirection: "row", marginTop: 5}}>
          <Text>Rain Intensity: </Text>
          <Text>{rain}</Text>
          </View>
          <View style = {{flexDirection: "row", marginTop: 5}}>
          <Text>Flood Level: </Text>
          <Text>{flood}</Text>
          </View>
          
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    backgroundColor: '#fff',
    height: 135,
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#bcbcbc",
    marginBottom: 15
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: "flex-start",
    padding: 10,
  },

  dateText: {
      //backgroundColor: "#1EA78C",
      //paddingVertical: 5,
      //paddingHorizontal: 10,
      //borderRadius: 30,
      color: "#3d3d3d",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 15
  },

  latLongText: {
      backgroundColor: "#1EA78C",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 30,
      color: "#fff",
      textAlign: "center"
  },

  rainText: {
      borderRadius: 30, 
      paddingVertical: 1, 
      paddingHorizontal: 8, 
      backgroundColor: "#1EA78C", 
      color: "#fff"},

    floodText: {
        borderRadius: 30, 
        paddingVertical: 1, 
        paddingHorizontal: 8, 
        backgroundColor: "#0E956A", 
        color: "#fff"}
})

export default ReportCard