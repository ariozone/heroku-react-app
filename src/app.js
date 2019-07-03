import React from "react"
import TodoList from "./todo-list"
import TodoForm from "./todo-form"
const styles = {
  app: {
    width: "26rem",
    maxWidth: "100%"
  }
}
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
    this.addTodo = this.addTodo.bind(this)
    this.toggleCompleted = this.toggleCompleted.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
  }
  componentDidMount() {
    fetch("/todos", { method: "GET" })
      .then(res => res.json())
      .then(todos => this.setState({ todos }))
  }
  addTodo(newTodo) {
    fetch("/todos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.assign({}, newTodo, { isCompleted: false }))
    })
      .then(res => res.json())
      .then(todo => this.setState({ todos: [...this.state.todos, todo] }))
  }

  toggleCompleted(todo) {
    fetch(`/todos/${todo}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(
        Object.assign({}, todo, { isCompleted: !todo.isCompleted })
      )
    })
      .then(res => res.json())
      .then(updated => {
        const todos = this.state.todos.map(todo =>
          todo.id === updated.id ? updated : todo
        )
        this.setState({ todos })
      })
  }
  deleteTodo(todo) {
    fetch(`/todos/${todo}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(
        Object.assign({}, todo, { onDeleteClicked: !todo.onDeleteClicked })
      )
    })
      .then(res => res.json())
      .then(deleted => {
        const todoIndex = this.state.todos.findIndex(todo =>
          todo === deleted.id ? deleted : todo
        )
        const todos = [
          ...this.state.todos.slice(0, todoIndex),
          ...this.state.todos.slice(todoIndex + 1)
        ]
        this.setState({ todos })
      })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col d-flex justify-content-center">
            <div style={styles.app}>
              <h1 className="text-center mb-4">Todo List</h1>
              <TodoForm onSubmit={this.addTodo} />
              <TodoList
                todos={this.state.todos}
                toggleCompleted={this.toggleCompleted}
                deleteTodo={this.deleteTodo}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
