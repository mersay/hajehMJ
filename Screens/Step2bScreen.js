/**
 * Created by MercedesLo on 2018-06-04.
 */

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ListView, Image } from 'react-native';

export default class Step2bScreen extends React.Component {
  static navigationOptions = {
    title: '出銃 (2b)',
  }

  constructor(props) {
    super(props);

  }

  filterLosers(players, id) {
    return players.filter((player) => player.id != id)
  }

  render() {
    const {navigation} = this.props;
    const players = navigation.getParam('players')
    return (
      <View style={styles.center}>
        <Image style={{resizeMode: 'contain', marginBottom: 20}} source={require('../assets/images/wholoseSize.png')}/>
        {players.map((player ,id) => <TouchableOpacity key={id}
                                              style={{marginVertical:5}}
                                              value={player.id}
                                              onPress={() => navigation.navigate('Step3b', {transaction: {mode: 1, losers: [player.id], players: this.filterLosers(players, player.id)}})}>
          <Text style={styles.text}>{player.name}</Text>
        </TouchableOpacity>)}

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
});

