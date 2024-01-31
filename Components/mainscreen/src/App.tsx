import { useState } from 'react';
import styles from './styles.css';

const randomImages = [
  'https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg',
  'https://images.pexels.com/photos/1540977/pexels-photo-1540977.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.unsplash.com/photo-1590071089561-2087ff1fc418?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDN8fHxlbnwwfHx8fHw%3D&w=1000&q=80',
  'https://images.unsplash.com/photo-1560222821-f3357dea2ee9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDZ8fHxlbnwwfHx8fHw%3D&w=1000&q=80',
  'https://c0.wallpaperflare.com/preview/883/843/764/person-holding-camera.jpg'
];

const App = () => {
  const [imageSources, setImageSources] = useState(randomImages);

  const handleChangePicture = (index: any) => {
    const newImageSources = [...imageSources];
    newImageSources[index] = getRandomImage();
    setImageSources(newImageSources);
  };

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    return randomImages[randomIndex];
  };

  return (
    <div>
      <h1>Main Screen in React</h1>
      <div className={styles.maincontainer}>
        {imageSources.map((src, index) => (
          <div key={index}>
            <img width="250" height="350" src={src} alt={`Image ${index + 1}`} />
            <button className={styles.button} onClick={() => {
              handleChangePicture(index)
              window.oc.cart.addToCart()
            }}>
              Change Picture
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
