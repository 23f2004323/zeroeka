import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopicCard from './components/TopicCard';
import TopicForm from './components/TopicForm';
import './App.css';
import ProgressDashboard from './components/ProgressDashboard';

function App() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/topics');
      if (response.data.success) {
        setTopics(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch topics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  // Add new topic
  const addTopic = async (topicData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/topics', topicData);
      if (response.data.success) {
        setTopics([response.data.data, ...topics]);
        return { success: true };
      }
    } catch (err) {
      console.error('Error adding topic:', err);
      return { success: false, error: err.response?.data?.message || 'Failed to add topic' };
    }
  };

  // Update topic status
  const updateTopicStatus = async (id, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/topics/${id}`, { status: newStatus });
      if (response.data.success) {
        setTopics(topics.map(topic => 
          topic._id === id ? response.data.data : topic
        ));
        return { success: true };
      }
    } catch (err) {
      console.error('Error updating status:', err);
      return { success: false };
    }
  };

  // Delete topic
  const deleteTopic = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/topics/${id}`);
      if (response.data.success) {
        setTopics(topics.filter(topic => topic._id !== id));
        return { success: true };
      }
    } catch (err) {
      console.error('Error deleting topic:', err);
      return { success: false };
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1> LearnTrack</h1>
        <p>Track your learning progress across courses</p>
      </header>

      <div className="container">
          <ProgressDashboard topics={topics} />  
            <div className="main-content">
            <div className="sidebar">
                <TopicForm onAddTopic={addTopic} />
            </div>
          
            <div className="topics-section">
                {loading ? (
                <div className="loading">Loading topics...</div>
                ) : (
            <div className="topics-grid">
                {topics.length === 0 ? (
                    <div className="no-topics">No topics found. Add your first topic!</div>
                        ) : (
                    topics.map(topic => (
                        <TopicCard
                        key={topic._id}
                        topic={topic}
                        onUpdateStatus={updateTopicStatus}
                        onDelete={deleteTopic}
                        />
                    ))
                    )}
                </div>
                )}
            </div>
            </div>
      </div>
    </div>
  );
}

export default App;