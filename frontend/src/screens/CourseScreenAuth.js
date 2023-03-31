import axios from '../components/axios';
import React, { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Card } from 'react-bootstrap';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import getError from '../utils';
import { Store } from '../store';



const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, course: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function CourseScreenAuth() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, course }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    course: [],
  }); // current state depends on previous state
  useEffect(() => {
    const fetchData = async () => {
      // dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/courses/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        console.log(err);
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  // const changeLink = (link) => {
  //   let id = link.split('?v=')[1]; //sGbxmsDFVnE
  //   let newid = id.split('&')[0];
  //   var embedlink = 'http://www.youtube.com/embed/' + newid;
  //   return embedlink;
  // };

  // const newLink = course.CourseContent
  //   ? changeLink(course.CourseContent[0].link)
  //   : '';


  return loading ? (
    <Loading />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Educaify</title>
      </Helmet>
      <div
        className="text-center h3"
        style={{
          backgroundImage:
            'linear-gradient(to right,rgba(255, 0, 0, 0),rgb(37, 95, 153) )',
          padding: '20px',
        }}
      >
        {course.Course_name}
      </div>
      <div>
          
      </div>
    </div>
  );
}

export default CourseScreenAuth;
