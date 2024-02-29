import { useState } from "react";
import axios from "axios";
import "./form.css";
export const Form = () => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  console.log(title, task);

  //toHandleData
  const submitData = async () => {
    const data = {
      title,
      task,
    };
    const res = await axios.post("/todo/addNew", data);
    console.log(res);
  };

  //to handle default
  const handleSubmit = (event) => {
    event.preventDefault();
    // to Submit the data
    submitData();
    setTitle("");
    setTask("");
  };
  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required=""
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="task">Task</label>
            <textarea
              name="task"
              id="task"
              rows="10"
              cols="50"
              required=""
              value={task}
              onChange={(event) => setTask(event.target.value)}
            >
              {" "}
            </textarea>
          </div>
          <button className="form-submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
