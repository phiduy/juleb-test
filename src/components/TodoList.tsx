import "./TodoForm.css"
import React, { useMemo } from "react"
import { IonLabel, IonItem, IonList, IonSkeletonText } from "@ionic/react"

import { useGetTodoListQuery } from "../services/todo.service"
import { ITodoItem } from "../@types/todo"

import TodoItem from "./TodoItem"

const TodoList: React.FunctionComponent = () => {
  const { data: todoData, isLoading } = useGetTodoListQuery(undefined)

  const todoRecord = useMemo(() => {
    return todoData as ITodoItem[]
  }, [todoData])

  const renderTodoList = () => {
    if (isLoading) {
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

    if (!todoRecord) {
      return <div>Empty</div>
    }

    return todoRecord.map((value) => (
      <TodoItem key={`todo_list_item_${value.id}`} item={value} />
    ))
  }

  return (
    <IonList>
      <IonLabel>Todo list</IonLabel>
      {renderTodoList()}
    </IonList>
  )
}

export default TodoList
