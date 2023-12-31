import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';


function Todo() {

  const [task, setTask] = useState("");
  const [update, setUpdate] = useState(null);
  const [list, setList] = useState([]);
  const inputStyle = {
    borderRadius: '4px',
    outline: 'none',
    border: '1px solid gray',
    boxShadow: '0 0 2px gray'

  }

  function taskVAl(e) {
    setTask(e.target.value)

  }
  function addTask() {

    if (update !== null) {
      setList((preVal) => (

        preVal.map((list, i) => i === update ? list = { taskadd: task, id: uuidv4() } : list)
      ))
      setTask("");
      setUpdate(null)
    } else {
      if (task !== "")
        setList((preVal) => (
          [...preVal, { taskadd: task, id: uuidv4() }])
        );
      setTask("");


    }


  }

  function remove(id) {
    setList((preVAl) => (
      preVAl.filter(list => list.id !== id)
    ))

  }

  function edit(id) {
    setTask(list[id].taskadd);

    setUpdate(id)
  }
  return (
    <div>
      <div style={{ display: "flex", width: '400px', gap: '1px', flexWrap: "wrap" }}>
        <input type="text" value={task} placeholder='add task' onChange={taskVAl} style={inputStyle} />
        <Button
          variant="contained" color="success" size='madium' onClick={addTask}>
          {

            update !== null ? <b>  Save UpDate </b> : <b> add Task </b>
          }
        </Button>
        {
          list.length > 1 ? <div>
            <Button
              variant="contained" color="error" size='madium' onClick={() => setList([])}>
              <b> Remove All </b>

            </Button>
          </div>
            : null
        }
      </div>

      <ul>
        {
          list.map((listitem, i) => (
            <li key={listitem.id} style={{ marginBottom: "3px" }}>
              <b style={{ display: "inline-block", width: "130px" }}> {listitem.taskadd}</b>
              <Button
                variant="contained" color="error" size='madium' onClick={() => remove(listitem.id)}>
                <b> Remove </b>
              </Button>
              <Button
                variant="contained" color="warning" size='madium'
                onClick={() => edit(i)}
                style={{ marginLeft: "3px" }}
              >
                <b> Edit </b>
              </Button>

            </li>
          ))
        }
      </ul>




    </div>
  )
}

export default Todo;