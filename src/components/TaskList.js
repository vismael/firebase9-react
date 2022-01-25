import React from "react";
import { Col, Container, Stack, Button, Row } from "react-bootstrap";

import firebaseApp from "../credentials"
import { getFirestore, updateDoc, doc } from "firebase/firestore";
const firestore = getFirestore(firebaseApp);

const TaskList = ({ taskList, setTaskList, userEmail }) => {

  async function deleteTask(taskIdToDelete ){
    // create new task list
    const newTaskList = taskList.filter((task) => task.id !== taskIdToDelete);
    // update data base
    const docRef = doc(firestore, `users/${userEmail}`);
    updateDoc(docRef, {tasks: [...newTaskList]})
    // update state
    setTaskList(newTaskList)
  }

  return (
    <Container>
      <Stack>
        {taskList.map((task) => {
          return (
            <>
              <Row>
                <Col>{task.description}</Col>
                <Col>
                  <a href={task.url}>
                    <Button>Ver Archivo</Button>
                  </a>
                </Col>
                <Col>
                  <Button onClick={() => deleteTask(task.id) }>Eliminar Tarea</Button>
                </Col>
              </Row>
              <hr/>
            </>
          );
        })}
      </Stack>
    </Container>
  );
};

export default TaskList;
