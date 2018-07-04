/**
 * Created by MercedesLo on 2018-06-02.
 */

import React from 'react';
import { StyleSheet, Text, View, Button, ListView } from 'react-native';


export default class SharedDeviceModeScreen extends React.Component {
  static navigationOptions = {
    title: '番數表',
  }

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        ["番數","出銃","自摸每位","合共收"], [3, 16, 8, 24], [4, 32, 16, 48], [5, 48, 24, 72], [6, 64, 32, 96], [7, 96, 64, 192], [8, 128, 72, 216], [9, 192, 96, 288], [10, 256, 128, 384]]
      )};
  }

  render() {
    return (
      <ListView
        style= {styles.center}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <View style={styles.row}>
          <Text>{rowData[0]}</Text>
          <Text>{rowData[1]}</Text>
          <Text>{rowData[2]}</Text>
          <Text>{rowData[3]}</Text>
        </View>}
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
});