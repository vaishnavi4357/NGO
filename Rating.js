// src/components/Rating.js
import React, { useState } from 'react';
import { firestore } from '../firebaseConfig';

const Rating = ({ ngoId }) => {
  const [rating, setRating] = useState(0);

  const handleRating = async (newRating) => {
    const ngoRef = firestore.collection('ngos').doc(ngoId);
    await ngoRef.update({
      ratings: firebase.firestore.FieldValue.arrayUnion(newRating)
    });
    setRating(newRating);
  };

  return (
    <div>
      <h3>Rate this NGO</h3>
      {[1, 2, 3, 4, 5].map(num => (
        <button key={num} onClick={() => handleRating(num)}>
          {num} Star
        </button>
      ))}
    </div>
  );
};

export default Rating;
