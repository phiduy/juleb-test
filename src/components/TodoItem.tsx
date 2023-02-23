import "./TodoForm.css"
import React, { useState } from "react"
import { IonLabel, IonButton, IonItem } from "@ionic/react"

import {
  useDeleteTodoMutation,
  useUpdateTodoMutation
} from "../services/todo.service"
import { ITodoItem } from "../@types/todo"
import TodoForm from "./TodoForm"

interface Props {
  item: ITodoItem
}

const TodoItem: React.FunctionComponent<Props> = ({ item }) => {
  const [toggleEdit, setToggleEdit] = useState<boolean>(false)
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation()
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation()

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteTodo(id).unwrap()
      if (response.success) {
        return
      }
    } catch (error) {
      console.log("hello")
    }
  }

  const handleUpdate = async (data: { todo: string }) => {
    try {
      const response = await updateTodo({
        id: item.id,
        body: { note: data.todo }
      }).unwrap()
      if (response.success) {
        setToggleEdit(false);
        return
      }
    } catch (error) {}
  }

  const renderActions = () => (
    <div>
      <IonButton
        style={{ marginRight: 8, width: 80 }}
        color="danger"
        onClick={() => {
          if (toggleEdit) {
            setToggleEdit(false)
          } else {
            handleDelete(item.id)
          }
        }}
      >
        {toggleEdit ? "Cancel" : "Delete"}
      </IonButton>
      <IonButton
        style={{ marginRight: 8, width: 80 }}
        color={toggleEdit ? "success" : undefined}
        onClick={() => {
          if(!toggleEdit) {
            setToggleEdit(true)
          }
        }}
        type="submit"
      >
        {toggleEdit ? "Save" : "Edit"}
      </IonButton>
    </div>
  )

  const renderContent = () => {
    if (toggleEdit) {
      return (
        <TodoForm
          onSubmit={handleUpdate}
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "flex-end"
          }}
          actions={renderActions()}
          defaultValues={{
            todo: item.note
          }}
        />
      )
    }

    return <IonLabel>{item.note}</IonLabel>
  }

  return (
    <IonItem>
      {!toggleEdit && renderActions()}
      {renderContent()}
    </IonItem>
  )
}

export default TodoItem
