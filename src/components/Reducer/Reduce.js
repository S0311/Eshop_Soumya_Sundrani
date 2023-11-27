// reducer.js
const initialState = {
    // Your initial state properties here
    isLogin: false,
    isAdmin:false,
    role:'',
    token:''
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'UserLogin':
        return { ...state, isLogin:true,isAdmin:false,role:'USER'};
      case 'AdminLogin':
        return { ...state, isLogin:true,isAdmin:true, role:action.payload};
        case 'AdminAddedProduct':
          return { ...state, isLogin:true,isAdmin:true};
      // Handle other actions as needed
      default:
        return state;
    }
  };
  
  export { initialState, reducer };