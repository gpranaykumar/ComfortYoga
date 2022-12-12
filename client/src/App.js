import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import useAuth from './hooks/UseAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import UserHome from './pages/UserHome';
import Meditation from './assets/yoga1.png'
//Meditation.svg
import Header from './Components/Header';
import PaymentHistory from './pages/PaymentHistory';
import Lottie from 'react-lottie';
import loadingJson from './assets/yoga-animation.json'
import AllUsers from './pages/AllUsers';
import Footer from './Components/Footer';
function App() {
  const {isLoggedIn, loading, user} = useAuth()
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingJson,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className='relative min-h-screen flex flex-col'>
      {loading && (
        <>
        <div className='z-50 absolute top-0 left-0 min-h-screen h-full w-full bg-black/50 flex flex-col items-cener justify-center'>
        <div className=''>
          <Lottie 
            options={defaultOptions}
              height={400}
              width={400}
            />
        </div>
      </div>
      </>
      )}
      <Header />
      {/* bg-gradient-radial from-[#77d9e8] via-primary  to-[#008296] */}
      <div className='flex-grow relative  flex  flex-col md:flex-row items-center justify-evenly pb-8'>
        <img src={Meditation} alt='Meditation' className='h-[500px] w-[500px] p-5' />
        {!isLoggedIn? (
          <Routes>
            <Route exact path="/"element={<Home />} />
            <Route exact path="login" element={<Login />} />
            <Route exact path="register" element={<Register />} />
          </Routes>
        ): (
        <Routes>
          <Route path="/" >
            <Route  path="paymenthistory" element={<PaymentHistory />} />
            {user?.role === 1 && (
            <Route  path="allusers" element={<AllUsers />} />
            )}
            <Route index element={<UserHome />} />
            <Route path="*" element={<UserHome />} />
          </Route>
        </Routes>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
