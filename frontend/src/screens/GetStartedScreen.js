import React, { useContext, useEffect, useReducer } from 'react';
import axios from '../components/axios';
import Course from '../components/Course';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import getError from '../utils';
import { Link } from 'react-router-dom';
import logo from '../assests/getStarted.jpg';
import { useUserAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Store } from '../store';
import video from '../assests/video.mp4'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, courses: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function GetStarted() {
  const { currentUser } = useUserAuth();
  const [{ loading, error, courses }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    courses: [],
  }); // current state depends on previous state
  useEffect(() => {
    const fetchData = async () => {
      // dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/courses');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []); //empty array coz we gonnna run this function only once after rendering this component

  return (
    <div>
      <Helmet>
        <title>HealthIQ</title>
      </Helmet>
      <Container className="container-home" >
      <div className="parent">
        <div className="div1"> <img className="picha" src={logo} /> </div>
 
        <div className="div2"> <p>I really love coding in React. It’s so enjoyable to create something in React and I love the organization of the code. I’ve been using Hostinger’s shared hosting plan to deploy my React applications. Every time I do, I have to look up and see what I did before to get it up and running smoothly. So I’m putting it here, mostly as a reminder to myself but also in hopes that it will help someone else. :)</p> </div>
        <div className="div3"> <h1>About HealthIQ</h1> </div>
        
      </div>
      <div>
        <h1 className='tits'>Train Our AI Be Smarter, Get Rewards !</h1>
            <video  className="appzy" width="750" height="500" controls >
            <source src={video} type="video/mp4"/>
          </video>
      </div>
      <div className="parent2">
<div className="div11 shadow">
  <h1  >TIER 1</h1>
  <ul>
    <li>List item 2.1</li>
    <li>List item 2.2</li>
    <li>List item 2.3</li>
    <li>List item 2.1</li>
    <li>List item 2.2</li>
    <li>List item 2.3</li>
    <li>List item 2.3</li>
  </ul>
  <button className='butzy' >ACTIVATE - 50 USDT</button>
   </div>
<div className="div22 shadow">
<h1  >TIER 2</h1>
<ul>
    <li>List item 2.1</li>
    <li>List item 2.2</li>
    <li>List item 2.3</li>
    <li>List item 2.1</li>
    <li>List item 2.2</li>
    <li>List item 2.3</li>
    <li>List item 2.1</li>
    <li>List item 2.2</li>
    <li>List item 2.3</li>
    <li>List item 2.3</li>
  </ul>
  <button className='butzy' >ACTIVATE </button>
 </div>
<div className="div33 shadow"> 
<h1  >TIER 3</h1>
<ul>
    <li>List item 2.1</li>
    <li>List item 2.2</li>
    <li>List item 2.3</li>
    <li>List item 2.1</li>
    <li>List item 2.2</li>
    <li>List item 2.3</li>
    <li>List item 2.1</li>
    <li>List item 2.2</li>
    <li>List item 2.3</li>
    <li>List item 2.1</li>
    <li>List item 2.2</li>
    <li>List item 2.3</li>
  </ul>
  <button className='butzy' >ACTIVATE - 1500 USDT</button>
 </div>
<div className="div44"> <h1>TIERS</h1> <p>I really love coding in React. It’s so enjoyable to create something in React and I love the organization of the code. I’ve been using Hostinger’s shared hosting plan to deploy my React applications. Every time I do, I have to look up and see what I did before to get it up and running smoothly. So I’m putting it here, mostly as a reminder to myself but also in hopes that it will help someone else. :)</p></div>
</div>
      </Container>
    

    </div>
  );
}

export default GetStarted;
