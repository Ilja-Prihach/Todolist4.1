import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"


export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists : state => state
  },
  reducers: (create) => ({
    // fetchTodolistAC: create.reducer<{ todolists : Todolist[] }>((_state, action) => {
    //   return action.payload.todolists.map((todolist) => ({...todolist, filter: 'all'}))
    // }),

    // deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
    //   const index = state.findIndex((todolist) => todolist.id === action.payload.id)
    //   if (index !== -1) {
    //     state.splice(index, 1)
    //   }
    // }),

    // changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
    //   const index = state.findIndex((todolist) => todolist.id === action.payload.id)
    //   if (index !== -1) {
    //     state[index].title = action.payload.title
    //   }
    // }),

    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),

    // createTodolistAC: create.preparedReducer(
    //   (title: string) => {
    //     const newTodolist: DomainTodolist = {
    //       id: nanoid(),
    //       title: title,
    //       filter: "all",
    //       addedDate: '',
    //       order: 1
    //     }
    //   return {payload: newTodolist}
    // },
    //   (state, action) =>  {
    //     state.push(action.payload)
    // })
    // createTodolistAC: create.reducer<{title: string, id: string}>((state, action) => {
    //   const newTodolist: Todolist = {
    //     id: action.payload.id,
    //     filter: "all" ,
    //     title: action.payload.title
    //   }
    //   state.push(newTodolist)
    // })
  }),
  extraReducers: (builder) => {
    builder.addCase(fetchTodolistsTC.fulfilled, (_state, action) => {
      return action.payload.todolists.map((todolist) => ({...todolist, filter: 'all'}))
    })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.push(action.payload)
      })
  }
})

export const createTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/createTodolistTC`,
  async (arg: {title: string}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try{
      const res = await todolistsApi.createTodolist(arg.title)
      const newTodolist: DomainTodolist = {
        ...res.data.data.item,
        filter: "all"
      }
      return newTodolist
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchTodolistsTC = createAsyncThunk(
  `${todolistsSlice.name}/fetchTodolistsTC`,
  async  (_arg, thunkAPI) => {
  const {rejectWithValue} = thunkAPI;
  try{
    const res = await todolistsApi.getTodolists()
      // dispatch(fetchTodolistAC({todolists : res.data}))
      return {todolists : res.data}
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (args: { id : string, title: string }, thunkAPI) => {
  const {rejectWithValue} = thunkAPI;
  try {
    await todolistsApi.changeTodolistTitle(args)
    return args
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const deleteTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolistTC`,
  async (arg: {id: string}, {rejectWithValue}) => {
    try {
      await todolistsApi.deleteTodolist(arg.id)
      return arg
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)



export const {changeTodolistFilterAC } = todolistsSlice.actions
export const {selectTodolists} = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer


// export type Todolist = {
//   id: string
//   title: string
//   filter: FilterValues
// }



export type DomainTodolist = Todolist & {filter: FilterValues};

export type FilterValues = "all" | "active" | "completed"
