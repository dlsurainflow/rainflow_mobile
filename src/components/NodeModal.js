import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, Modal, BackHandler } from 'react-native'


import { ScrollView } from 'react-native-gesture-handler'

const StepModal = props => {
    useEffect(() => {
        const backAction = () => {
            props.navigation.navigate("Make Payment")
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        
        return () => backHandler.remove();
    }, [])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
        >
            <View
                style={styles.container}
            >
                <View style={styles.modal}>
        
               
                  <ScrollView style = {{width: "100%"}}>

                    {props.children}
                  </ScrollView>
                    
                </View>
            
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        position : 'absolute',
        bottom : 0,
        height: "60%",
     
    },
    modal : {
        backgroundColor: "white",
        padding: 20,
        alignItems: "center",

        width : '100%',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    title : {
        fontSize : 17,
        fontWeight : 'bold'
    },
    passedData : {
        fontSize : 17,
        fontWeight : 'bold',
        color: "#005bde"
    },
    highFive : {
        height : 100,
        width: 100,
    }
})

export default StepModal