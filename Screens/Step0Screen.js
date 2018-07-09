/**
 * Created by Merc on 2018-07-07.
 */
import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, Image } from 'react-native';
import { CheckBox } from 'react-native-elements'

export default class Step0Screen extends React.Component {
  static navigationOptions = {
    title: 'Step 0',
  }

  constructor(props) {
    super(props);
    this.state = {
      init: true,
      players: props.navigation.state.params.players
    }
  }

  checkPlayer(player) {
    let players = this.state.players
    let old = players.filter((plyer) => player.id == plyer.id)[0].active
    players.filter((plyer) => player.id == plyer.id)[0].active = !old
    this.setState({players})
  }

  submitCheck(navigation) {
    let chosenPlayers = this.state.players.filter((plyer) => plyer.active)
    if (chosenPlayers.length > 4 || chosenPlayers.length <= 1) {
      Alert.alert(
        'Error',
        'Min Player is 2 ppl, Max player is 4 ppl, please choose accordingly',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      )
      return;
    } else {
      navigation.navigate('Step1', {players: chosenPlayers})
    }
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.center, styles.background}>
        <Text>Who is playing?</Text>
        {this.state.players.map((player, id) => (
          <CheckBox key={id} style={{flex: 1, padding: 10}} onPress={() => this.checkPlayer(player)} checked={player.active} title={player.name} />))}
        <TouchableOpacity style={styles.button} onPress={() => this.submitCheck(navigation)}>
          <Image style={{resizeMode: 'contain'}} source={require('../assets/images/okSize.png')}/>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
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
});

