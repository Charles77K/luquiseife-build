import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		//addItem,
		addItem: (state, action) => {
			const existingItem = state.items.find(
				(item) => item.id === action.payload.id
			);
			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.items.push({
					...action.payload,
					quantity: 1,
				});
			}
		},
		//removeItem
		removeItem: (state, action) => {
			const existingItem = state.items.find(
				(item) => item.id === action.payload
			);
			if (existingItem) {
				if (existingItem.quantity === 1) {
					state.items = state.items.filter(
						(item) => item.id !== action.payload
					);
				} else {
					existingItem.quantity -= 1;
				}
			}
		},
		updateQuantity: (state, action) => {
			const { id, quantity } = action.payload;
			const item = state.items.find((item) => item.id === id);
			if (item) {
				item.quantity = quantity;
			}
		},
		//clearCart
		clearCart: (state) => {
			state.items = [];
		},
	},
});

export const { addItem, removeItem, clearCart, updateQuantity } =
	cartSlice.actions;

export default cartSlice.reducer;
