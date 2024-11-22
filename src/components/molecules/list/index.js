import React from 'react';
import { FlatList } from "react-native";

const List = ({data, renderItem, ...props}) =>{

  return <FlatList {...props} data={data} renderItem={renderItem}/>
}

export default List;
