// components/RootLayout.js

import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import styles from './RootLayout.module.css';

const RootLayout = () => {

  return (
    <>
      <Outlet />
      <footer>
        <Card className="text-center">
          <Card.Footer className="text-muted">
            <div className={styles.Footer}>
              <div className={styles.Fsub}>
                Copyright © 2024 Wellness360. Built by Selma Aneer.
              </div>
            </div>
          </Card.Footer>
        </Card>
      </footer>
    </>
  );
};

export default RootLayout;
