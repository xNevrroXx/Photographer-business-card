import {FC} from "react";
// styles
import "./not-found.scss";
// own modules
import Header from '../../components/header/Header';

const  NotFound: FC = () => {
   return (
      <div className="not-found-page">
         <div className="container">
            <Header/>
            <h3>404 - Page not Found</h3>
         </div>
      </div>
   )
}

export default NotFound;