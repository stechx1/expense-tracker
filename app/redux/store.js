'use client'
import { configureStore } from '@reduxjs/toolkit'
import  expenseSlice  from './addExpenseReducer'

export const store = configureStore({
  reducer: {expenseSlice},
})
