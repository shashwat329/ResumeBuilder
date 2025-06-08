import { useState } from 'react'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'
import './App.css'

function App() {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: '',
    },
    education: [{ 
      institution: '',
      degree: '', 
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    }],
    skills: [{ name: '', level: 'Intermediate' }],
    experience: [{ 
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    }],
    projects: [{ 
      title: '',
      description: '',
      link: '',
      startDate: '',
      endDate: '',
    }],
    achievements: [{
      title: '',
      description: '',
      date: '',
    }],
    certifications: [{ 
      name: '',
      issuer: '',
      date: '',
    }],
    extracurricular: [{ 
      activity: '',
      role: '',
      description: '',
      startDate: '',
      endDate: '',
    }],
  });

  const updateResume = (newData) => {
    setResumeData(newData);
  };

  return (
    <div className="app-container">
      <main className="app-main">
        <ResumeForm updateResume={updateResume} />
        <ResumePreview resumeData={resumeData} />
      </main>
    </div>
  );
}

export default App
