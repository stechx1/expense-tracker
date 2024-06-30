
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  expenses:[],
  isModalOpen:false
}

const incomeSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addIncomFunction: (state,action) => {
          state.expenses.push(action.payload)
    },
    toggleModalFunction:(state,action)=>{

        console.log("action => ",action.payload)
         state.isModalOpen = action.payload
    }
   
  },
})

// Action creators are generated for each case reducer function
export const { addIncomFunction,toggleModalFunction } = incomeSlice.actions

export default incomeSlice.reducer