// FeedbackForm.js
import '../styles/feedback.css';
import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addFeedback } from '../redux/actions/feedbackActions';
import DefaultLayout from '../components/DefaultLayout';
import Footer from './Footer';
import { notification } from 'antd'
const FeedbackForm = (props) => {
  const [text, setText] = useState('');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (text.trim()) {
        // const {id} = props.match.params;
        // console.log(id)
      dispatch(addFeedback({ text ,name,email}));
      setText('');
    }
    notification.success({
      message: 'Thank you for your feedback!',
      description: 'We appreciate your valuable input.',
    });
  };

  return (
    <DefaultLayout>
   <div>
    <label className='form-label' style={{marginTop: "20px"}}>Name:</label>
    <br/>
    <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        className='text-input'
    />
    <br/>
    
   
    <label className='form-label'>Message:</label>
    <br/>
    <Input.TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Leave your feedback"
        style={{height: "120px"}}
        className='text-area mb-4'
    />
    <br/>
    <Button onClick={handleSubmit} className='submit-button mt-2 mb-3'>Submit Feedback</Button>
</div>

    <Footer/>
    </DefaultLayout>
  );
};

export default FeedbackForm;
