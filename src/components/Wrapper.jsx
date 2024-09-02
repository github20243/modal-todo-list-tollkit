import React, { useState } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { Box, Button, styled } from "@mui/material";
import TodoEdit from "./TodoEdit";

const Wrapper = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const onClose = () => {
    setOpenModal((prev) => !prev);
  };

  const onEdit = () => {
    setOpenEdit((prev) => !prev);
  };

  return (
    <StyledBox>
      <StyledButton variant="outlined" onClick={onClose}>
        {openModal ? "Закрыть" : "Открыть"}
      </StyledButton>
      {openModal ? (
        <CenteredModal>
          <TodoForm onClose={onClose} />
        </CenteredModal>
      ) : (
        <TodoList onClose={onEdit} />
      )}
      {openEdit && (
        <CenteredModal>
          <TodoEdit onClose={onEdit} />
        </CenteredModal>
      )}
    </StyledBox>
  );
};

export default Wrapper;

const StyledBox = styled(Box)`
  margin: 0 auto;
`;

const StyledButton = styled(Button)`
  margin: 5px;
`;

const CenteredModal = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 10px;
`;
