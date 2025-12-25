export function getHighScore() {
  return parseInt(localStorage.getItem('bestDistance') || '0', 10)
}

export function setHighScore(score) {
  const current = getHighScore()
  const best = Math.max(current, score)
  localStorage.setItem('bestDistance', best.toString())
  return best
}
