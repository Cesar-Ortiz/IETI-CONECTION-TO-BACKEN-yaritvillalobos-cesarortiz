import { useState, useEffect } from "react";
import { useHistory} from "react-router";
import { useData } from "../providers/DataProvider";
import { TaskItem } from "./TaskItem";
import { Link } from "react-router-dom";
import './css/home.css';
import './css/general.css';
import logo from './img/signo.png';
import {ApiLookup } from "../providers/DataProvider";
import {Accordion, Button, Input} from "@chakra-ui/react"


export const TaskList = () => {
  const { data, setData } = useData();
  const [textValue, setTextValue] = useState("");
  const history = useHistory();
  //const [tasks, setTasks] = useState([]);

  const tasks=data.tasks;

    /*console.log(data[0].name+"pofavo");
    tasks.push(data[0].name);*/
    //console.log(tasks);
  



  const handleTaskChange = (index) => () => {
  };

  const newTask = (name) => {  
    let newTasks = {
      name: name,
      description: "No hay descripcion",
      status: "TODO",
      assignedTo: "No se ha asignado",
      dueDate: "2020-12-04T19:15:05.000+0000"
    }
    ApiLookup.lookup("POST","api/task",(data)=> {},JSON.stringify(newTasks));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    newTask(textValue);
    setTextValue("");
  };

  const handleTextChange = (event) => {
    const value = event.target.value;
    setTextValue(value);
  };

  const handleCreate = () => {
    history.push("/Task_create");
  }

  
  return (
    <div id="home">
      <div className="stick"><img alt='some value' className="button" src={logo} onClick={handleCreate}/></div>
      <div id="exit"><Link className="link" to = "/">Log out</Link></div>
      <label className="titulos">List Tasks</label>
    <article>
      <div id="newTask">
        <form>
          <Input marginBottom="10px"
            value={textValue}
            onChange={handleTextChange}
            type="text"
            placeholder="Task name"
          />
          <Button colorScheme="teal" marginBottom="30px" className="button" size="md" onClick={handleSubmit}>Create Task</Button>
        </form> 
      </div>
      <ul>
        {tasks.map((task, index) => {
          return (
            <Accordion allowMultiple w="100%">
              <TaskItem
                id={task.id}
                isChecked={task.isCompleted}
                taskName={task.name}
                description={task.description}
                status={task.status}
                assignedTo={task.assignedTo}
                dueDate={task.dueDate}
                onTaskChange={handleTaskChange(index)}
              />
            </Accordion>
          );
        })}
      </ul>
      
    </article>
    </div>
  );
};
