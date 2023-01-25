import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView, StatusBar, Dimensions } from "react-native";


const Item = (props) => {
    return (
      <TouchableOpacity
        onPress={ props.onPress }
      >
      <Text>
        {props.label}
      </Text>
      <Text>
        {props.description}
      </Text>
     </TouchableOpacity>
    )
}

export default Item;