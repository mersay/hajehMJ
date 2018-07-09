/**
 * Created by MercedesLo on 2018-06-29.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class AboutScreen extends React.Component {
  static navigationOptions = {
    title: 'About',
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Version 0.2</Text>
        <Text>不設一炮雙響，接受三人麻雀玩法</Text>
        <Text>3番起糊</Text>
        <Text>Hajeh Productions 2018. All Rights Reserved</Text>
      </View>
    );
  }

}


const styles = StyleSheet.create({

});/**
 * Created by MercedesLo on 2018-06-03.
 */
