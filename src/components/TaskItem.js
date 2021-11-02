import { Link } from "react-router-dom";
import './css/home.css';
import './css/general.css';
import logoojo from './img/ojo.png';
import aprobado from './img/aprobado.png';
import martillo from './img/martillo.png';
import calendario from './img/calendario.png';
import persona from './img/persona.png';
import {Box, Image, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon} from "@chakra-ui/react"

export const TaskItem = ({ id, taskName, description, status, assignedTo, dueDate}) => {

  let imagen=martillo;
    if(status === "DONE"){
      imagen=aprobado
    }else if(status === "REVIEW"){
      imagen=logoojo
    }


  return (
      <div className="acordion">
        <AccordionItem>
          <h2>
            <AccordionButton >
              <Box flex="1" textAlign="center" fontWeight="700">
                {taskName}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          
          <AccordionPanel textAlign="center" pb={4} className={`description subconjunto${id}`}>
            {description}
          </AccordionPanel>
          <div className="panel">
            <AccordionPanel pb={4}>
            <div className="imagen-home">
                <Image className="imagen-home" width="100%" src={imagen} />
              </div>
              <label className="texto-acordion">{status}</label>
              
            </AccordionPanel>
          </div>
          <div className="panel">
            <AccordionPanel pb={4}>
              <div className="imagen-home">
                <Image className="imagen-home" width="100%" src={calendario} />
              </div>
              <label className="texto-acordion">{dueDate}</label>
            </AccordionPanel>
          </div>
          <div className="panel">
            <AccordionPanel pb={4}>
              <div className="imagen-home">
                <Image className="imagen-home" width="100%" src={persona} />
              </div>
              <label className="texto-acordion">{assignedTo}</label>
            </AccordionPanel>
          </div>

          <AccordionPanel pb={4}>
            <Link to={`/tasks/${id}`} className="link">Update</Link>
          </AccordionPanel>
        </AccordionItem>
      </div>
    
  );
};
