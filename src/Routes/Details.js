import React from 'react';
import styles from './Details.module.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import ImageSlider from '../Components/ImageSlider/ImageSlider';



function Details(props) {
    return (
        <>
        <header>
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>
              <Link className={styles.NavLink} to={'/'}>
                <span>Wellness360</span>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                    <Link className={styles.NavLink} to={'/login'}>Sign in</Link>
                  </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        
        <div>
        <ImageSlider />
        </div>
     
        <Container fluid="md">
      <Row>
        <Col><h1 className={styles.headingPadding}>About</h1>
            <p>
            Introducing Wellness360, a cutting-edge Health and Fitness Tracker that transcends traditional boundaries. Seamlessly integrating with the powerful MERN stack, Wellness360 empowers users to log workouts, meals, and health metrics effortlessly. What sets Wellness360 apart is its revolutionary 'Inspiration and Guidance' feature, providing personalized exercise recommendations and real-time nutrition data while actively encouraging users on their wellness journey.
Wellness360 is not just a tracker; it's a holistic wellness companion. This innovative application delivers motivational content, personalized suggestions, and educational support to guide users toward a healthier lifestyle. The '360' in the name symbolizes a complete, all-encompassing approach to well-being, making Wellness360 the ultimate solution for those seeking a transformative and personalized health experience. Join us as we redefine health and fitness management, where tracking meets inspiration and guidance within the Wellness360 ecosystem. 
            </p></Col>
      </Row>
      <hr/>
    </Container>
     
            <Container className={styles.container}>
                <h1 className={styles.headingPadding}>We offer:</h1>
                <Row>
                    <Col xs={6} md={4}>
                        <h2 className={styles.SecondheadingPadding}>Comprehensive Health Tracking:</h2>
                        <p>
                            Easily log and track various aspects of your health, including workouts, meals, water intake, sleep patterns, and more.
                        </p>
                    </Col>
                    <Col xs={6} md={4}>
                        <h2 className={styles.SecondheadingPadding}>Personalized Recommendations:</h2>
                        <p>
                            Receive personalized exercise recommendations, nutrition plans, and wellness insights tailored to your goals and preferences.
                        </p>
                    </Col>
                    <Col xs={6} md={4}>
                        <h2 className={styles.SecondheadingPadding}>Real-Time Data Monitoring:</h2>
                        <p>
                            Monitor your progress in real-time with interactive charts and graphs that visualize your health metrics and fitness achievements.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={4}>
                        <h2 className={styles.SecondheadingPadding}>Goal Setting and Tracking:</h2>
                        <p>
                            Set achievable health and fitness goals and track your progress over time. Wellness360 helps you stay motivated and focused on reaching your objectives.
                        </p>
                    </Col>
                    <Col xs={6} md={4}>
                        <h2 className={styles.SecondheadingPadding}>Community Support and Accountability: </h2>
                        <p>
                            Connect with like-minded individuals, share experiences, and participate in challenges and events to stay motivated and accountable on your wellness journey.
                        </p>
                    </Col>
                    <Col xs={6} md={4}>
                        <h2 className={styles.SecondheadingPadding}>Educational Resources:</h2>
                        <p>
                            Gain access to a wealth of educational resources, articles, and tips from experts in health, fitness, nutrition, and holistic wellness.
                        </p>
                    </Col>
                </Row>
        </Container>
        </main>
    </>
    );
    
}

export default Details;