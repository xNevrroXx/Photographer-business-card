import Header from '../../header/Header';

import "./not-found.scss";

const NotFound = () => {
   return (
      <div className="not-found-page">
         <div className="container">
            <Header />
            
            <h3>404 - Page not Found</h3>
         </div>
      </div>
   )
}

export default NotFound;