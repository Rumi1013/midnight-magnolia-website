import React, { useState, useEffect } from 'react';
import './Dashboard.css';

interface DashboardProps {
  onNavigate: (section: string) => void;
}

interface Task {
  id: string;
  text: string;
  priority: 'high' | 'medium' | 'low' | 'completed';
  completed: boolean;
}

interface ActivityItem {
  id: string;
  type: 'sale' | 'content' | 'client';
  title: string;
  time: string;
}

interface ContentTemplate {
  id: string;
  name: string;
  prompt: string;
  category: 'affirmation' | 'tarot' | 'journal' | 'listing' | 'social' | 'email';
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate: _onNavigate }) => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [energyLevel, setEnergyLevel] = useState<'high' | 'medium' | 'low'>('medium');
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Complete Tarot deck descriptions', priority: 'high', completed: false },
    { id: '2', text: 'Upload new journal templates', priority: 'medium', completed: false },
    { id: '3', text: 'Respond to customer inquiries', priority: 'completed', completed: true },
    { id: '4', text: 'Create affirmation cards for new collection', priority: 'high', completed: false },
    { id: '5', text: 'Update Shopify product descriptions', priority: 'medium', completed: false }
  ]);

  const [recentActivity] = useState<ActivityItem[]>([
    { id: '1', type: 'sale', title: 'New sale: The Magnolia Reset Journal', time: '2 hours ago' },
    { id: '2', type: 'content', title: 'Created 5 new affirmation cards', time: 'Yesterday' },
    { id: '3', type: 'client', title: 'New client: Maya Johnson', time: '2 days ago' },
    { id: '4', type: 'sale', title: 'Digital Entrepreneur Starter Kit sold', time: '3 days ago' }
  ]);

  const [contentPrompt, setContentPrompt] = useState('');
  const [selectedContentType, setSelectedContentType] = useState<'affirmation' | 'tarot' | 'journal' | 'listing'>('affirmation');
  const [generatedResults, setGeneratedResults] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const contentTemplates: ContentTemplate[] = [
    {
      id: '1',
      name: 'Resilience',
      prompt: 'Write a 2-line affirmation rooted in Black Southern feminine energy about resilience.',
      category: 'affirmation'
    },
    {
      id: '2',
      name: 'Healing',
      prompt: 'Write a 2-line affirmation rooted in Black Southern feminine energy about healing.',
      category: 'affirmation'
    },
    {
      id: '3',
      name: 'Ancestral Wisdom',
      prompt: 'Write a 2-line affirmation rooted in Black Southern feminine energy about ancestral wisdom.',
      category: 'affirmation'
    },
    {
      id: '4',
      name: 'Softness as Strength',
      prompt: 'Write a 2-line affirmation rooted in Black Southern feminine energy about softness as strength.',
      category: 'affirmation'
    }
  ];

  const stats = {
    revenue: 2450,
    revenueChange: 18,
    orders: 32,
    ordersChange: 5,
    products: 14,
    productsChange: 0,
    goalProgress: 24.5
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, priority: task.completed ? task.priority : 'completed' }
        : task
    ));
  };

  const addNewTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      text: 'New task',
      priority: 'medium',
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const generateContent = async () => {
    if (!contentPrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation with Southern Gothic themed responses
    const sampleResults = [
      '"Your softness ain\'t weakness, honey;\nIt\'s the river that carved the canyon."',
      '"When ancestors whisper through magnolia blooms,\nYour healing becomes their living legacy."',
      '"Stars that guided runaways now light your path;\nTheir determination flows in your veins."'
    ];
    
    setTimeout(() => {
      setGeneratedResults(sampleResults);
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getMoonPhase = () => {
    // This would typically connect to a moon phase API
    return "Waxing Crescent";
  };

  useEffect(() => {
    const progressElement = document.querySelector('.progress') as HTMLElement;
    if (progressElement) {
      progressElement.style.width = `${stats.goalProgress}%`;
    }
  }, [stats.goalProgress]);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="dashboard-logo">
          <img src="/images/logos/Midnight_MagnoliaJune-15.jpg" alt="Midnight Magnolia" className="dashboard-logo-img" />
          <h2 className="dashboard-logo-text">Midnight Magnolia</h2>
        </div>
        
        <nav className="dashboard-nav">
          <ul>
            <li className={currentSection === 'dashboard' ? 'active' : ''}>
              <button onClick={() => setCurrentSection('dashboard')}>
                <span className="nav-icon">📊</span>
                Dashboard
              </button>
            </li>
            <li className={currentSection === 'content' ? 'active' : ''}>
              <button onClick={() => setCurrentSection('content')}>
                <span className="nav-icon">✨</span>
                Content Creation
              </button>
            </li>
            <li className={currentSection === 'inventory' ? 'active' : ''}>
              <button onClick={() => setCurrentSection('inventory')}>
                <span className="nav-icon">📦</span>
                Digital Inventory
              </button>
            </li>
            <li className={currentSection === 'sales' ? 'active' : ''}>
              <button onClick={() => setCurrentSection('sales')}>
                <span className="nav-icon">💰</span>
                Sales & Orders
              </button>
            </li>
            <li className={currentSection === 'clients' ? 'active' : ''}>
              <button onClick={() => setCurrentSection('clients')}>
                <span className="nav-icon">👥</span>
                Client Management
              </button>
            </li>
            <li className={currentSection === 'automation' ? 'active' : ''}>
              <button onClick={() => setCurrentSection('automation')}>
                <span className="nav-icon">🔄</span>
                Automation
              </button>
            </li>
          </ul>
        </nav>

        <div className="energy-tracker">
          <h3>Energy Tracker</h3>
          <div className="energy-levels">
            <button 
              className={`energy-level high ${energyLevel === 'high' ? 'selected' : ''}`}
              onClick={() => setEnergyLevel('high')}
            >
              High
            </button>
            <button 
              className={`energy-level medium ${energyLevel === 'medium' ? 'selected' : ''}`}
              onClick={() => setEnergyLevel('medium')}
            >
              Medium
            </button>
            <button 
              className={`energy-level low ${energyLevel === 'low' ? 'selected' : ''}`}
              onClick={() => setEnergyLevel('low')}
            >
              Low
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Welcome, Latisha</h1>
            <p className="lunar-phase">{getMoonPhase()} | {getCurrentDate()}</p>
          </div>
          <div className="header-right">
            <div className="notifications">
              <span className="notification-icon">🔔</span>
              <span className="notification-counter">3</span>
            </div>
            <div className="user-profile">
              <img src="/images/professional/profile-placeholder.jpg" alt="Latisha Waters" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {currentSection === 'dashboard' && (
          <div className="dashboard-content">
            {/* Stats Overview */}
            <div className="stats-container">
              <div className="stat-card">
                <h3>Revenue</h3>
                <p className="stat-value">${stats.revenue.toLocaleString()}</p>
                <p className="stat-change positive">+{stats.revenueChange}% this month</p>
              </div>
              <div className="stat-card">
                <h3>Orders</h3>
                <p className="stat-value">{stats.orders}</p>
                <p className="stat-change positive">+{stats.ordersChange} since last week</p>
              </div>
              <div className="stat-card">
                <h3>Products</h3>
                <p className="stat-value">{stats.products}</p>
                <p className="stat-change neutral">No change</p>
              </div>
              <div className="stat-card">
                <h3>Goal Progress</h3>
                <p className="stat-value">${stats.revenue.toLocaleString()}/$10,000</p>
                <div className="progress-bar">
                  <div className="progress"></div>
                </div>
              </div>
            </div>

            {/* Activity and Tasks */}
            <div className="activity-tasks-container">
              <div className="recent-activity">
                <h2 className="section-title">Recent Activity</h2>
                <ul className="activity-list">
                  {recentActivity.map(item => (
                    <li key={item.id} className="activity-item">
                      <span className={`activity-icon ${item.type}`}>
                        {item.type === 'sale' ? '💰' : item.type === 'content' ? '✨' : '👤'}
                      </span>
                      <div className="activity-details">
                        <p className="activity-title">{item.title}</p>
                        <p className="activity-time">{item.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <button className="view-all">View all activity</button>
              </div>

              <div className="tasks">
                <h2 className="section-title">Today's Tasks</h2>
                <ul className="task-list">
                  {tasks.map(task => (
                    <li key={task.id} className="task-item">
                      <label className="task-checkbox">
                        <input 
                          type="checkbox" 
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                        />
                        <span className="checkmark"></span>
                        <span className="task-text">{task.text}</span>
                      </label>
                      <span className={`task-priority ${task.priority}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className="add-task-btn" onClick={addNewTask}>+ Add New Task</button>
              </div>
            </div>

            {/* Quick Create */}
            <div className="quick-create">
              <h2 className="section-title">Quick Create</h2>
              <div className="quick-buttons">
                <button className="quick-button" onClick={() => setCurrentSection('content')}>
                  <span className="button-icon">💫</span>
                  <span className="button-text">Affirmation Card</span>
                </button>
                <button className="quick-button" onClick={() => setCurrentSection('content')}>
                  <span className="button-icon">🔮</span>
                  <span className="button-text">Tarot Description</span>
                </button>
                <button className="quick-button" onClick={() => setCurrentSection('content')}>
                  <span className="button-icon">📝</span>
                  <span className="button-text">Journal Prompt</span>
                </button>
                <button className="quick-button" onClick={() => setCurrentSection('content')}>
                  <span className="button-icon">🛍️</span>
                  <span className="button-text">Product Listing</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Creation Section */}
        {currentSection === 'content' && (
          <div className="content-creation">
            <div className="content-sidebar">
              <h3>Content Types</h3>
              <ul className="content-types">
                <li className={selectedContentType === 'affirmation' ? 'active' : ''}>
                  <button onClick={() => setSelectedContentType('affirmation')}>
                    Affirmation Cards
                  </button>
                </li>
                <li className={selectedContentType === 'tarot' ? 'active' : ''}>
                  <button onClick={() => setSelectedContentType('tarot')}>
                    Tarot Descriptions
                  </button>
                </li>
                <li className={selectedContentType === 'journal' ? 'active' : ''}>
                  <button onClick={() => setSelectedContentType('journal')}>
                    Journal Prompts
                  </button>
                </li>
                <li className={selectedContentType === 'listing' ? 'active' : ''}>
                  <button onClick={() => setSelectedContentType('listing')}>
                    Product Listings
                  </button>
                </li>
              </ul>

              <div className="saved-templates">
                <h3>Saved Templates</h3>
                <ul className="template-list">
                  <li><button>Black Feminine Energy Affirmations</button></li>
                  <li><button>Recovery Journal Prompts</button></li>
                  <li><button>Sobriety Planner Listing</button></li>
                  <li><button>Southern Gothic Tarot</button></li>
                </ul>
              </div>
            </div>

            <div className="content-generator">
              <h2>Create {selectedContentType.charAt(0).toUpperCase() + selectedContentType.slice(1)} Content</h2>
              
              <div className="prompt-container">
                <label htmlFor="content-prompt">Enter Your Prompt:</label>
                <textarea
                  id="content-prompt"
                  className="prompt-textarea"
                  value={contentPrompt}
                  onChange={(e) => setContentPrompt(e.target.value)}
                  placeholder={`Write a 2-line affirmation rooted in Black Southern feminine energy. Keep it poetic, healing, and brief enough to fit on a 3x5 card.`}
                />

                <div className="template-options">
                  <h4>Prompt Template Options:</h4>
                  <div className="template-buttons">
                    {contentTemplates
                      .filter(template => template.category === selectedContentType)
                      .map(template => (
                        <button
                          key={template.id}
                          className="template-button"
                          onClick={() => setContentPrompt(template.prompt)}
                        >
                          {template.name}
                        </button>
                      ))}
                  </div>
                </div>

                <button 
                  className="generate-button" 
                  onClick={generateContent}
                  disabled={isGenerating || !contentPrompt.trim()}
                >
                  {isGenerating ? 'Generating...' : 'Generate Content'}
                </button>
              </div>

              {generatedResults.length > 0 && (
                <div className="results-container">
                  <div className="results-header">
                    <h3>Generated Results</h3>
                    <div className="results-actions">
                      <button className="results-action-btn">🔄 Regenerate</button>
                      <button className="results-action-btn">💾 Save</button>
                      <button className="results-action-btn">📤 Export</button>
                    </div>
                  </div>
                  
                  <div className="results-display">
                    {generatedResults.map((result, index) => (
                      <div key={index} className="result-card">
                        <div className="result-content">
                          {result.split('\n').map((line, lineIndex) => (
                            <p key={lineIndex}>{line}</p>
                          ))}
                        </div>
                        <div className="result-actions">
                          <button 
                            className="result-action copy" 
                            onClick={() => copyToClipboard(result)}
                            title="Copy to clipboard"
                          >
                            📋
                          </button>
                          <button className="result-action edit" title="Edit">✏️</button>
                          <button className="result-action visualize" title="Visualize">🎨</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Other sections would be implemented similarly */}
        {currentSection === 'inventory' && (
          <div className="section-placeholder">
            <h2>Digital Inventory Management</h2>
            <p>Product catalog, digital asset management, and inventory tracking coming soon...</p>
          </div>
        )}

        {currentSection === 'sales' && (
          <div className="section-placeholder">
            <h2>Sales & Orders</h2>
            <p>Order management, customer analytics, and revenue tracking coming soon...</p>
          </div>
        )}

        {currentSection === 'clients' && (
          <div className="section-placeholder">
            <h2>Client Management</h2>
            <p>CRM functionality, project tracking, and client communication coming soon...</p>
          </div>
        )}

        {currentSection === 'automation' && (
          <div className="section-placeholder">
            <h2>Automation Hub</h2>
            <p>Make.com integrations, workflow management, and automation monitoring coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 