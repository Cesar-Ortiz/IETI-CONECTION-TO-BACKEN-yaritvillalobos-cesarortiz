import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useData } from "../providers/DataProvider";
import './css/form_task.css';
import {Input, Button, Stack, Select} from "@chakra-ui/react"

export const TaskForm = () => {
  const history = useHistory();
  const { data, setData } = useData();
  const { taskId } = useParams();
  const task = data.tasks.find((task) => task.id === taskId);
  const tasks = data.tasks;
  const [text, setText] = useState(task?.name ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [assigTo, setAssingTo] = useState(task?.assignedTo ?? "");
  const [status, setStatus] = useState(task?.status ?? "IN_PROGRESS");
  const [date, setDate] = useState(task?.dueDate ?? "");

  const handleChange = (e) => {
    const inputName = e.target.value;
    setText(inputName);
  }

  const handleDescriptionChange = (event) => {
    const inputDescription = event.target.value;
    setDescription(inputDescription);
  }

  const handleAssignedToChange = (event) => {
    const inputAssignedTo = event.target.value;
    setAssingTo(inputAssignedTo);
  }

  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    setDate(inputDate);
  }

  const handleStatus = () =>{ 
    const select = document.getElementById("transporte");
    const value = select.value;
    setStatus(value);
  }

  const updateTask = () => {
    const newTasks = data.tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, name: text, isCompleted: "false" , description: description ,assignedTo: assigTo,
          dueDate: date, status: status};
      }
      return task
    });

    setData((prev) => ({ ...prev, tasks: newTasks }));

    history.goBack();
  };
  
  const createTask = () => {
    const idstr = tasks.length+1;
    const newTask = {
      id: idstr.toString(),
      isCompleted: false,
      name: text,
      description: description!=="" ? description : "No hay descripcion",
      status: status,
      assignedTo: assigTo!=="" ? assigTo : "No se ha asignado",
      dueDate: date!=="" ? date : "No se ha programado fecha"
    };

    setData((prev) => ({ ...prev, tasks: [...tasks, newTask]}));

    history.goBack();
  };

  let nameButton = "Update";
  if (!task) {
    nameButton = "Create"
  }

  const buttonAction = () =>{
    console.log(status);
    if(text!==""){
      
      if(nameButton === "Update"){
        updateTask();
      }
      else{
        createTask();
      }
    }
  }
  
  return (
    <div id="form_task">
    <form>
      <label className="titulos">Task</label>
      <div className="field"><label className="block-field" key="name">Name<br/></label>
      <Input
            className="block-field"
            type="text"
            placeholder="Name"
            value={text}
            onChange={handleChange}
      /></div>
      <div className="field">
      <label className="block-field" key="description">Description<br/></label>
      <Input
            className="block-field" 
            type="text" 
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
      /></div>
      <div className="field">
      <label className="block-field" key="assigTo">Assing To<br/></label>
      <Input 
            className="block-field"
            type="text" 
            placeholder="AssingnedTo"
            value={assigTo}
            onChange={handleAssignedToChange}
      /></div>
      <div className="field">
      <label className="block-field" key="Status">Status<br/></label>
      <select  value={status} className="block-field" placeholder="status" onChange={handleStatus}>
      
        
      </select>
      <Stack spacing={3}>
        <Select id="transporte" value={status} onChange={handleStatus} size="lg" >
          <option value="TO DO">TO DO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="REVIEW">REVIEW</option>
          <option value="DONE">DONE</option>
        </Select>
      </Stack>
      </div>
      <div className="field">
      <label className="block-field" key="Date">Due Date<br/></label>
      <Input
            className="block-field"
            type="date" 
            id="start" 
            name="trip-start" 
            value={date}
            onChange={handleDateChange}
            min="2018-01-01"
            max="2021-12-31"
      /> </div>
      
      <Button colorScheme="red" size="md" className="button back" onClick={() => history.push("/home")}  type="button">Back</Button>
      <Button type="button" colorScheme="teal" size="md" className="input button" onClick={buttonAction}>
        {nameButton}
      </Button>
    </form>
    </div>
  );
};