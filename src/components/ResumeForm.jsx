import { useState } from 'react';
import '../styles/ResumeForm.css';

function ResumeForm({ updateResume }) {
  const [formData, setFormData] = useState({
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
    skills: {
      developerTools: [{ name: '' }],
      technologies: [{ name: '' }]
    },
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
      technologies: '',
      description: '',
      link: '',
      startDate: '',
      endDate: '',
    }],
    achievements: [{
      title: '',
      description: '',
      date: ''
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

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    const newData = {
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [name]: value
      }
    };
    
    setFormData(newData);
    updateResume(transformDataForPreview(newData));
  };

  const handleArrayFieldChange = (section, index, e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    const newFormData = { ...formData };
    
    if (section === 'developerTools' || section === 'technologies') {
      newFormData.skills[section] = formData.skills[section].map((item, i) => {
        if (i === index) {
          return { ...item, [name]: newValue };
        }
        return item;
      });
    } else {
      newFormData[section] = formData[section].map((item, i) => {
        if (i === index) {
          return { ...item, [name]: newValue };
        }
        return item;
      });
    }

    setFormData(newFormData);
    updateResume(transformDataForPreview(newFormData));
  };

  const addItem = (section) => {
    let newItem = {};
    const newFormData = { ...formData };
    
    switch(section) {
      case 'education':
        newItem = { institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' };
        newFormData[section] = [...formData[section], newItem];
        break;
      case 'developerTools':
      case 'technologies':
        newItem = { name: '' };
        newFormData.skills[section] = [...formData.skills[section], newItem];
        break;
      case 'experience':
        newItem = { company: '', position: '', startDate: '', endDate: '', current: false, description: '' };
        newFormData[section] = [...formData[section], newItem];
        break;
      case 'projects':
        newItem = { title: '', technologies: '', description: '', link: '', startDate: '', endDate: '' };
        newFormData[section] = [...formData[section], newItem];
        break;
      case 'achievements':
        newItem = { title: '', description: '', date: '' };
        newFormData[section] = [...formData[section], newItem];
        break;
      case 'certifications':
        newItem = { name: '', issuer: '', date: '' };
        newFormData[section] = [...formData[section], newItem];
        break;
      case 'extracurricular':
        newItem = { activity: '', role: '', description: '', startDate: '', endDate: '' };
        newFormData[section] = [...formData[section], newItem];
        break;
      default:
        break;
    }
    
    setFormData(newFormData);
    updateResume(transformDataForPreview(newFormData));
  };

  const removeItem = (section, index) => {
    const newFormData = { ...formData };
    
    if (section === 'developerTools' || section === 'technologies') {
      if (formData.skills[section].length === 1) return;
      newFormData.skills[section] = formData.skills[section].filter((_, i) => i !== index);
    } else {
      if (formData[section].length === 1) return;
      newFormData[section] = formData[section].filter((_, i) => i !== index);
    }
    
    setFormData(newFormData);
    updateResume(transformDataForPreview(newFormData));
  };

  // Transform data to match the expected format for the preview component
  const transformDataForPreview = (data) => {
    // Convert the skills object structure to an array format for the preview component
    const transformedData = { ...data };
    
    const skillsArray = [
      ...data.skills.developerTools.map(item => ({ name: item.name, level: 'Advanced' })),
      ...data.skills.technologies.map(item => ({ name: item.name, level: 'Intermediate' }))
    ];
    
    transformedData.skills = skillsArray;
    return transformedData;
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const steps = [
    { num: 1, name: "Personal" },
    { num: 2, name: "Education" },
    { num: 3, name: "Skills" },
    { num: 4, name: "Experience" },
    { num: 5, name: "Projects" },
    { num: 6, name: "Additional" }
  ];

  return (
    <div className="resume-form">
      <h2>Resume Builder</h2>
      
      <div className="steps-container">
        {steps.map((step) => (
          <div 
            key={step.num} 
            className={`step ${currentStep === step.num ? 'active' : ''} ${currentStep > step.num ? 'completed' : ''}`}
            onClick={() => setCurrentStep(step.num)}
          >
            {step.name}
          </div>
        ))}
      </div>
      
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      
      {/* Step 1: Personal Information */}
      <div className={`resume-form-step ${currentStep === 1 ? 'active' : ''}`}>
        <section>
          <h3>Personal Information</h3>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.personalInfo.name}
              onChange={handlePersonalInfoChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.personalInfo.email}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.personalInfo.phone}
                onChange={handlePersonalInfoChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.personalInfo.address}
              onChange={handlePersonalInfoChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="linkedin">LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                id="linkedin"
                value={formData.personalInfo.linkedin}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="website">Website/Portfolio</label>
              <input
                type="url"
                name="website"
                id="website"
                value={formData.personalInfo.website}
                onChange={handlePersonalInfoChange}
              />
            </div>
          </div>
        </section>
        <div className="step-navigation">
          <div></div>
          <button className="next-btn" onClick={nextStep}>Next: Education</button>
        </div>
      </div>
      
      {/* Step 2: Education */}
      <div className={`resume-form-step ${currentStep === 2 ? 'active' : ''}`}>
        <section>
          <h3>Education <span className="section-controls"><button type="button" className="add-btn" onClick={() => addItem('education')}>+</button></span></h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="section-item">
              <div className="form-row">
                <div className="form-group">
                  <label>Institution</label>
                  <input
                    type="text"
                    name="institution"
                    value={edu.institution}
                    onChange={(e) => handleArrayFieldChange('education', index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Degree</label>
                  <input
                    type="text"
                    name="degree"
                    value={edu.degree}
                    onChange={(e) => handleArrayFieldChange('education', index, e)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Field of Study</label>
                  <input
                    type="text"
                    name="field"
                    value={edu.field}
                    onChange={(e) => handleArrayFieldChange('education', index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>GPA</label>
                  <input
                    type="text"
                    name="gpa"
                    value={edu.gpa}
                    onChange={(e) => handleArrayFieldChange('education', index, e)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="text"
                    name="startDate"
                    value={edu.startDate}
                    placeholder="MM/YYYY"
                    onChange={(e) => handleArrayFieldChange('education', index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="text"
                    name="endDate"
                    value={edu.endDate}
                    placeholder="MM/YYYY or Present"
                    onChange={(e) => handleArrayFieldChange('education', index, e)}
                  />
                </div>
              </div>
              {formData.education.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => removeItem('education', index)}>Remove</button>
              )}
            </div>
          ))}
        </section>
        <div className="step-navigation">
          <button className="prev-btn" onClick={prevStep}>Previous: Personal</button>
          <button className="next-btn" onClick={nextStep}>Next: Skills</button>
        </div>
      </div>
      
      {/* Step 3: Skills */}
      <div className={`resume-form-step ${currentStep === 3 ? 'active' : ''}`}>
        <section>
          <h3>Technical Skills</h3>
          
          <div className="section-item">
            <h4>Developer Tools <span className="section-controls"></span></h4>
            <p>Add tools, frameworks, and IDEs you're proficient with</p>
            {formData.skills.developerTools.map((tool, index) => (
              <div key={index} className="form-row">
                <div className="form-group">
                  <label>Tool Name</label>
                  <input
                    type="text"
                    name="name"
                    value={tool.name}
                    onChange={(e) => handleArrayFieldChange('developerTools', index, e)}
                    placeholder="e.g., Arduino IDE, MATLAB, React"
                  />
                </div>
                {formData.skills.developerTools.length > 1 && (
                  <button type="button" className="remove-btn" onClick={() => removeItem('developerTools', index)}>Remove</button>
                )}
              </div>
            ))}
          </div>
          
          <div className="section-item">
            <h4>Technologies & Skills <span className="section-controls"></span></h4>
            <p>Add programming languages, hardware skills, and other technical abilities</p>
            {formData.skills.technologies.map((tech, index) => (
              <div key={index} className="form-row">
                <div className="form-group">
                  <label>Skill Name</label>
                  <input
                    type="text"
                    name="name"
                    value={tech.name}
                    onChange={(e) => handleArrayFieldChange('technologies', index, e)}
                    placeholder="e.g., C++, Embedded Programming, Circuit Design"
                  />
                </div>
                {formData.skills.technologies.length > 1 && (
                  <button type="button" className="remove-btn" onClick={() => removeItem('technologies', index)}>Remove</button>
                )}
              </div>
            ))}
          </div>
        </section>
        <div className="step-navigation">
          <button className="prev-btn" onClick={prevStep}>Previous: Education</button>
          <button className="next-btn" onClick={nextStep}>Next: Experience</button>
        </div>
      </div>
      
      {/* Step 4: Experience */}
      <div className={`resume-form-step ${currentStep === 4 ? 'active' : ''}`}>
        <section>
          <h3>Work Experience <span className="section-controls"><button type="button" className="add-btn" onClick={() => addItem('experience')}>+</button></span></h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="section-item">
              <div className="form-row">
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={exp.company}
                    onChange={(e) => handleArrayFieldChange('experience', index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    name="position"
                    value={exp.position}
                    onChange={(e) => handleArrayFieldChange('experience', index, e)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="text"
                    name="startDate"
                    value={exp.startDate}
                    placeholder="MM/YYYY"
                    onChange={(e) => handleArrayFieldChange('experience', index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="text"
                    name="endDate"
                    value={exp.endDate}
                    placeholder="MM/YYYY or Present"
                    onChange={(e) => handleArrayFieldChange('experience', index, e)}
                    disabled={exp.current}
                  />
                </div>
              </div>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  name="current"
                  id={`current-${index}`}
                  checked={exp.current}
                  onChange={(e) => handleArrayFieldChange('experience', index, e)}
                />
                <label htmlFor={`current-${index}`}>Current Position</label>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={exp.description}
                  onChange={(e) => handleArrayFieldChange('experience', index, e)}
                  placeholder="Describe your responsibilities and achievements (separate by new lines for bullet points)"
                />
              </div>
              {formData.experience.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => removeItem('experience', index)}>Remove</button>
              )}
            </div>
          ))}
        </section>
        <div className="step-navigation">
          <button className="prev-btn" onClick={prevStep}>Previous: Skills</button>
          <button className="next-btn" onClick={nextStep}>Next: Projects</button>
        </div>
      </div>
      
      {/* Step 5: Projects */}
      <div className={`resume-form-step ${currentStep === 5 ? 'active' : ''}`}>
        <section>
          <h3>Projects <span className="section-controls"><button type="button" className="add-btn" onClick={() => addItem('projects')}>+</button></span></h3>
          {formData.projects.map((project, index) => (
            <div key={index} className="section-item">
              <div className="form-row">
                <div className="form-group">
                  <label>Project Title</label>
                  <input
                    type="text"
                    name="title"
                    value={project.title}
                    onChange={(e) => handleArrayFieldChange('projects', index, e)}
                  />
                </div>
                {/* <div className="form-group">
                  <label>Technologies Used</label>
                  <input
                    type="text"
                    name="technologies"
                    value={project.technologies}
                    onChange={(e) => handleArrayFieldChange('projects', index, e)}
                  />
                </div> */}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="text"
                    name="startDate"
                    value={project.startDate}
                    placeholder="MM/YYYY"
                    onChange={(e) => handleArrayFieldChange('projects', index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="text"
                    name="endDate"
                    value={project.endDate}
                    placeholder="MM/YYYY"
                    onChange={(e) => handleArrayFieldChange('projects', index, e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Project Link</label>
                <input
                  type="url"
                  name="link"
                  value={project.link}
                  onChange={(e) => handleArrayFieldChange('projects', index, e)}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={project.description}
                  onChange={(e) => handleArrayFieldChange('projects', index, e)}
                  placeholder="Describe the project, your role, and outcomes (separate by new lines for bullet points)"
                />
              </div>
              {formData.projects.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => removeItem('projects', index)}>Remove</button>
              )}
            </div>
          ))}
        </section>
        <div className="step-navigation">
          <button className="prev-btn" onClick={prevStep}>Previous: Experience</button>
          <button className="next-btn" onClick={nextStep}>Next: Additional</button>
        </div>
      </div>
      
      {/* Step 6: Additional Information */}
      <div className={`resume-form-step ${currentStep === 6 ? 'active' : ''}`}>
        <section>
          <h3>Achievements <span className="section-controls"><button type="button" className="add-btn" onClick={() => addItem('achievements')}>+</button></span></h3>
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="section-item">
              <div className="form-row">
                <div className="form-group">
                  <label>Achievement Title</label>
                  <input
                    type="text"
                    name="title"
                    value={achievement.title}
                    onChange={(e) => handleArrayFieldChange('achievements', index, e)}
                    placeholder="e.g., GATE 2025, Competition Award"
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="text"
                    name="date"
                    value={achievement.date}
                    placeholder="YYYY or MM/YYYY"
                    onChange={(e) => handleArrayFieldChange('achievements', index, e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={achievement.description}
                  onChange={(e) => handleArrayFieldChange('achievements', index, e)}
                  placeholder="Describe your achievement in detail"
                />
              </div>
              {formData.achievements.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => removeItem('achievements', index)}>Remove</button>
              )}
            </div>
          ))}
        </section>
        
        <section>
          <h3>Certifications <span className="section-controls"><button type="button" className="add-btn" onClick={() => addItem('certifications')}>+</button></span></h3>
          {formData.certifications.map((cert, index) => (
            <div key={index} className="section-item">
              <div className="form-row">
                <div className="form-group">
                  <label>Certification Name</label>
                  <input
                    type="text"
                    name="name"
                    value={cert.name}
                    onChange={(e) => handleArrayFieldChange('certifications', index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Issuing Organization</label>
                  <input
                    type="text"
                    name="issuer"
                    value={cert.issuer}
                    onChange={(e) => handleArrayFieldChange('certifications', index, e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="text"
                  name="date"
                  value={cert.date}
                  placeholder="MM/YYYY"
                  onChange={(e) => handleArrayFieldChange('certifications', index, e)}
                />
              </div>
              {formData.certifications.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => removeItem('certifications', index)}>Remove</button>
              )}
            </div>
          ))}
        </section>

        <section>
          <h3>Extracurricular Activities <span className="section-controls"><button type="button" className="add-btn" onClick={() => addItem('extracurricular')}>+</button></span></h3>
          {formData.extracurricular.map((activity, index) => (
            <div key={index} className="section-item">
              <div className="form-row">
                <div className="form-group">
                  <label>Activity Name</label>
                  <input
                    type="text"
                    name="activity"
                    value={activity.activity}
                    onChange={(e) => handleArrayFieldChange('extracurricular', index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input
                    type="text"
                    name="role"
                    value={activity.role}
                    onChange={(e) => handleArrayFieldChange('extracurricular', index, e)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="text"
                    name="startDate"
                    value={activity.startDate}
                    placeholder="MM/YYYY"
                    onChange={(e) => handleArrayFieldChange('extracurricular', index, e)}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="text"
                    name="endDate"
                    value={activity.endDate}
                    placeholder="MM/YYYY or Present"
                    onChange={(e) => handleArrayFieldChange('extracurricular', index, e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={activity.description}
                  onChange={(e) => handleArrayFieldChange('extracurricular', index, e)}
                  placeholder="Describe your involvement and achievements (separate by new lines for bullet points)"
                />
              </div>
              {formData.extracurricular.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => removeItem('extracurricular', index)}>Remove</button>
              )}
            </div>
          ))}
        </section>
        <div className="step-navigation">
          <button className="prev-btn" onClick={prevStep}>Previous: Projects</button>
          <button className="submit-btn" onClick={() => alert("Your resume is ready! You can download it using the button in the preview.")}>Finish</button>
        </div>
      </div>
    </div>
  );
}

export default ResumeForm; 