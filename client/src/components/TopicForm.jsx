import React, { useState } from 'react';
import './TopicForm.css';

function TopicForm({ onAddTopic }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Web Development',
    status: 'Not Started'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Machine Learning',
    'DBMS',
    'Web Development',
    'Programming',
    'Data Science'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Topic name is required');
      return;
    }
    
    setIsSubmitting(true);
    const result = await onAddTopic(formData);
    
    if (result.success) {
      setFormData({
        name: '',
        category: 'Web Development',
        status: 'Not Started'
      });
      setError('');
    } else {
      setError(result.error || 'Failed to add topic');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="topic-form">
      <h3>➕ Add New Topic</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Topic Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., React Hooks, Neural Networks, SQL Joins"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Initial Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        
        {error && <div className="form-error">{error}</div>}
        
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Topic'}
        </button>
      </form>
    </div>
  );
}

export default TopicForm;