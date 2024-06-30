'use client'
import { configureStore } from '@reduxjs/toolkit'
import  expenseSlice  from './addExpenseReducer'
import IncomeSlice from './IncomeSlice'

export const store = configureStore({
  reducer: {expenseSlice,IncomeSlice},
})
