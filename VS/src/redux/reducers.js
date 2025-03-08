const initialState = {
    tasks: [],
    isAuthenticated: false,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TASK':
        return { ...state, tasks: [...state.tasks, action.payload] };
      case 'DELETE_TASK':
        return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
      case 'LOGIN':
        return { ...state, isAuthenticated: true };
      case 'LOGOUT':
        return { ...state, isAuthenticated: false };
      default:
        return state;
    }
  };
  
  export default rootReducer;