import { useState } from "react";
import { useHistory } from "react-router";
import { useData } from "../providers/DataProvider";
import { TaskItem } from "./TaskItem";
import { Link } from "react-router-dom";
import './css/home.css';
import './css/general.css';
import logo from './img/signo.png';
import {Accordion, Button, Input} from "@chakra-ui/react"


export const TaskList = () => {
  const { data, setData } = useData();
  const [textValue, setTextValue] = useState("");
  const history = useHistory();
  const tasks = data.tasks;

  const handleTaskChange = (index) => () => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      return task;
    });

    setData((prev) => ({ ...prev, tasks: newTasks }));
  };

  const newTask = (name) => {
    if(name!==""){
      const idstr = tasks.length+1;
      const newTask = {
        id: idstr.toString(),
        isCompleted: false,
        name: name,
        description:'No hay descripcion',
        status:'IN_PROGRESS',
        assignedTo: 'No se ha asignado',
        dueDate:"No se ha programado fecha"
      };
      setData((prev) => ({ ...prev, tasks: [...tasks, newTask] }));
      
    
    }
    window.setTimeout(() => {
      document.getElementById("peligro").style.display = "none";
    }, 3000);
    
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
      <label class="titulos">List Tasks</label>
    <article>
      <div id="newTask">
        <form onSubmit={handleSubmit}>
          <Input marginBottom="10px"
            value={textValue}
            onChange={handleTextChange}
            type="text"
            placeholder="Task name"
          />
          <Button colorScheme="teal" marginBottom="30px" className="button" size="md">Create Task</Button>
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
