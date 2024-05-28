import React, { useState } from 'react';
import "./Talentprofile.css";

const Talentprofile = () => {
  const [image, setImage] = useState(localStorage.getItem('avatarUrl') || '');
  const [skills, setSkills] = useState('');
  const [description, setDescription] = useState('');

 const handleImageChange = (event) => {
  if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();
    
    reader.onloadend = () => {
      setImage(reader.result);
      localStorage.setItem('avatarUrl', reader.result);
    }

    reader.readAsDataURL(event.target.files[0]);
  }
};

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Image:', image);
    console.log('Skills:', skills);
    console.log('Description:', description);
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle} className="profile">
      <h1>Your Profile</h1>
      <label>
        Profile Image:
        <input type="file" onChange={handleImageChange} style={inputStyle} />
        {image && <img src={image} alt="Profile" style={{ width: '100%', height: 'auto' }} />}
      </label>
      <label>
        Skills:
        <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} style={inputStyle} />
      </label>
      <label>
        About Me:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} />
      </label>
      <button type="submit" style={inputStyle}>Save Profile</button>
    </form>
  );
};

export default Talentprofile;