/**
 * Created by MercedesLo on 2018-07-07.
 */
import React from 'react';
import { StyleSheet, Text, View, VirtualizedList, FlatList, Dimensions } from 'react-native';


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

  renderItem(item) {
    let transaction = item
    let winnerName = this.state.players.filter((player) => player.id == transaction.winners[0]).map((player) => player.name)
    if (transaction.mode == 0) {
      return (<View style={styles.entry} key={transaction.transID}><Text>{winnerName} 自摸 {transaction.score} 番</Text></View>)
    } else {
      let loserName = this.state.players.filter((player) => player.id == transaction.losers[0]).map((player) => player.name)
      return (<View style={styles.entry} key={transaction.transID}><Text>{loserName} 出銃俾 {winnerName} {transaction.score.toString()} 番</Text></View>)
    }
  }

  render() {
    return (
      <View>
        <FlatList
          style={{marginTop: 30}}
          data={this.state.transactions}
          keyExtractor={(item, index) => item.transID}
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
  entry: {
    alignItems: 'center'
  }
});


