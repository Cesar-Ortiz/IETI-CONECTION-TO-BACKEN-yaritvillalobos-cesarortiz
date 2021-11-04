import React, { useState } from "react";
import axios from "axios";

export const tasks = [];

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
    console.log(document.cookie);
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
      "Authorization":"Bearer "+this.getCookie('taskToken'),
      "Access-Control-Allow-Origin": "http://localhost:3000"
    }

    const BASE_URL = "https://tasks-planner-api.herokuapp.com/"

    console.log("data "+ data);
    /*console.log("endpoint "+ endpoint);
    console.log("method "+ method);
    console.log("callback "+ callback);*/

    axios({
      method:method,
      headers:headers,
      url: BASE_URL + endpoint,
      data: data
    }).then((data)=>{callback(data)})

    //axios.defaults.headers.common['Authorization'] = "Bearer "+this.getCookie('taskToken');
  }
}