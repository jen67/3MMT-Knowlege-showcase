import React, { useState } from 'react';

const Profile = () => {
  const [logo, setLogo] = useState(null);

  const handleLogoChange = (event) => {
    setLogo(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!logo) {
      alert("Please select a file before submitting");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("logoUrl", reader.result);
    };
    reader.readAsDataURL(logo);
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px'
  };

  const inputStyle = {
    margin: '10px 0',
    padding: '10px',
    width: '200px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  };

  return (
    <form onSubmit={handleFormSubmit} style={formStyle}>
      <input type="file" onChange={handleLogoChange} style={inputStyle} />
      <button type="submit" style={buttonStyle}>Upload Logo</button>
    </form>
  );
};

export default Profile;