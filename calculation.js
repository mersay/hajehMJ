/**
 * Created by MercedesLo on 2018-06-05.
 */
import scale from './scale'
export default function calculate (transaction, state) {
  let players = state.stats
  let entry = {}
  if (transaction.mode == 0) {
    //gmor
    for (let player of players) {
      console.log("player",player)
      if (player.id == transaction.winner) {
        player.score += transaction.score
        player.pay += scale[transaction.score].allLoseTotal
        entry[player.id] = transaction.score
      } else {
        player.score -= transaction.score
        player.pay -= scale[transaction.score].allLoseEach
        entry[player.id] = -transaction.score
      }
    }
  } else {
    for (let player of players) {
      if (player.id == transaction.loser) {
        player.score -= transaction.score[0]
        player.pay -= scale[transaction.score[0]].oneLose
        entry[player.id] = -transaction.score[0]

        if (transaction.twoWinners) {
          player.score -= transaction.score[1]
          player.pay -= scale[transaction.score[1]].oneLose
          entry[player.id] += -transaction.score[1]
        }
      }

      if (player.id == transaction.winner[0]) {
        player.score += transaction.score[0]
        player.pay += scale[transaction.score[0]].oneLose
        entry[player.id] = transaction.score[0]
      }

      if (player.id == transaction.winner[1] && transaction.twoWinners) {
        player.score += transaction.score[1]
        player.pay += scale[transaction.score[1]].oneLose
        entry[player.id] = transaction.score[1]
      }
    }
  }

  return {stats: players, entry};
}