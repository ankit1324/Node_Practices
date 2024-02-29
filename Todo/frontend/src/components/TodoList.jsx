import React, { useEffect, useState } from "react";
import axios from "axios";

export const TodoList = () => {
  const [taskdata, setTaskData] = useState([]);

  const fetchTaskData = async () => {
    const resp = await axios.get("/todo/getTodo");
    console.log(resp);

    //if No Todo
    if (resp.data.todo.length) {
      setTaskData(resp.data.todo);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, [taskdata]);

  const handelEdit = async (todo) => {
    const title = prompt("Enter the title");
    const task = prompt("Enter the Task");

    if (!title || !task) {
      alert("Please Enter the Title and Task");
    } else {
      const resp = await axios.put(`/todo/update/${todo._id}`, {
        title,
        task,
      });
      console.log(resp);
    }
  };

  const handelDelete = async (todoId) => {
    const resp = await axios.delete(`/todo/delete/${todoId}`);
    console.log(resp);
  };

  return (
    <div>
      <div className="flex justify-center mt-8 border border-black p-4">
        <div className="overflow-x-auto bg-black text-white p-4 rounded-lg">
          <table className="min-w-full table-auto border border-white">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 border border-gray-800">Title</th>
                <th className="px-4 py-2 border border-gray-800">Task</th>
                <th className="px-4 py-2 border border-gray-800">Edit</th>
                <th className="px-4 py-2 border border-gray-800">Delete</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {taskdata &&
                taskdata.map((todo) => (
                  <tr key={todo.id}>
                    <td className="border px-4 py-2 border-gray-800">
                      {todo.title}
                    </td>
                    <td className="border px-4 py-2 border-gray-800">
                      {todo.task}
                    </td>
                    <td className="border px-4 py-2 border-gray-800">
                      <button
                        onClick={() => handelEdit(todo)}
                        className="hover:text-green-500"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="border px-4 py-2 border-gray-800">
                      <button
                        onClick={() => handelDelete(todo._id)}
                        className="hover:text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
