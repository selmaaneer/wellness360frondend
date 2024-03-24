import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import styles from './HomePage.module.css'

const HomePage = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [workouts, setWorkouts] = useState([]);
    const [formData, setFormData] = useState({
        exerciseType: '',
        duration: '',
        intensity: ''
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (!cookies.token) {
                    navigate('/login');
                } else {
                    const { data } = await axios.post(
                        'https://wellness360-backend-fn5j.vercel.app/auth/user',
                        {},
                        { withCredentials: true }
                    );
                    const { status, user } = data;
                    setUsername(user.username);
                    setUserId(user.userId);

                    if (!status) {
                        removeCookie('token');
                        navigate('/login');
                    } else {
                        const response = await axios.get(`https://wellness360-backend-fn5j.vercel.app/users/workouts/${user.userId}`);
                        setWorkouts(response.data);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserProfile();
    }, [cookies, navigate, removeCookie]);

    const handleLogout = () => {
        removeCookie('token');
        navigate('/login');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        console.log(userId);
        try {
            const res = await axios.post('https://wellness360-backend-fn5j.vercel.app/users/workouts', { ...formData, userId });
            setWorkouts([...workouts, res.data]);
            console.log(res.data)
            setFormData({
                exerciseType: '',
                duration: '',
                intensity: ''
            });
            toast.success('Workout logged successfully', { position: 'top-right' });
        } catch (err) {
            console.error(err);
            toast.error('Failed to log workout', { position: 'top-right' });
        }
    };

    const handleEditWorkout = (workoutId) => {
        console.log(workoutId);
        setWorkouts(prevWorkouts => prevWorkouts.map(workout =>
            workout._id === workoutId ? { ...workout, editMode: true } : workout
        ));
    };
    
    const handleCancelEditWorkout = (workoutId) => {
        setWorkouts(prevWorkouts => prevWorkouts.map(workout =>
            workout._id === workoutId ? { ...workout, editMode: false } : workout
        ));
    };
    
    const handleUpdateWorkout = async (workoutId, updatedWorkout) => {
        try {
            console.log('workout id:' + workoutId);
            await axios.put(`https://wellness360-backend-fn5j.vercel.app/users/workouts/${workoutId}`, updatedWorkout);
            const updatedWorkouts = workouts.map(workout =>
                workout._id === workoutId ? { ...updatedWorkout, editMode:false} : workout
            );
            console.log('updated data:', updatedWorkouts);
            setWorkouts(updatedWorkouts);
    
            toast.success('Workout updated successfully', {
                position: 'top-right',
            });
        } catch (error) {
            console.error(error);
            toast.error('Failed to update workout', {
                position: 'top-right',
                type: 'error',
            });
        }
    };
    
    
    
    const handleChangeWorkout = (e, workoutId) => {
        const { name, value } = e.target;
        setWorkouts(prevWorkouts => prevWorkouts.map(workout =>
            workout._id === workoutId ? { ...workout, [name]: value } : workout
        ));
    };
    
    const handleDeleteWorkout = async (workoutId) => {
        try {
            await axios.delete(`https://wellness360-backend-fn5j.vercel.app/users/workouts/${workoutId}`);
            const updatedWorkouts = workouts.filter(workout => workout._id !== workoutId);
            setWorkouts(updatedWorkouts);
            toast.success('Workout deleted successfully', { position: 'top-right' });
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete workout', { position: 'top-right' });
        }
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
                                <Link className={styles.NavLink} to="/profile">
                                    Hi <span>{username}</span>
                                </Link>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <Button variant="primary" onClick={handleLogout}>
                                    LOGOUT
                                </Button>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <section>
                <div className={styles.home_page}>
                    <h4>
                        Welcome <span>{username}</span>
                    </h4>
                    <button onClick={handleLogout}>LOGOUT</button>
                </div>
                <ToastContainer />
            </section>
            <section className={styles.section}>
                <div className={styles.workoutLogging}>
                    <h1>Workout Logging</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="exerciseType" value={formData.exerciseType} onChange={handleChange} placeholder="Exercise Type" required />
                        <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (minutes)" required />
                        <input type="text" name="intensity" value={formData.intensity} onChange={handleChange} placeholder="Intensity" required />
                        <button type="submit">Log Workout</button>
                    </form>
                </div>
            </section>
            <section className={styles.section}>
                <div className={styles.workoutHistory}>
                <h1>Workout History</h1>
                    <ul>
                        {workouts.map(workout => (
                            <li key={workout._id}>
                                <p>Exercise Type: {workout.exerciseType}</p>
                                <p>Duration: {workout.duration} minutes</p>
                                <p>Intensity: {workout.intensity}</p>
                                {workout.editMode ? (
                                    <>
                                        <input
                                            type="text"
                                            name="exerciseType"
                                            value={workout.exerciseType}
                                            onChange={(e) => handleChangeWorkout(e, workout._id)}
                                        />
                                        <input
                                            type="number"
                                            name="duration"
                                            value={workout.duration}
                                            onChange={(e) => handleChangeWorkout(e, workout._id)}
                                        />
                                        <input
                                            type="text"
                                            name="intensity"
                                            value={workout.intensity}
                                            onChange={(e) => handleChangeWorkout(e, workout._id)}
                                        />
                                        <button className={styles.updateButton} onClick={() => handleUpdateWorkout(workout._id, workout)}>Update</button>
                                        <button className={styles.cancelButton}onClick={() => handleCancelEditWorkout(workout._id)}>Cancel</button>
                                    </>
                                ) : (
                                    <div>
                                        <button className={styles.editButton}onClick={() => handleEditWorkout(workout._id)}>Edit</button>
                                        <button className={styles.deleteButton}onClick={() => handleDeleteWorkout(workout._id)}>Delete</button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

        </>
    );
};

export default HomePage;
