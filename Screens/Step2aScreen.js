/**
 * Created by MercedesLo on 2018-06-04.
 */

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';


export default class Step2aScreen extends React.Component {
  static navigationOptions = {
    title: '自摸(2A)',
  }

  constructor(props) {
    super(props);

  }

  filterLosers(players, id) {
    return players.filter((player) => player.id != id).map((player) => player.id)
  }

  render() {
    const {navigation} = this.props;
    const players = navigation.getParam('players')
    return (
      <View style={styles.center}>
        <Image style={{resizeMode: 'contain', marginBottom: 20}} source={require('../assets/images/whowinSize.png')}/>
        {players.map((player, id) => (<TouchableOpacity key={id} value={player.id} style={{marginVertical: 5}}
                                              onPress={() => navigation.navigate('Step3a', {transaction: {mode: 0, winners: [player.id], losers: this.filterLosers(players, player.id)}})}>
                             <Text style={styles.text}>{player.name}</Text>
        </TouchableOpacity>))}
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
    alignItems: 'center'
  },
  text:{
    fontSize: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    alignSelf: 'center',
  }
});/**
 * Created by MercedesLo on 2018-06-03.
 */
