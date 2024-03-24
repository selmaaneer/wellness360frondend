import React from 'react';
import styles from './ImageSlider.module.css'
import Carousel from 'react-bootstrap/Carousel';


function ImageSlider(props) {
    return (
      <>
        <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <span>                                                                                                                     
         <img
          className="d-block w-100"
          src="https://static.vecteezy.com/system/resources/previews/022/643/990/large_2x/young-asian-couple-cooking-with-fruits-and-vegetables-and-using-laptop-in-the-kitchen-to-cook-food-together-within-the-family-happily-family-concept-photo.jpg"
          alt="First slide"
        />
        </span>
     
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.insider.com/64dd021b4ef9f30019f840f5?width=1136&format=jpeg"
          alt="Second slide"
        />
      
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://st2.depositphotos.com/3917667/6051/i/450/depositphotos_60515015-Meditating-woman-with-laptop.jpg"
          alt="Third slide"
        />
       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cdn.cdnparenting.com/articles/2019/01/21120025/1195922569-H-1024x700.webp"
          alt="Third slide"
        />
       
      </Carousel.Item>
    </Carousel>
            
        </>
    );
}

export default ImageSlider;