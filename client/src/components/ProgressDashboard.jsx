import React from 'react';
import './ProgressDashboard.css';

function ProgressDashboard({ topics }) {
  const totalTopics = topics.length;
  const completedTopics = topics.filter(t => t.status === 'Completed').length;
  const inProgressTopics = topics.filter(t => t.status === 'In Progress').length;
  const notStartedTopics = topics.filter(t => t.status === 'Not Started').length;
  const percentage = totalTopics === 0 ? 0 : (completedTopics / totalTopics) * 100;

  return (
    <div className="dashboard">
      <h2> Progress Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{totalTopics}</div>
          <div className="stat-label">Total Topics</div>
        </div>
        
        <div className="stat-card completed">
          <div className="stat-value">{completedTopics}</div>
          <div className="stat-label">Completed</div>
        </div>
        
        <div className="stat-card progress">
          <div className="stat-value">{inProgressTopics}</div>
          <div className="stat-label">In Progress</div>
        </div>
        
        <div className="stat-card pending">
          <div className="stat-value">{notStartedTopics}</div>
          <div className="stat-label">Not Started</div>
        </div>
      </div>
      
      <div className="progress-section">
        <div className="progress-header">
          <span>Overall Progress</span>
          <span className="percentage">{percentage.toFixed(1)}%</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ProgressDashboard;