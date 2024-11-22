import React from "react";
import { Button } from "_atoms";
import { Text, View } from "react-native";

const Card = (props) => {
  return <View style={{borderWidth: 1,borderColor: '#000'}}>
    {Object.keys(props.data).map((item, index) => {

        return <View key={index}>
          <Text>{item}: {props.data[item]}</Text>
          <Button><Text>Editar</Text></Button>
        </View>;
      },
    )}
    <Button />
  </View>;
};

export default Card;

