import React, { useContext, useEffect, useReducer } from 'react';
import axios from '../components/axios';
import Course from '../components/Course';
import CourseOwned from '../components/CourseOwned';
import CourseCart from '../components/CourseCart';
import { Button, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import getError from '../utils';
import { useUserAuth } from '../contexts/AuthContext';
import { Store } from '../store';

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
function AllCourses() {
  const { currentUser } = useUserAuth();
  const { state } = useContext(Store);
  const { userInfo } = state;

  // const [courses, setCourses] = useState([]); // in order to save courses from backend
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
        <title>RESOURCE CENTER</title>
      </Helmet>

      {userInfo && userInfo.cart.length !== 0 && (
        <div className="mt-4">
          <h1 className='titles' >BOOKS FOR PURCHASE</h1>
          <Row>
            {userInfo &&
              userInfo.cart.map((id, index) => (
                <Col key={index} sm={4} md={3} lg={3} className="mb-5 mt-5">
                  <CourseCart id={id} />
                </Col>
              ))}
          </Row>
        </div>
      )}
    <h1 className="mt-5 mb-5 titles">RESOURCE CENTER</h1>

      <Row className='w-20'>
  
            <Button className='butzy' >TIER 3</Button>
            <Button className='butzy' >TIER 2</Button>
            <Button className='butzy' >TIER 1</Button>
          </Row>
      <div className="courses">
        {loading ? (
          <div>
            <Loading />
          </div>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {courses.courses.map((course) => (
              <Col key={course.slug} sm={4} md={3} lg={3} className="mb-5 mt-5">
                <Course course={course} />
              </Col>
            ))}
          </Row>
        )}
      </div>
      {userInfo && userInfo.buyedCourses.length !== 0 && (
        <div className="mt-4">
                      <h1 className='titles' >MY LIBRARY</h1>
          <Row className='w-20'>

            <Button className='butzy' >TIER 3</Button>
            <Button className='butzy' >TIER 2</Button>
            <Button className='butzy' >TIER 1</Button>
          </Row>
          <Row>
            {userInfo &&
              userInfo.buyedCourses.map((id, index) => (
                <Col key={index} sm={4} md={3} lg={3} className="mb-5 mt-5">
                  <CourseOwned id={id} />
                </Col>
              ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default AllCourses;
