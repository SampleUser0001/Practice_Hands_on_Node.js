'use strict'

const express = require('express')

let todos = [
  { id: 1, title: 'ネーム', completed: false },
  { id: 2, title: '下書き', completed: true }
]
const app = express()

app.use(express.json())

// TODO一覧の取得
app.get('/api/todos', (req, res) => {
  if (!req.query.completed) {
    return res.json(todos)
  }

  // GETのパラメータに'completed'がある場合
  // 'completed=true'が来ていればtrue。
  const completed = req.query.completed === 'true'
  res.json(todos.filter(todo => todo.completed === completed))
})

// SSE送信関数の保持配列
let sseSenders = []
let sseId = 1

// TODO一覧の取得（SSE）
app.get('/api/todos/events', (req, res) => {
  // タイムアウトを抑止
  req.socket.setTimeout(0)
  res.set({
    // SSEのContent-Type
    'Content-Type': 'text/event-stream'
  })

  // クライアントにSSEを送信する関数を登録。
  const send = (id, data) => res.write(`id: ${id}\ndata: ${data}\n\n`)
  sseSenders.push(send)

  // リクエスト発生時点の状態を送信
  send(sseId, JSON.stringify(todos))

  // リクエストがクローズされたら、レスポンスをクローズして、SSE送信関数を配列から削除
  req.on('close', () => {
    res.end()
    sseSenders = sseSenders.filter(_send => _send !== send)
  })
})

/** ToDoの更新に伴い、全クライアントに対してSSEを送信する */
function onUpdateTodos() {
  sseId += 1
  const data = JSON.stringify(todos)
  sseSenders.forEach(send => send(sseId, data))
}

let id = todos.length

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.json())

// Todo新規登録
app.post('/api/todos', (req, res, next) => {
  // res.setHeader('Content-Type', 'application/json')
  // console.log('POST')
  // console.log('req.body', req.body)

  const { title } = req.body
  if (typeof title !== 'string' || !title) {
    // titleがリクエストに含まれていない場合はステータスコード400
    const err = new Error('title is required')
    err.statusCode = 400
    return next(err)
  }

  // Todoの作成
  const todo = { id: id += 1, title, completed: false }
  todos.push(todo)
  // 201(Created)
  res.status(201).json(todo)

  // SSE送信
  onUpdateTodos()
})

// 指定されたIDのToDoを取得するためのミドルウェア
app.use('/api/todos/:id(\\d+)', (req, res, next) => {
  const targetId = Number(req.params.id)
  const todo = todos.find(todo => todo.id === targetId)
  if (!todo) {
    const err = new Error('ToDo not found')
    err.statusCode = 404
    return next(err)
  }
  req.todo = todo
  next()
})

// ToDoのCompletedの設定、解除
app.route('/api/todos/:id(\\d+)/completed')
  .put((req, res) => {
    req.todo.completed = true
    res.json(req.todo)
    onUpdateTodos()
  })
  .delete((req, res) => {
    req.todo.completed = false
    res.json(req.todo)
    onUpdateTodos()
  })

// ToDoの削除
app.delete('/api/todos/:id(\\d+)', (req, res) => {
  todos = todos.filter(todo => todo !== req.todo)
  res.status(204).end()
  onUpdateTodos()
})

// エラーハンドリングミドルウェア
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode || 500).json({ error: err.message })
})

app.listen(3000)

const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })

nextApp.prepare().then(
  // pagesディレクトリ内の各Reactコンポーネントに対するサーバサイドルーティング
  () => app.get('*', nextApp.getRequestHandler()),
  err => {
    console.error(err)
    process.exit(1)
  }
)
