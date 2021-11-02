import React, { useState } from "react";
import axios from "axios";

export const tasks = [
  {
    id: "1",
    isCompleted: false,
    name: "Arreglar checklist",
    description: "Arreglar el checklist del edit",
    status:"DONE",
    assignedTo:"Yarit",
    dueDate:"2021-11-30"
  },
  {
    id: "2",
    isCompleted: false,
    name: "Limpiar el campo",
    description: "Limpiar el campo del create task cuando se crea tarea",
    status:"IN_PROGRESS",
    assignedTo:"Cesar",
    dueDate:"2021-10-27"
  },
  {
    id: "3",
    isCompleted: false,
    name: "Mejorar el UI",
    description: "Mejorar el UI usando CSS",
    status:"REVIEW",
    assignedTo:"Yarit",
    dueDate:"2021-10-20"
  },
  {
    id: "4",
    isCompleted: false,
    name: "Modificar la estructura del proyecto",
    description: "Modificar la estructura del proyecto(UI y lógica) para que el Task tenga los siguientes campos: [name, description,assignedTo, dueDate, [status(TODO, IN_PROGRESS,REVIEW, DONE)]",
    status:"IN_PROGRESS",
    assignedTo:"Cesar",
    dueDate:"2021-11-13"
  }
];

const initialData = { tasks };

const DataContext = React.createContext(initialData);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  const value = { data, setData };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = React.useContext(DataContext);

  return context;
};

export class ApiLookup{

  static setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";path=/";
  }

  static getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
//method = GET / POST / PUT
  static lookup(method,endpoint,callback,data){

    const headers={
      "Content-Type":"application/json",
      "Authentication":"Bearer "+this.getCookie('taskToken'),
      "Access-Control-Allow-Origin": "http://localhost:3000"
    }

    const BASE_URL = "https://tasks-planner-api.herokuapp.com/"

    console.log(data);

    axios({
      method:method,
      headers:headers,
      url: BASE_URL + endpoint,
      data:data
    }).then((data)=>callback(data)).catch((error)=>(console.log(error)))

  }
}
