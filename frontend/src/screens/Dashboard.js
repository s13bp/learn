import { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Course from '../components/Course';
import { Store } from '../store';
import CourseOwned from '../components/CourseOwned';
import { Helmet } from 'react-helmet-async';
export default function Dashboard() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return (
    <div>
    <Helmet>
      <title>Dashboard</title>
    </Helmet>
     
      <div className="mt-4">
        {userInfo !== 0 && (
          <div className="mt-1">
            <h1 className='titles'>MY DASHBOARD</h1>
            <div className="parent3">
              <div className="div111 shadow"> </div>
            
              <div className="div222 shadow"> </div>
              <div className="div333 shadow"> </div>
              <div className="div444 shadow"> </div>
              <div className="div555 shadow"> 
                <h1 className="tits" >TRANSACTION HISTORY</h1>
              </div>
              <div className="div666 shadow">  <h1 className="tits" >MY REFERRALS</h1> </div>

            </div>
            <button className="refbut butzy" >COPY REFERRAL LINK</button>
        
          </div>
        )}
      </div>
    </div>
  );
}
