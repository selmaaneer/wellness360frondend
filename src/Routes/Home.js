import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import styles from './Home.module.css'
import { Button } from 'react-bootstrap';

function Home(props) {
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


            <main className={styles.BgImage}>

                <div className={styles.Content}>

                    <h1>Welcome to Wellness360</h1>
                    <p className={styles.ParaPadding}>
                        Your Personalized Path to Better Health and Fitness!.
                    </p>
                    <Button variant="primary"><Link to={'/Details'}><span className={styles.Button}>To know more</span></Link></Button>{' '}
                </div>
            </main>
        </>
    );
}

export default Home;