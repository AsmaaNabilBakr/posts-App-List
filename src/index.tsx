import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import HeaderComponent from './Components/CoreComponents/Header';
import FooterComponent from './Components/CoreComponents/Footer';
import Home from './Components/Pages/Home/Home';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import EditPage from './Components/Pages/EditPage/EditPage';
import posts from './db.json'

ReactDOM.render(
  <>
  <HeaderComponent />
  <div className="pageWrapper" >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home allPostsData={posts}/>} />
        <Route path="/Edit/:id" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  </div>
  <FooterComponent />
</>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
