/**
 * Created by MercedesLo on 2018-06-02.
 */

import React from 'react';
import { StyleSheet, Text, View, Button, ListView, Dimensions } from 'react-native';


export default class TransactionScreen extends React.Component {
  static navigationOptions = {
    title: '出銃記錄',
  }

  constructor(props) {
    super(props);
  }

  renderRow(rowData) {
    return (
      <View style={styles.row}>
        {rowData.map((data, id) => <View key={id} style={{width: Dimensions.get('window').width * 0.1}}><Text>{data}</Text></View>)}
      </View>
    )
  }

  //TODO: only show active players/ OR all ? filter

  render() {
    const { navigation } = this.props;
    let players = navigation.getParam('players').filter((item) => item.active).sort((a,b) => a.id - b.id);
    let transactions =  navigation.getParam('transactions', [])
    let results = []
    for (let transaction of transactions) {
      let entry = []
      for (let player of players) {
        entry[player.id] = transaction[player.id]? transaction[player.id] : 0
      }
      results.push(entry)
    }
    let names = players.map((player) => player.name) //order by id
    let finalRecord = [names].concat(results)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = ds.cloneWithRows(finalRecord)

    return (
      <ListView
        style= {styles.center}
        dataSource={data}
        renderRow={(rowData) => this.renderRow(rowData)}
      />
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
});/**
 * Created by MercedesLo on 2018-06-03.
 */
