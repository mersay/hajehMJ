/**
 * Created by MercedesLo on 2018-06-04.
 */

import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StyleSheet, Text, View, Platform, ScrollView, Picker, Image, TouchableOpacity } from 'react-native';
const uuidv4 = require('uuid/v4');

export default class Step3bScreen extends React.Component {
  static navigationOptions = {
    title: '出銃 (3b) ',
  }

  constructor(props) {
    super(props);

    this.state = {
      score1: 1,
      score2: 1,
      winner1: 0,
      winner2: 0,
      transID: null,
      twoWinners: false,
    }
  }

  componentDidMount() {
    this.setState({transID: uuidv4()})
  }

  showOneMoreWinner() {
    //this.setState({twoWinners: true})
  }

  backOneMoreWinner() {
    //this.setState({twoWinners: false})
  }

  setWinner(id, type) {
    type == 1? this.setState({winner1: id}): this.setState({winner2: id})
  }

  render() {
    const {navigation} = this.props;
    const transaction = navigation.getParam('transaction')
    const players = transaction.players.filter((player) => player.id != transaction.loser)
    return (
      <View style={styles.center}>
        <View>
          <Image style={{resizeMode: 'contain'}} source={require('../assets/images/whowinSize.png')}/>
          <Picker selectedValue={this.state.winner1}
                  style={Platform.OS == 'ios'? styles.iosPicker: styles.androidPicker}
                  onValueChange={(itemValue, itemIndex) => this.setState({winner1: itemValue})}>
          {players.map((player ,id) => <Picker.Item key={id} label={player.name} value={player.id} onPress={() => this.setWinner(player.id, 1)}/>)}
          </Picker>
        </View>
        <View style={Platform.OS === 'ios'? {marginTop: 150}: {marginTop: 50}}>
          <Image style={{resizeMode: 'contain', marginBottom: 10}} source={require('../assets/images/howmanySize.png')}/>
          <Picker selectedValue={this.state.score1} style={Platform.OS == 'ios'? styles.iosPicker: styles.androidPicker} onValueChange={(itemValue, itemIndex) => this.setState({score1: itemValue})}>
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

        {this.state.twoWinners &&
          <View style={styles.part}>
            <View>
              <View style={styles.row}>
                <Image style={{resizeMode: 'contain'}} source={require('../assets/images/whowinSize.png')}/>
              </View>
              <Picker selectedValue={this.state.winner2} style={{ height: 10, width: 100 }} onValueChange={(itemValue, itemIndex) => this.setState({winner2: itemValue})}>
                {transaction.players.map((player ,id) => <Picker.Item key={id}
                                                        label={player.name}
                                                        value={player.id}
                                                        onPress={() => this.setWinner(player.id, 2)}/>)}
              </Picker>
            </View>
            <View style={Platform.OS === 'ios'? {marginTop: 200}: {}}>
              <Text>幾多番?</Text>
              <Picker selectedValue={this.state.score2} style={{ height: 10, width: 100 }} onValueChange={(itemValue, itemIndex) => this.setState({score2: itemValue})}>
                <Picker.Item style={{height: 20}} label={"1"} value={1} />
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
          </View>
        }
        <View style={[styles.row, {marginTop: 180, justifyContent: 'center'}]}>
          <TouchableOpacity onPress={() => navigation.navigate('Home',
            {transaction : {...transaction,
              twoWinners: this.state.twoWinners,
              transID: this.state.transID,
              winners: [this.state.winner1], //, this.state.winner2],
              score: this.state.score1 }})}> // there was this.state.score2 in an array too
            <Image source={require('../assets/images/saveSize.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  background: {
  },
  center:{
    marginTop: 20,
    paddingHorizontal: 30,
  },
  iosPicker: {height: 20, marginTop: -20, marginBottom: 40},
  androidPicker: {
    marginVertical: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  part: {
    marginTop: 200,
  }
});
/**
 * Created by MercedesLo on 2018-06-04.
 */
