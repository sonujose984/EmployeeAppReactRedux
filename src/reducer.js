import { fetch_request, fetch_success, fetch_failure, update_employee, delete_employee ,add_employee} from './action'
const EmployeeReducer = (state = {
    loading: false, data: [], error: null, modal: {
        showModal: false,
        selectedEmployee: null
    }
}, action) => {

    switch (action.type) {

        case fetch_request:
            return {
                ...state, loading: true, error: null
            };
        case fetch_success:
            return {
                ...state, loading: false, data: action.payload, error: null
            }
        case fetch_failure:
            return {
                ...state, loading: false, error: action.payload
            };
        case update_employee:

            const editedData = state.data.map(data => {
                if (data.id === action.payload.id) {
                    return { ...data, ...action.payload.newData };
                } else {
                    return data;
                }
            });
            return { ...state, data: editedData };

        case delete_employee:
            const filtereddatas = state.data.filter(data => data.id !== action.payload);
            return { ...state, data: filtereddatas };
            case add_employee:
                return {
                    ...state,
                    data: [...state.data, action.payload] 
                };
        default:
            return state;
    }

}
export default EmployeeReducer;