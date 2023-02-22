import "./TodoForm.css"
import React, { useMemo } from "react"
import {
  IonLabel,
  IonButton,
  IonContent,
  IonItem,
  IonInput,
  IonList,
  IonSkeletonText
} from "@ionic/react"

import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { useGetTodoListQuery } from "../services/todo.service"
import { TodoItem } from "../@types/todo"

type FormValues = {
  todo: string
}

const TodoForm: React.FunctionComponent = () => {
  const {
    data: todoData,
    isLoading,
    isFetching,
  } = useGetTodoListQuery(undefined)

  const todoRecord = useMemo(() => {
    return todoData as TodoItem[]
  }, [todoData])

  console.log("todoRecord", todoRecord)

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
    // const nextData = [...data]
    // nextData.push(value)
    // setData(nextData)
  }

  const handleDelete = (index: number) => {
    // const nextData = [...data]
    // nextData.splice(index, 1)
    // setData(nextData)
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
    if (isLoading || isFetching) {
      return (
        <IonItem>
          <div
            style={{ height: 24, width: 64, marginRight: 16, marginBottom: 12 }}
          >
            <IonSkeletonText animated={true} />
          </div>
          <IonLabel>
            <h3>
              <IonSkeletonText animated={true} style={{ width: "80%" }} />
            </h3>
            <IonSkeletonText animated={true} style={{ width: "30%" }} />
          </IonLabel>
        </IonItem>
      )
    }

    if (!todoRecord.length) {
      return <div>Empty</div>
    }

    return todoRecord.map((value, index) => (
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
        <IonLabel>{value.note}</IonLabel>
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
