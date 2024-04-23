
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  expenses:[]
}

const expenseSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addExpenseFunction: (state,action) => {
          state.expenses.push(action.payload)
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { addExpenseFunction } = expenseSlice.actions

export default expenseSlice.reducer