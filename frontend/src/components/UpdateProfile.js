import React from 'react';
import { Button, Card, Form, FormGroup, FormLabel } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import MessageBox from '../components/MessageBox';
import axios from '../components/axios';
import getError from '../utils';
import { useUserAuth } from '../contexts/AuthContext';
import { Store } from '../store';

export default function UpdateProfile() {
  const { currentUser } = useUserAuth();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const [name, setName] = useState(userInfo.name);
  const [username, setUserName] = useState(userInfo.user_name);
  const [img, setImg] = useState('edit');
  const [profileURL, setProfileURL] = useState(
    userInfo.image ||
      'https://m.media-amazon.com/images/I/51UW1849rJL._AC_SY450_.jpg'
  );

  const uploadProfileImage = async (event) => {
    const files = event.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'Image_upload');
    data.append('cloud_name', 'educatify-image');
    await fetch(
      'https://api.cloudinary.com/v1_1/educatify-image/image/upload',
      {
        method: 'POST',
        body: data,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setProfileURL(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function HandleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(false);
      setError('');
      try {
        const res = await axios.post('/api/users/updateuser', {
          email: userInfo.email,
          name: name,
          user_name: username,
          image: profileURL,
        });
        await ctxDispatch({ type: 'UPDATE_USER', payload: res.data });
        localStorage.setItem('userInfo', JSON.stringify(res.data));
      } catch (error) {
        setError(error);
      }
      navigate('/dashboard');
    } catch (error) {
      getError(error);
    }
    setLoading(false);
  }
  return (
    <div >
          <Helmet>
            <title>MY PROFILE</title>
          </Helmet>

          <h4 className="my-3  mb-4 titles">MY ACCOUNT </h4>
          {error && <MessageBox variant="danger">{error}</MessageBox>}

          <div className="parent4">
<div className="div01 shadow"> 
<Form className='centrez' onSubmit={HandleSubmit}>
            <img
              height={200}
              width={200}
              className="circolo"
              id="uploadedimage"
              src={profileURL}
              alt="profile-pic"
            ></img>
            <label
              htmlFor="filePicker"
              className=" butzy"
              style={{
                background: 'rgb(36 58 91)',
                padding: '5px 10px',
                color: 'white',
              }}
            >
              {img}
            </label>

            <input
              className=" thumbnailupload mb-1 "
              id="filePicker"
              type="file"
              name="thumbnail"
              placeholder="edit"
              onChange={uploadProfileImage}
            />
<Button className="butzy up" >BADGE</Button>
            <FormGroup className="mb-5  " id="name">
              <FormLabel>USERNAME</FormLabel>
              <Form.Control
                className="formzy"
                type="text"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                defaultValue={userInfo.name}
              />
            </FormGroup>
            <FormGroup className="mb-3 " id="username">
            <FormLabel className="centrez" >WALLET</FormLabel>
              <Form.Control
                className="formzy"
                type="text"
                autoComplete="username"
                onChange={(e) => setUserName(e.target.value)}
                defaultValue={userInfo.user_name}
              />
            </FormGroup>
            <Button className=" butzy" disabled={loading} type="submit">
              Update
            </Button>
   </Form>
</div>
<div className="div02 shadow"> </div>
<div className="div03 shadow"> </div>
<div className="div04 shadow "> </div>
<div className="div05 shadow ">
  <h1 className='text-center' >NOTIFICATIONS</h1>
   </div>


</div>

    </div>
  );
}
