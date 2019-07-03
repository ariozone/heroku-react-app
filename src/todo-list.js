import React from "react"
const styles = {
  deleteIcon: {
    cursor: "pointer",
    fontSize: "1.5rem"
  },
  pendingTodo: {
    textDecoration: "none"
  },
  completedTodo: {
    textDecoration: "line-through"
  }
}

function TodoItem(props) {
  const labelClass = props.todo.isCompleted
    ? "form-check-label text-muted"
    : "form-check-label"
  const labelStyle = props.todo.isCompleted
    ? styles.completedTodo
    : styles.pendingTodo
  return (
    <li className="list-group-item">
      <div className="form-check clearfix">
        <input
          type="checkbox"
          checked={props.todo.isCompleted}
          className="form-check-input"
          onChange={props.onCompletedChange}
        />
        <label
          style={labelStyle}
          className={labelClass}
          htmlFor={`todo-${props.todo.id}`}
        >
          {props.todo.task}
        </label>
        {props.todo.isCompleted && (
          <i
            style={styles.deleteIcon}
            onClick={props.onDeleteClicked}
            className="fa fa-times text-danger float-right"
          />
        )}
      </div>
    </li>
  )
}

export default function TodoList(props) {
  return (
    <ul className="list-group">
      {props.todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onCompletedChange={() => props.toggleCompleted(todo.id)}
          onDeleteClicked={todo => props.deleteTodo(todo.id)}
        />
      ))}
    </ul>
  )
}
