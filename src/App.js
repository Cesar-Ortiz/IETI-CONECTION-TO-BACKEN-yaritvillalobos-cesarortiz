import { TaskList } from "./components/TaskList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TaskForm } from "./components/TaskForm";
import { Login } from "./components/Login";
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/home">
            <TaskList />
          </Route>
          <Route path="/tasks/:taskId">
            <TaskForm />
          </Route>
          <Route path="/Task_create">
            <TaskForm />
          </Route>
          <Route>
            <div>Not found</div>
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
