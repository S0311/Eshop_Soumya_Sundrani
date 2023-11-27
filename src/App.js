
import {React,useReducer,useNavigate} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import AddProducts from './components/AddProducts/AddProducts';
import UserProducts from './components/UserProducts/UserProducts';
import AdminProducts from './components/AdminProduct/AdminProduct';
import { initialState, reducer } from './components/Reducer/Reduce';
import EditProduct from './components/EditProduct/editProduct';
import ProductDetails from './components/ProductDetails/ProductDetails';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';

const App = () => {
  //const isLoggedIn = false; // Set this based on user login status
//  const isAdmin = true; // Set this based on user role
const [state, dispatch] = useReducer(reducer, initialState);
//const navigate=useNavigate();
  const handleLogout = () => {
    // Implement logout functionality
    console.log('User logged out');
    //navigate('/');
  };

  return (
    <Router>
      <NavBar isLoggedIn={state.isLogin} isAdmin={state.isAdmin} handleLogout={handleLogout} />
      <Routes>
       {/* {state.isLogin && */}
       <Route path="/" element={<Home />} />
        {!state.isLogin && 
       <Route path="/login" element={<Login state={state} dispatch={dispatch} />} />}
       {/* {!state.isLogin && */}
       <Route path="/signup" element={<Signup />} />
        {/* {state.isAdmin &&  */}
        <Route path="/add-products" element={<AddProducts data={state.role} />} />
        {/* {state.isLogin && */}
        <Route path="/productss" element={<UserProducts />} />
        {/* {state.isAdmin && state.isLoggedIn &&   */}
       <Route path="/products" element={<AdminProducts data={state.role} />} />
       <Route path="/product/:id" element={<EditProduct data={state.role} />} />
       <Route path="/productDetails/:id" element={<ProductDetails />} />
       <Route path="/Order/:name/:quantity" element={<PlaceOrder />} />

      </Routes>
    </Router>
  );
};

export default App;
