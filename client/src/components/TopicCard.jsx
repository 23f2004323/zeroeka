import React, { useState } from 'react';
import axios from 'axios';
import './TopicCard.css';

function TopicCard({ topic, onUpdateStatus, onDelete }) {
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'status-completed';
      case 'In Progress': return 'status-progress';
      default: return 'status-not-started';
    }
  };

  const handleStatusChange = async (newStatus) => {
    await onUpdateStatus(topic._id, newStatus);
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete "${topic.name}"?`)) {
      await onDelete(topic._id);
    }
  };

  const handleGetExplanation = async () => {
    if (explanation) {
      setShowExplanation(!showExplanation);
      return;
    }
    
    setIsExplaining(true);
    try {
      const response = await axios.post(`http://localhost:5000/api/topics/${topic._id}/explain`);
      if (response.data.success) {
        setExplanation(response.data.data.explanation);
        setShowExplanation(true);
      }
    } catch (err) {
      console.error('Error:', err);
      setExplanation('Sorry, could not get explanation. Please try again.');
      setShowExplanation(true);
    } finally {
      setIsExplaining(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="topic-card">
      <div className="topic-header">
        <h3 className="topic-name">{topic.name}</h3>
        <button onClick={handleDelete} className="delete-btn">×</button>
      </div>
      <div className="topic-category">{topic.category}</div>
      <div className="topic-status-section">
        <label>Status:</label>
        <select 
          value={topic.status} 
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`status-select ${getStatusColor(topic.status)}`}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="topic-meta">
        Updated: {formatDate(topic.updatedAt)}
      </div>
      <button onClick={handleGetExplanation} className="explain-btn" disabled={isExplaining}>
        {isExplaining ? ' Getting explanation...' : ' What is this?'}
      </button>
      {showExplanation && explanation && (
        <div className="explanation-box">
          <div className="explanation-header">
            <strong>About {topic.name}</strong>
            <button onClick={() => setShowExplanation(false)} className="close-explanation">×</button>
          </div>
          <p className="explanation-text">{explanation}</p>
        </div>
      )}
    </div>
  );
}

export default TopicCard;