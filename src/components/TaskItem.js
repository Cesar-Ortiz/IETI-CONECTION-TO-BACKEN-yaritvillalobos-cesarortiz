import { Link } from "react-router-dom";
import './css/home.css';
import './css/general.css';
import logoojo from './img/ojo.png';
import aprobado from './img/aprobado.png';
import martillo from './img/martillo.png';
import calendario from './img/calendario.png';
import persona from './img/persona.png';
import {Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon} from "@chakra-ui/react"

export const TaskItem = ({ id, isChecked, taskName, onTaskChange, description, status, assignedTo, dueDate}) => {

  const styleOfTheComponent = {
    //textDecoration: isChecked ? "line-through" : "", 
    display : "none"
  };
  let imagen=martillo;
    if(status === "DONE"){
      imagen=aprobado
    }else if(status === "REVIEW"){
      imagen=logoojo
    }
    
  
  function Desplegar(){
    let childs = document.getElementsByClassName("subconjunto"+id);
    let style="block";
    if(document.getElementById("description"+id).style.display === 'block'){
      style="none";
    }
    for(let i=0;i<childs.length;i++){
      childs[i].style.display = style;
    }
}
  

  return (
    
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {taskName}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} className={`description subconjunto${id}`}>
          {description}
        </AccordionPanel>
        <AccordionPanel pb={4}>
          {status}
        </AccordionPanel>
        <AccordionPanel pb={4}>
          {dueDate}
        </AccordionPanel>
        <AccordionPanel pb={4}>
          {assignedTo}
        </AccordionPanel>
        <AccordionPanel pb={4}>
          <Link to={`/tasks/${id}`} color="blue">Update</Link>
        </AccordionPanel>
      </AccordionItem>
    
  );
};
