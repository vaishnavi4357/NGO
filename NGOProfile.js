// src/components/NGOProfile.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { firestore } from '../firebaseConfig';

const NGOProfile = () => {
  const { id } = useParams();
  const [ngo, setNgo] = useState(null);

  useEffect(() => {
    const fetchNgo = async () => {
      const ngoDoc = await firestore.collection('ngos').doc(id).get();
      if (ngoDoc.exists) {
        setNgo(ngoDoc.data());
      }
    };

    fetchNgo();
  }, [id]);

  if (!ngo) return <div>Loading...</div>;

  return (
    <div>
      <h1>{ngo.name}</h1>
      <ReactMarkdown>{ngo.description}</ReactMarkdown>
      <div>Contact: {ngo.contactDetails}</div>
      <div>Website: <a href={ngo.website} target="_blank" rel="noopener noreferrer">{ngo.website}</a></div>
      {/* Ratings and Comments components here */}
    </div>
  );
};

export default NGOProfile;
