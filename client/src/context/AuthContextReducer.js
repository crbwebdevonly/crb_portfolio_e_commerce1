import { myAxios } from "../myAxios";

export const AuthContextReducer = (state, action) => {
	switch (action.type) {
		case "DO_LOGIN":
			{
				console.log(action.payload, "reducer");
				console.log(action.payload, "reducer");
				
			}
			break;

		default:
			return state;
			break;
	}
};
