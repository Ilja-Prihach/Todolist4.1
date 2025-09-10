import { useAppDispatch, useAppSelector } from "@/common/hooks"

import { TodolistItem } from "./TodolistItem/TodolistItem.tsx"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { fetchTodolistsTC, selectTodolists } from "@/features/todolists/model/todolistsSlice.ts"
import { useEffect } from "react"


export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
      dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
