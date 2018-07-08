/**
 * Created by MercedesLo on 2018-06-05.
 */
import scale from './scale'
export default function calculate (transaction, state, wins) {
  let players = state.stats
  let {winners, losers} = transaction
  let entry = {}
  if (transaction.mode == 0) {
    //gmor
    for (let winner of winners) { //winner
      //consider changing stats into a map instead of using array!
      let winnerProfile = players.filter((player) => player.id == winner)[0]
      winnerProfile.score += transaction.score
      winnerProfile.pay += scale[transaction.score].allLoseTotal
      entry[winner] = transaction.score
    }
    for (let loser of losers) {
      let numOfLosers = losers.length
      let loserProfile = players.filter((player) => player.id == loser)[0]
      loserProfile.score -= transaction.score // doesnt make sense but ok
      loserProfile.pay -= (scale[transaction.score].allLoseTotal / numOfLosers)
      entry[loser] = -transaction.score
    }
  } else {
    //chut chung
    console.log("transaction", transaction)

    for (let winner of winners) { //winner
      //consider changing stats into a map instead of using array!
      let winnerProfile = players.filter((player) => player.id == winner)[0]
      winnerProfile.score += transaction.score
      winnerProfile.pay += scale[transaction.score].oneLose
      entry[winner] = transaction.score
    }

    for (let loser of losers) {
      let loserProfile = players.filter((player) => player.id == loser)[0]
      loserProfile.score -= transaction.score
      loserProfile.pay -= scale[transaction.score].oneLose
    }
  }

  return {stats: players, entry: transaction};
}