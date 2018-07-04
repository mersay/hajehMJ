/**
 * Created by MercedesLo on 2018-06-04.
 */

import React from 'react';
import { StyleSheet, Text, View, Button, ListView, TouchableOpacity, Image } from 'react-native';


export default class Step1Screen extends React.Component {
  static navigationOptions = {
    title: 'Step 1',
  }

  constructor(props) {
    super(props);

  }

  render() {
    const {navigation} = this.props;
    const players = navigation.getParam('players')
    return (
      <View style={styles.center}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Step2a', {players})}>
          <Image style={{resizeMode: 'contain'}} source={require('../assets/images/allloseSize.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('Step2b',{players})}>
          <Image style={{resizeMode: 'contain'}} source={require('../assets/images/oneloseSize.png')}/>
        </TouchableOpacity>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  background: {
    backgroundColor: "black",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center:{
    marginTop: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    alignSelf: 'center',
  },
  button: {
    marginTop: 30
  }
});/**
 * Created by MercedesLo on 2018-06-03.
 */
