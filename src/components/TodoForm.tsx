import "./TodoForm.css"
import React, { useState } from "react"
import {
  IonLabel,
  IonButton,
  IonContent,
  IonItem,
  IonInput,
  IonList
} from "@ionic/react"

import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"

type FormValues = {
  todo: string
}

const TodoForm: React.FunctionComponent = () => {
  const [data, setData] = useState<string[]>([])
  const {
    handleSubmit,
    register,
    resetField,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      todo: ""
    }
  })

  const handleAdd = (value: string) => {
    const nextData = [...data]
    nextData.push(value)
    setData(nextData)
  }

  const handleDelete = (index: number) => {
    const nextData = [...data]
    nextData.splice(index, 1)
    setData(nextData)
  }

  /**
   *
   * @param data
   */
  const onSubmit = (data: FormValues) => {
    handleAdd(data.todo)
    resetField("todo")
  }

  const renderTodoList = () => {
    // if(loading) return null
    if (!data.length) {
      return <div>Empty</div>
    }

    return data.map((value, index) => (
      <IonItem key={`todo_list_item_${index}`}>
        <IonButton
          style={{ marginRight: 8 }}
          color="danger"
          onClick={() => {
            handleDelete(index)
          }}
        >
          Delete
        </IonButton>
        <IonLabel>{value}</IonLabel>
      </IonItem>
    ))
  }

  return (
    <IonContent className="ion-padding">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* === ION INPUT === */}
        <IonItem>
          <IonLabel>Todo</IonLabel>
          <IonInput
            {...register("todo", {
              required: "This is a required field"
            })}
          />
        </IonItem>
        <ErrorMessage
          errors={errors}
          name="todo"
          as={<div style={{ color: "red" }} />}
        />
        <IonButton type="submit">Add</IonButton>
      </form>
      <IonList>
        <IonLabel>Todo list</IonLabel>
        {renderTodoList()}
      </IonList>
    </IonContent>
  )
}

export default TodoForm
