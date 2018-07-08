/**
 * Created by MercedesLo on 2018-07-07.
 */
import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';


export default class RecordScreen extends React.Component {
  static navigationOptions = {
    title: '出銃記錄',
  }

  constructor(props) {
    super(props);
    const { navigation } = props;
    let players = navigation.getParam('players')// .filter((item) => item.active).sort((a,b) => a.id - b.id);
    let transactions = navigation.getParam('transactions', [])
    console.log("trans", transactions)
    this.state = {
      players,
      transactions
    }
  }

  renderItem(transaction) {
    console.log("tra", transaction)
    let winnerName = this.state.players.filter((player) => player.id == transaction.winners[0])
    if (transaction.mode == 0) {
      return <View key={transaction.transID} ><Text>{winnerName} 自摸 {transaction.score} 番</Text></View>
    } else {
      let loserName = this.state.players.filter((player) => player.id == transaction.losers[0]);
      return <View key={transaction.transID} ><Text>{loserName} 出銃俾 {winnerName} {transaction.score} 番</Text></View>
    }
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.transactions}
          keyExtractor={(item, index) => item.key}
          renderItem={({item}) => this.renderItem(item)}
        />
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
  text:{
    color: "white",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    alignSelf: 'center',
  }
});


