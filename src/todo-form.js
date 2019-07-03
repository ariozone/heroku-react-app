import React, { Component } from "react"

export default class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.state = { task: "" }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    const { value } = event.target
    this.setState({ task: value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { task } = this.state
    this.props.onSubmit({ task })
    this.setState({ task: "" })
  }

  render() {
    const { task } = this.state
    const { handleChange, handleSubmit } = this
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <input
              required
              autoFocus
              name="task"
              value={task}
              placeholder="New Todo"
              onChange={handleChange}
              className="form-control"
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}
