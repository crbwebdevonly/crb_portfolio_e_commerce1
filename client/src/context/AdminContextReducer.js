export const AdminContextReducer = (state, action) => {
	switch (action.type) {
		case "GET_ALL_USERS":
			return { ...state, usersList: action.payload };

			break;

		default:
			return state;
			break;
	}
};
