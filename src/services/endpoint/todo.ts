export const CRUD_TODO_ENDPOINT = "/todos"
export const CRUD_TODO_LIST_ENDPOINT = `${CRUD_TODO_ENDPOINT}`
export const CRUD_TODO_ADD_ENDPOINT = `${CRUD_TODO_ENDPOINT}`
export const CRUD_TODO_UPDATE_ENDPOINT =(id:string) => `${CRUD_TODO_ENDPOINT}/${id}`
export const CRUD_TODO_DELETE_ENDPOINT = (id:string) =>  `${CRUD_TODO_ENDPOINT}/${id}`
