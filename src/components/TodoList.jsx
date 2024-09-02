import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, editTodo } from '../store/todoSlice/todoSlice';
import TodoForm from './TodoForm';

const TodoList = () => {
  const { todos } = useSelector((state) => state.todos);
  const [isEditing, setIsEditing] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const handlerDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditClick = (id, text, url, date) => {
    setIsEditing({ id, text, url, date });
    setOpenModal(true);
  };

  const handleSave = (id, text, url, date) => {
    dispatch(editTodo({ id, text, url, date }));
    setIsEditing(null);
    setOpenModal(false);
  };

  const handleClose = () => {
    setIsEditing(null);
    setOpenModal(false);
  };

  return (
    <>
      {todos.map((item) => (
        <StyledListItem key={item.id}>
          <StyledBox>
            <p>{item.text}</p>
            <StyledImage src={item.url} alt="" />
            <p>{item.date}</p>
            <StyledButtonBox>
              <Button variant='outlined' color='error' onClick={() => handlerDelete(item.id)}>
                Delete
              </Button>
              <Button variant='contained' color='info' onClick={() => handleEditClick(item.id, item.text, item.url, item.date)}>
                Edit
              </Button>
            </StyledButtonBox>
          </StyledBox>
        </StyledListItem>
      ))}

      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          {isEditing && (
            <TodoForm
              initialText={isEditing.text}
              initialUrl={isEditing.url}
              initialDate={isEditing.date}
              onClose={handleClose}
              onSave={(text, url, date) => handleSave(isEditing.id, text, url, date)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoList;

const StyledListItem = styled(Box)`
  width: 400px;
  background-color: bisque;
  margin: 0 auto;
  padding: 30px;
  transition: all 0.3s;
  &:hover {
    background-color: whitesmoke;
  }
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 300px;
`;

const StyledButtonBox = styled("div")`
  display: flex;
  gap: 10px;
`;

const StyledImage = styled("img")`
  width: 120px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
