import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './Comments.css'; 

const COMMENTS_URL = "/back/rest/comments";

function CommentsByCompany() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const companyId = params.get('companyId');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`${COMMENTS_URL}/${companyId}`);
                if (response.ok) {
                    const commentsData = await response.json();
                    setComments(commentsData);
                } else {
                    throw new Error('Failed to fetch comments');
                }
            } catch (error) {
                console.error('Failed to fetch comments', error);
                setError('Failed to fetch comments');
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [companyId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Comments By Company {companyId}</h2>
            <div className="comments-container">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment-card">
                        <h3>User: {comment.user}</h3>
                        <p>Text: {comment.text}</p>
                        <p>Date: {comment.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentsByCompany;
