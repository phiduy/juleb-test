import "./TodoForm.css"
import React, { CSSProperties, ReactNode } from "react"
import {
  IonLabel,
  IonButton,
  IonItem,
  IonInput,
  IonSpinner
} from "@ionic/react"

import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { useAddTodoMutation } from "../services/todo.service"

type FormValues = {
  todo: string
}

interface Props {
  actions?: ReactNode
  defaultValues?: FormValues
  style?: CSSProperties
  onSubmit?: (data: FormValues) => void;
}

const TodoForm: React.FunctionComponent<Props> = ({
  style,
  defaultValues,
  onSubmit: onSubmitCustom,
  actions
}) => {
  const {
    handleSubmit,
    register,
    resetField,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: defaultValues || {
      todo: ""
    }
  })

  const [addTodo, { isLoading: isAdding }] = useAddTodoMutation()

  const handleAdd = async (value: string) => {
    try {
      const response = await addTodo({ note: value }).unwrap()
      if (response.success) {
        return
      }
    } catch (error) {
      console.log("hello")
    }
  }

  /**
   *
   * @param data
   */
  const onSubmit = (data: FormValues) => {
    if(onSubmitCustom) {
      onSubmitCustom(data)
    }else {
      handleAdd(data.todo)
    }
    resetField("todo")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='todo-form'
      style={style}
    >
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
      {actions || (
        <IonButton type="submit" disabled={isAdding}>
          {isAdding ? (
            <IonSpinner name="crescent" style={{ width: 18 }} />
          ) : (
            "Add"
          )}
        </IonButton>
      )}
    </form>
  )
}

export default TodoForm
