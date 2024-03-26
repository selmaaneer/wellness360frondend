import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ProfilePage.module.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


const ProfilePage = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [userProfile, setUserProfile] = useState(null);
    const [username, setUsername] = useState('');
    const [userId, setUserid] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editedProfile, setEditedProfile] = useState(null);
    

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Check if user is logged in
                if (!cookies.token) {
                    navigate('/login');
                } else {
                    // Fetch user authentication data
                    const response = await axios.post(
                        'https://wellness360backend.vercel.app/auth/user',
                        {},
                        { withCredentials: true }
                    );
                    console.log(response.data)
                   
                    const { status, user} = response.data;

                    setUsername(user.username);
                    setUserid(user.userId)
                    
                    if (!status) {
                        
                        removeCookie('token');
                        navigate('/login');
                    } else {
                        // Log user object to see its structure
                        console.log(user);
                        
                        // Set user profile data directly from authentication response
                        setUserProfile(user);
                        
                    }

                    
                }
            } catch (error) {
                console.error(error);
            }
        };

        
        fetchUserProfile();
       
    }, [cookies, navigate, removeCookie, userId])

    const Logout = () => {
        
        removeCookie('token');
        navigate('/login');
    };
    
    const handleEdit = () => {
       
        setEditedProfile({ ...userProfile });
        setEditMode(true);
    };

    const handleCancelEdit = () => {
   
        setEditedProfile(null);
        setEditMode(false);
    };

    const handleUpdateProfile = async () => {
        try {
            
            await axios.put(`https://wellness360backend.vercel.app/profile/${userId}`, editedProfile);
          
            setUserProfile(editedProfile);
            
            setEditMode(false);
            toast('Profile updated successfully', {
                position: 'top-right',
            });
        } catch (error) {
            console.error(error);
            toast('Failed to update profile', {
                position: 'top-right',
                type: 'error',
            });
        }
    };

    const handleChange = (e) => {
        // Update edited profile state when input fields change
        const { name, value } = e.target;
        setEditedProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };


    return (
        <>
            <header>
               
            <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>
              <Link className={styles.NavLink} to="/">
                <span>Wellness360</span>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Link className={styles.NavLink} to="/user">
                  hi <span>{username}</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="primary" onClick={Logout}>
                  LOGOUT
                </Button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
            </header>
            <div className={styles.profileContainer}>
                <main className={styles.profileContent}>
                    {/* Render userProfile data */}
                    {userProfile && (
                        <div className={styles.profileInfo}>
                            <h1>User Profile</h1>

                            <img src={userProfile.profilePicture} alt="Profile" />
                            {editMode ? (
                                // Render input fields for editing
                                <>
                                    <div className={styles.inputField}>
                                        <label htmlFor="email">Email:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editedProfile.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className={styles.inputField}>
                                        <label htmlFor="age">Age:</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={editedProfile.age}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className={styles.inputField}>
                                        <select
                                            name="gender"
                                            value={editedProfile.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <button className={styles.updateButton} onClick={handleUpdateProfile}>Update</button>
                                    <button className={styles.cancelButton} onClick={handleCancelEdit}>Cancel</button>
                                </>
                            ) : (
                                // Render profile data in view mode
                                <>
                                    <p>Email: {userProfile.email}</p>
                                    <p>Age: {userProfile.age}</p>
                                    <p>Gender: {userProfile.gender}</p>
                                    <button className={styles.editButton} onClick={handleEdit}>Edit</button>
                                </>
                            )}

                        </div>
                    )}

                </main>
            </div>
            <ToastContainer />
        </>
    );
};

export default ProfilePage;
