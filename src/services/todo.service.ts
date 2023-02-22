import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import { ACADEMY_URL } from "../constants/config"
import { TodoItem } from "../@types/todo"
import {
  CRUD_TODO_LIST_ENDPOINT,
  CRUD_TODO_ADD_ENDPOINT,
  CRUD_TODO_UPDATE_ENDPOINT,
  CRUD_TODO_DELETE_ENDPOINT
} from "./endpoint"

const todoApi = createApi({
  reducerPath: "todoApi",
  refetchOnReconnect: false,
  tagTypes: ["getTodoList"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    headers: {
      "Content-Type": "application/json"
    }
  }),
  endpoints: (builder) => ({
    getTodoList: builder.query<TodoItem[], any>({
      providesTags: ["getTodoList"],
      query: (params: any) => ({
        url: CRUD_TODO_LIST_ENDPOINT,
        params
      })
    }),
    addTodo: builder.mutation<{ data: TodoItem[] }, any>({
      invalidatesTags: ["getTodoList"],
      query: (body: any) => ({
        url: CRUD_TODO_ADD_ENDPOINT,
        method: "POST",
        body
      })
    }),
    updateTodo: builder.mutation<{ data: TodoItem[] }, any>({
      invalidatesTags: ["getTodoList"],
      query: (body: any) => ({
        url: CRUD_TODO_UPDATE_ENDPOINT,
        method: "PUT",
        body
      })
    }),
    deleteTodo: builder.mutation<{ data: TodoItem[] }, any>({
      invalidatesTags: ["getTodoList"],
      query: (body: any) => ({
        url: CRUD_TODO_DELETE_ENDPOINT,
        method: "DELETE",
        body
      })
    })
  })
})

export const {
  useGetTodoListQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation
} = todoApi

export default todoApi
