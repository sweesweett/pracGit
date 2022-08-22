import { useEffect, useState } from 'react';
import Todo from '../components/Todo';
import styled from 'styled-components';
import axios from 'axios';
import WriteTodo from '../components/WriteTodo';
const TodoUl = styled.ul`
  width: 800px;
  padding: 10px;
`;
const ToDoList = ({ favorite }) => {
  const [toDoData, setToDoData] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:4000/todo')
      .then(({ data }) => {
        setToDoData([...data]);
      })
      .catch((err) => console.log(err));
  }, [setToDoData]);
  return (
    <>
      <WriteTodo setToDoData={setToDoData} favorite={favorite} />
      <div>To Do List</div>
      <TodoUl>
        {toDoData.map((el) => (
          <Todo el={el} setToDoData={setToDoData} key={el.id} />
        ))}
      </TodoUl>
      {/* 보류 */}
    </>
  );
};
export default ToDoList;
