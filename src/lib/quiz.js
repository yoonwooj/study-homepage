export const TYPE = { c: '4지선다', ox: 'O/X', s: '주관식' }

export const norm = (value) => String(value).replace(/[\\s.,!?]/g, '').toLowerCase()

export const shuffle = (items) => {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export const isRight = (question, value) => question.t === 's'
  ? question.a.some((answer) => norm(answer) === norm(value))
  : value === question.a

export const answerText = (question) => question.t === 'c'
  ? `${'①②③④'[question.a]} ${question.o[question.a]}`
  : question.t === 'ox' ? (question.a ? 'O' : 'X') : question.a[0]

export const prep = (question, unit) => {
  if (question.t !== 'c') return { ...question, unit }
  const options = shuffle(question.o.map((text, index) => ({ text, correct: index === question.a })))
  return { ...question, unit, o: options.map((option) => option.text), a: options.findIndex((option) => option.correct) }
}
