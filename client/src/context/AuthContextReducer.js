export const AuthContextReducer = (state, action) => {
	switch (action.type) {
		case "SET_ERROR":
			return { ...state, error: true };
		case "CLEAR_ERROR":
			return { ...state, error: false };
		case "LOGIN_SUCCESS":
			return { ...state, user: action.payload, error: false };
		case "REGISTER_SUCCESS":
			return { ...state, user: action.payload, error: false };

		case "DO_LOGOUT":
			return { ...state, user: null, error: false };

		case "LOGIN_FAIL":
			return { ...state, user: null, error: true };

		default:
			return state;
	}
};
