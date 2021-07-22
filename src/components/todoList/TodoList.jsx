import React from "react";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      addList: [],
    };
  }

  takeInputValue = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleAdd = (event) => {
    event.preventDefault();
    if (this.state.inputValue !== "") {
      this.setState((prevState) => {
        return {
          addList: [
            ...prevState.addList,
            {
              id: Math.random(),
              inputText: this.state.inputValue,
              isChecked: false,
              isEditMode: false,
            },
          ],

          inputValue: "",
        };
      });
    }
  };

  handleDelete = (item) => {
    this.setState((prevState) => ({
      addList: prevState.addList.filter((el) => item.id !== el.id),
    }));
  };

  handleComplete = (item) => {
    this.setState((prevState) => ({
      addList: prevState.addList.map((todo) =>
        todo.id === item.id ? { ...todo, isChecked: !todo.isChecked } : todo
      ),
    }));
  };

  handleEdit = (item) => {
    this.setState((prevState) => ({
      addList: prevState.addList.map((todo) =>
        todo.id === item.id ? { ...todo, isEditMode: true } : todo
      ),
    }));
  };

  handleCompleteAll = () => {
    this.setState((prevState) => ({
      addList: prevState.addList.map((todo) => {
        return { ...todo, isChecked: true };
      }),
    }));
    let completeAll = this.state.addList.every((todo) => todo.isChecked);
    if (completeAll) {
      this.setState((prevState) => ({
        completeAll: true,
        addList: prevState.addList.map((todo) => {
          return { ...todo, isChecked: false };
        }),
      }));
    }
  };

  render() {
    return (
      <div className="">
        <p className="text-4xl">To Do List</p>
        <form onClick={this.handleAdd}>
          <input
            value={this.state.inputValue}
            onChange={this.takeInputValue}
            type="text"
            className="bg-gray-200 h-10 w-80"
            placeholder="todo list..."
          />
          <input
            type="submit"
            value="ADD"
            className="
                bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded "
          />
        </form>
        <div>
          {this.state.addList.map((item) => (
            <div className="" key={item.id}>
              {item.isEditMode ? (
                <input
                  value={item.inputText}
                 
                />
              ) : (
                <span
                  onClick={() => {
                    this.handleComplete(item);
                  }}
                  className={item.isChecked ? "line-through" : "no-underline"}
                >
                  {item.inputText}
                </span>
              )}

              <button
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded "
                onClick={() => {
                  this.handleEdit(item);
                }}
              >
                Edit
              </button>
              <button
                className="
                bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded "
                onClick={() => {
                  this.handleDelete(item);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={this.handleCompleteAll}
          className="
          bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded "
        >
          Complete All
        </button>
      </div>
    );
  }
}
export default TodoList;
