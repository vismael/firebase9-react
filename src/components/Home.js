import React, {useEffect, useState} from "react";

import AddTask from "./AddTask";
import TaskList from "./TaskList";

import firebaseApp from "../credentials";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import { Container, Button } from "react-bootstrap";
const firestore = getFirestore(firebaseApp);

const fakeData = [
  { id: 1, description: "tareas falsa1", url: "https://picsum.photos/420" },
  { id: 2, description: "tareas falsa2", url: "https://picsum.photos/420" },
  { id: 3, description: "tareas falsa3", url: "https://picsum.photos/420" },
];
const auth = getAuth(firebaseApp);


/** Home */
const Home = ({ userEmail }) => {
  const [taskList, setTaskList] = useState(null);

  async function searhDocumentOrCreateDocument(documentId) {
    const docRef = doc(firestore, `users/${documentId}`);

    const docResponse = await getDoc(docRef);

    if (docResponse.exists()) {
      const infoDoc = docResponse.data();
      return infoDoc.tasks;
    } else {
      await setDoc(docRef, { tasks: [...fakeData] });
      const docResponse = await getDoc(docRef);
      const infoDoc = docResponse.data();
      return infoDoc.tasks;
    }
  }

  useEffect(()=>{
    async function fetchTasks() {
      const taskData = await searhDocumentOrCreateDocument(userEmail);
      setTaskList(taskData);
    }

    fetchTasks();
  }, [])


  return (
    <Container>
      <h4>Hi,sesión iniciada</h4>
      <Button onClick={() => signOut(auth)}>Cerrar sesion</Button>
      <hr />
      <AddTask
        taskList={taskList}
        setTaskList={setTaskList}
        userEmail={userEmail}
      />
      {taskList ? (
        <TaskList
          taskList={taskList}
          setTaskList={setTaskList}
          userEmail={userEmail}
        />
      ) : null}
    </Container>
  );
};

export default Home;
