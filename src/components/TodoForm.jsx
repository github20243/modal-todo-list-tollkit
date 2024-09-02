import { Box, Button, TextField, styled } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice/todoSlice';

const TodoForm = ({ onClose, onSave, initialText = "", initialUrl = "", initialDate = "" }) => {
  const [text, setText] = useState(initialText);
  const [url, setUrl] = useState(initialUrl);
  const [date, setDate] = useState(initialDate);

  const dispatch = useDispatch();

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(text, url, date);
    } else {
      const newTask = {
        id: Math.floor(Math.random() * 1000).toString(),
        text,
        url,
        date,
      };
      dispatch(addTodo(newTask));
    }
    setText("");
    setUrl("");
    setDate("");
    onClose();
  };

  return (
    <StyledFormMui onSubmit={handlerSubmit} component={"form"}>
      <TextField variant='outlined' label="New text" value={text} onChange={(e) => setText(e.target.value)} />
      <TextField variant='outlined' type='url' label="Photo" value={url} onChange={(e) => setUrl(e.target.value)} />
      <TextField variant='outlined' type='date' value={date} onChange={(e) => setDate(e.target.value)} />
      <Button variant='contained' color='success' type='submit'>Save</Button>
      <Button variant='outlined' color='warning' onClick={onClose}>Cancel</Button>
    </StyledFormMui>
  );
};

export default TodoForm;

const StyledFormMui = styled(Box)`
  width: 450px;
  height: 350px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
