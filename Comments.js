// src/components/Comments.js
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebaseConfig';

const Comments = ({ ngoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const commentsSnapshot = await firestore.collection('ngos').doc(ngoId).collection('comments').get();
      const commentsList = commentsSnapshot.docs.map(doc => doc.data());
      setComments(commentsList);
    };

    fetchComments();
  }, [ngoId]);

  const handleAddComment = async () => {
    const ngoRef = firestore.collection('ngos').doc(ngoId);
    await ngoRef.collection('comments').add({ text: newComment });
    setNewComment('');
    // Update comments state
    setComments([...comments, { text: newComment }]);
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.text}</li>
        ))}
      </ul>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default Comments;
