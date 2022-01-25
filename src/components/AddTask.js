import React from 'react';
import { Container, Form, Col, Row, Button} from "react-bootstrap";

import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';

import firebaseApp from '../credentials';

const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

const AddTask = ({taskList , setTaskList, userEmail}) => {
  let downloadURL;

  async function addTask(e) {
    e.preventDefault();
    const description = e.target.formDescription.value;

    const newTaskList = [
      ...taskList,
      {
        id: +new Date(),
        description: description,
        url: downloadURL,
      },
    ];
    const docRef = doc(firestore, `users/${userEmail}`);
    updateDoc(docRef, { tasks: [...newTaskList]})
    setTaskList(newTaskList);

    e.target.formDescription.value= "";
  }

  async function fileHandler(e){
    // detect file
    const localFile = e.target.files[0];
    // load file to firebase storage
    const fileRef = ref(storage, `documents/${localFile.name}`)
    await uploadBytes(fileRef, localFile);
    // obtain url
    downloadURL = await getDownloadURL(fileRef);

  }

  return (
    <Container>
      <Form onSubmit={addTask}>
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Describe tu tarea"
              id="formDescription"
            />
          </Col>
          <Col>
              <Form.Control type="file" placeholder="Añade archivo" onChange={fileHandler} />
          </Col>
          <Col>
            <Button type="submit"> Agregar Tarea</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default AddTask;