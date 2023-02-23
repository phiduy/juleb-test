import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import { ACADEMY_URL } from "../constants/config"
import { ITodoItem } from "../@types/todo"
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
    getTodoList: builder.query<ITodoItem[], any>({
      providesTags: ["getTodoList"],
      query: (params) => ({
        url: CRUD_TODO_LIST_ENDPOINT,
        params
      })
    }),
    addTodo: builder.mutation<{ data: ITodoItem; success: boolean }, { note: string }>({
      invalidatesTags: ["getTodoList"],
      query: (body) => ({
        url: CRUD_TODO_ADD_ENDPOINT,
        method: "POST",
        body
      })
    }),
    updateTodo: builder.mutation<{ data: ITodoItem; success: boolean }, { id:string, body: { note: string } }>({
      invalidatesTags: ["getTodoList"],
      query: ({ id, body }) => ({
        url: CRUD_TODO_UPDATE_ENDPOINT(id),
        method: "PATCH",
        body
      })
    }),
    deleteTodo: builder.mutation<{ success: boolean }, string>({
      invalidatesTags: ["getTodoList"],
      query: (id) => ({
        url: CRUD_TODO_DELETE_ENDPOINT(id),
        method: "DELETE"
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
