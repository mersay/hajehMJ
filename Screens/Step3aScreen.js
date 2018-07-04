/**
 * Created by MercedesLo on 2018-06-04.
 */

import React from 'react';
import { StyleSheet, Text, View, Platform, ListView, Picker, Image, TouchableOpacity } from 'react-native';
const uuidv4 = require('uuid/v4');

export default class Step3aScreen extends React.Component {
  static navigationOptions = {
    title: 'Step 3a',
  }

  constructor(props) {
    super(props);

    this.state = {
      score: 3,
      transID: null,
    }
  }


  componentDidMount() {
    this.setState({transID: uuidv4()})
  }


  render() {
    const {navigation} = this.props;
    const transaction = navigation.getParam('transaction')
    return (
      <View style={styles.center}>
        <Image style={{resizeMode: 'contain', marginBottom: 20}} source={require('../assets/images/howmanySize.png')}/>
        <View>
          <Picker
            selectedValue={this.state.score}
            style={Platform.OS == 'ios'? styles.iosPicker: styles.androidPicker}
            onValueChange={(itemValue, itemIndex) => this.setState({score: itemValue})}>
            <Picker.Item label={"1"} value={1} />
            <Picker.Item label={"2"} value={2} />
            <Picker.Item label={"3"} value={3} />
            <Picker.Item label={"4"} value={4} />
            <Picker.Item label={"5"} value={5} />
            <Picker.Item label={"6"} value={6} />
            <Picker.Item label={"7"} value={7} />
            <Picker.Item label={"8"} value={8} />
            <Picker.Item label={"9"} value={9} />
            <Picker.Item label={"10"} value={10} />
          </Picker>
        </View>
        <TouchableOpacity title="Save"
                          onPress={() => navigation.navigate('Home', {transaction: {...transaction, transID: this.state.transID, score: this.state.score}})}>
          <Image style={{resizeMode: 'contain',  alignSelf: 'center'}} source={require('../assets/images/saveSize.png')}/>
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
  },
  iosPicker: { height: 50, width: 300, marginBottom: 200},
  androidPicker: {

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    alignSelf: 'center',
  }
});
/**
 * Created by MercedesLo on 2018-06-04.
 */
