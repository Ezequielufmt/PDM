/*Custom Button*/
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
const Mybutton = props => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};
 
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#7EA135',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 0,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 5,
    
  },
  text: {
    paddingVertical: 30,
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'center',  
    color: '#ffffff',
  },
});
export default Mybutton;