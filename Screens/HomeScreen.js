/**
 * Created by MercedesLo on 2018-06-02.
 */
import React from 'react';
import { StyleSheet, Text, View, Platform, Button, Modal, TextInput, Picker, PickerItem, Alert, TouchableOpacity, Image, Dimensions, ImageBackground, ScrollView } from 'react-native';
const uuid = require('uuid/v4');
import calculate from '../calculation'
export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)

    this.state = {
      transID: undefined,
      blind: 1,
      newBlind: 1,
      resetModalVisible: false,
      addPlayerModalVisible: false,
      editPlayerModalVisible: false,
      settingsModalVisible: false,
      stats: [{name: 'Roberto', score: 0, pay: 0, id: uuid(), active: true, deleted: false},
              {name: 'Virginia', score: 0, pay: 0, id: uuid(), active: true, deleted: false },
              {name: 'Player 3', score: 0, pay: 0, id: uuid(), active: true, deleted: false },
              {name: 'Player 4', score: 0, pay: 0, id: uuid(), active: true, deleted: false}],
      transactions : [{2: -8, 3: 8}, {0: -24, 1:-24, 2: -24, 3: 72}],
      newPlayerName : 'New Player'
    }
  }

  static getDerivedStateFromProps(props, state) {
    const {navigation} = props;
    let transaction = navigation.getParam('transaction', undefined)
    let result = state
    let newTransactions = state.transactions
    let transID = state.transID

    if (transaction) {
      console.log("transaction.entry", transaction.entry)
      if (transaction.transID == state.transID) return null;
      result = calculate(transaction, state)
      newTransactions.push(result.entry)
      transID = transaction.transID
    }

    return {...state, stats: result.stats, transactions: newTransactions, transID}
  }

  setResetModalVisible(bool) {
    this.setState({resetModalVisible: bool})
  }

  setAddPlayerModalVisible(bool) {
    this.setState({addPlayerModalVisible: bool})
  }

  setEditPlayerModalVisible(bool) {
    this.setState({editPlayerModalVisible: bool})
  }

  setSettingsModalVisible(bool) {
    this.setState({settingsModalVisible: bool})
  }

  resetAllStats() {
    let newData = [{name: 'Player 1', score:0, pay: 0 ,id: 0, active: true},
      {name: 'Player 2', score:0, pay:0, id:1, active: true },
      {name: 'Player 3', score:0, pay:0, id:2, active: true },
      {name: 'Player 4', score:0, pay:0, id:3, active: true}]
    let transactions = []
    this.setState({stats: newData, transactions})
  }

  addNewPlayer() {
    //cap player amount here?
    if (this.state.stats.length == 6) {
      Alert.alert(
        'Error',
        'Max Player is 6 ppl, remove player before adding',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      )
      return;
    }
    let id = uuid()
    let newPlayerProfile = {name: this.state.newPlayerName, pay: 0, score: 0, id, active: true}

    let newStats = this.state.stats.concat(newPlayerProfile)
    this.setState({
      stats: newStats,
      newPlayerName : "New Player",
    })
  }

  removePlayer(id) {
    //TODO: what to do when delete this player?
    Alert.alert(
      'Error',
      '刪除此玩家不會刪除之前已有的牌局紀錄，確定移除玩家?',
      [
        {text: '確定刪除', onPress: () => {
            let newPlayers = this.state.stats.map((item) => item.id == id? {...item, deleted: true} : item)
            this.setState({stats: newPlayers})
          },
        },
        {text: '取消', onPress: () => {
            return
          },
        }

      ],
      { cancelable: true }
    )
  }


  changePlayerName(id, newName) {
    if (newName == undefined || newName == '') {
      Alert.alert(
        'Error',
        '名字不能留空',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      )
      return;
    }
    let newPlayers = this.state.stats.map((item) => item.id == id? {...item, name: newName} : item)
    this.setState({stats: newPlayers})
  }

  setBlind(num){
    this.setState({blind: num})
  }


  render() {
    const {transactions, stats} = this.state
    const players = stats.filter((player) => !player.deleted).sort((a,b) => b.pay - a.pay);
    return (
      <View style={{flex:1}}>
        <ScrollView>
          <ImageBackground style={{backgroundColor: "transparent"}} source={require("../assets/images/bg.png")}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('About')}>
                <Image style={styles.hajeh} source={require('../assets/images/hajehSize.png')}/>
              </TouchableOpacity>
            </View>

            <View style={[styles.center, {marginBottom: 30}]}>
              {players.map((player,id) => <Text key={id} style={styles.text}>{player.name}: {player.score}番 {player.pay >=0 ? "贏" : "輸"} {Math.abs(player.pay)} = ${player.pay * this.state.blind}</Text>)}
            </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Step0', {players})}>
              <Image style={{}} source={require('../assets/images/eat2Size.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Record', {players, transactions})} title="出銃記錄">
              <Image  source={require('../assets/images/transactionSize.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.setResetModalVisible(!this.state.resetModalVisible)} title="重置">
              <Image   source={require('../assets/images/resetSize.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.setAddPlayerModalVisible(!this.state.addPlayerModalVisible)} title="增加玩家">
              <Image  style={{}} source={require('../assets/images/addSize.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.setEditPlayerModalVisible(!this.state.editPlayerModalVisible)} title="改變玩家名稱/移除玩家">
              <Image  style={{resizeMode: 'contain', width: Dimensions.get('window').width * 0.85}} source={require('../assets/images/changeSize.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Rules')} title="番數表">
              <Image style={{resizeMode: 'contain',}} source={require('../assets/images/chartSize.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {marginBottom: 20}]} onPress={() => this.setSettingsModalVisible(!this.state.settingsModalVisible)} title="設定">
              <Image  style={{resizeMode: 'contain'}} source={require('../assets/images/settingsSize.png')}/>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={false}
            onRequestClose={() => {this.setResetModalVisible(!this.state.resetModalVisible)}}
            visible={this.state.resetModalVisible}
            >
            <View style={styles.modalCenter}>
              <View>
                <Image style={{resizeMode: 'contain', marginVertical: 50}} source={require('../assets/images/areyousureSize.png')}/>
                <View style={styles.row}>
                  <TouchableOpacity
                    title="確定重置"
                    onPress={() => {
                      this.setResetModalVisible(!this.state.resetModalVisible)
                      this.resetAllStats()
                    }}>
                    <Image style={{resizeMode: 'contain'}} source={require('../assets/images/okSize.png')}/>
                  </TouchableOpacity>
                  <TouchableOpacity
                    title="取消"
                    onPress={() => {this.setResetModalVisible(!this.state.resetModalVisible)}}>
                    <Image style={{resizeMode: 'contain'}} source={require('../assets/images/cancelSize.png')}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={false}
            onRequestClose={() => {this.setAddPlayerModalVisible(!this.state.addPlayerModalVisible)}}
            visible={this.state.addPlayerModalVisible}>
            <View style={styles.modalCenter}>
              <View>
                <Image style={{resizeMode: 'contain', marginTop: 100}} source={require('../assets/images/addnameSize.png')}/>
                <View style={[{width: Dimensions.get('window').width * 0.8}, Platform.OS =='ios'? styles.iosTextFieldUnderline: styles.androidTextFieldUnderline ]}>
                  <TextInput
                    style={styles.textInput}
                    value={this.state.newPlayerName}
                    onChangeText={(text) => this.setState({newPlayerName: text})}>
                  </TextInput>
                </View>
                <View style={[styles.row, {marginTop: 20}]}>
                  <TouchableOpacity onPress={() => {this.setAddPlayerModalVisible(!this.state.addPlayerModalVisible)}}>
                    <Image style={{resizeMode: 'contain'}} source={require('../assets/images/cancelSize.png')}/>
                  </TouchableOpacity>
                  <TouchableOpacity
                    title ="Add"
                    onPress={() => {
                      this.setAddPlayerModalVisible(!this.state.addPlayerModalVisible)
                      this.addNewPlayer();
                    }}>
                    <Image style={{resizeMode: 'contain'}} source={require('../assets/images/okSize.png')}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>


          <Modal
            animationType="slide"
            transparent={false}
            onRequestClose={() => {this.setEditPlayerModalVisible(!this.state.editPlayerModalVisible)}}
            visible={this.state.editPlayerModalVisible}>
            <ScrollView style={[styles.modalCenter]}>
              {players.map((item,id) => <View key={id}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 30}}>
                  <Image style={{resizeMode: 'contain', height: 20, width: 40}} source={require('../assets/images/changeNameSize.png')}></Image>
                  <Text style={{fontSize: 15}}> {item.name} </Text>
                  <Image style={{resizeMode: 'contain', height: 20, width: 40}}  source={require("../assets/images/nameSize.png")}></Image>

                </View>
                <View style={[{width: Dimensions.get('window').width * 0.85}, Platform.OS =='ios'? styles.iosTextFieldUnderline: styles.androidTextFieldUnderline ]}>
                  <TextInput ref={item.id} style={[styles.textInput], {marginTop: 10}} placeholderTextColor="black" placeholder={"輸入新名字"}></TextInput>
                </View>
                <View style={[styles.row, {marginTop: 10}]}>
                  <TouchableOpacity onPress={() => this.changePlayerName(item.id, this.refs[item.id]._lastNativeText)}>
                    <Image style={{resizeMode: 'contain', width: 75}} source={require('../assets/images/saveSize.png')}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.removePlayer(item.id)}>
                    <Image style={{resizeMode: 'contain', width: 75}} source={require('../assets/images/removeSize.png')}/>
                  </TouchableOpacity>
                  </View>
              </View>)}
              <View style={{alignItems: 'center', marginTop: 30}}>
                <TouchableOpacity onPress={() => {this.setEditPlayerModalVisible(!this.state.editPlayerModalVisible)}}>
                  <Image style={{resizeMode: 'contain'}} source={require('../assets/images/backSize.png')}/>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Modal>

          <Modal
            animationType="slide"
            transparent={false}
            onRequestClose={() => {this.setSettingsModalVisible(!this.state.settingsModalVisible)}}
            visible={this.state.settingsModalVisible}>
            <View style={styles.modalCenter}>
              <View style={{alignItems: 'center'}}>
                <Image style={{resizeMode: 'contain', marginTop: 50}} source={require('../assets/images/howbigSize.png')}/>
                <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent:'center'}}>
                  <View style={Platform.OS == 'ios'? styles.iosTextFieldUnderline: styles.androidTextFieldUnderline}>
                    <TextInput
                      keyboardType={'numeric'}
                      style={[ styles.textInput, Platform.OS == 'ios'?  {fontSize: 40} : {fontSize: 25, height: 50}]}
                      value={this.state.blind.toString()}
                      onChangeText={(text) => this.setState({newBlind: text})}>
                    </TextInput>
                  </View>
                  <Image style={{resizeMode: 'contain'}} source={require('../assets/images/moneySize.png')}/>
                </View>
              </View>
              <View style={[styles.row, {marginTop: 50}]}>
                <TouchableOpacity title="Back" onPress={() => {this.setSettingsModalVisible(!this.state.settingsModalVisible)}}>
                  <Image style={{resizeMode: 'contain',width: 75}} source={require('../assets/images/backSize.png')}/>
                </TouchableOpacity>
                <TouchableOpacity title="Save" onPress={() => {
                    this.setBlind(this.state.newBlind)
                    this.setSettingsModalVisible(!this.state.settingsModalVisible);
                  }}>
                  <Image style={{resizeMode: 'contain',width: 75}} source={require('../assets/images/saveSize.png')}/>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          </ImageBackground>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
  },
  header: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
  },
  modalCenter:{
    marginTop: 20,
    paddingHorizontal: 30,
  },
  text:{
    color: '#29AB87',
    fontFamily: 'HanWangYanKai'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignSelf: 'center',
    marginVertical: 5,
  },
  hajeh: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width * 0.7,
  },
  iosTextFieldUnderline : {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    alignSelf: 'center'
  },
  androidTextFieldUnderline: {

  },
  textInput: {
    height: 40,
  }

});
