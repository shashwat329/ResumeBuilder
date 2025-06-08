import { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import '../styles/ResumePreview.css';

function ResumePreview({ resumeData }) {
  const resumeRef = useRef(null);

  // Function to generate and download PDF
  const downloadPDF = () => {
    const element = resumeRef.current;

    // Create a clone of the element to modify for PDF generation
    const clone = element.cloneNode(true);
    clone.style.width = '100%';
    clone.style.height = 'auto';
    clone.style.minHeight = 'auto';
    clone.style.maxWidth = '100%';
    clone.style.transform = 'none';

    const opt = {
      margin: [10, 10, 10, 10], // Slight margins for better appearance
      filename: `${resumeData.personalInfo.name || 'Resume'}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollY: 0
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
        compress: true
      },
      pagebreak: { avoid: '.resume-item' }
    };

    // Use the temporary clone for PDF generation
    html2pdf().set(opt).from(clone).save();
  };

  // Format skills for display
  const formatSkills = () => {
    const developerTools = [];
    const skills = [];

    resumeData.skills.forEach(skill => {
      if (skill.name) {
        if (skill.level === 'Advanced' || skill.level === 'Expert') {
          developerTools.push(skill.name);
        } else {
          skills.push(skill.name);
        }
      }
    });

    return { developerTools, skills };
  };

  const { developerTools, skills } = formatSkills();

  return (
    <div className="resume-preview-container">
      <div className="download-button-container">
        <button onClick={downloadPDF} className="download-pdf-button">
          Download PDF
        </button>
      </div>
      <div className='resume'>
        <div className="resume-preview" ref={resumeRef}>
          {/* Header with Personal Information */}
          <header className="resume-header">
            <h1>{resumeData.personalInfo.name || 'YOUR NAME'}</h1>
            {resumeData.personalInfo.address && <p>{resumeData.personalInfo.address}</p>}
            <div className="contact-info">
              {resumeData.personalInfo.phone && (
                <div className="contact-item">
                  <span>{resumeData.personalInfo.phone}</span>
                </div>
              )}
              {resumeData.personalInfo.email && (
                <div className="contact-item">
                  <a href={`mailto:${resumeData.personalInfo.email}`}>{resumeData.personalInfo.email}</a>
                </div>
              )}
              {resumeData.personalInfo.linkedin && (
                <div className="contact-item">
                  <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                    linkedIn
                  </a>
                </div>
              )}
              {resumeData.personalInfo.website && (
                <div className="contact-item">
                  <a href={resumeData.personalInfo.website} target="_blank" rel="noopener noreferrer">
                    Portfolio
                  </a>
                </div>
              )}
            </div>
          </header>

          {/* Education Section */}
          {resumeData.education.some(edu => edu.institution || edu.degree) && (
            <section className="resume-section">
              <h2>Education</h2>
              <div className="section-content">
                {resumeData.education.map((edu, index) => (
                  (edu.institution || edu.degree) && (
                    <div key={index} className="resume-item">
                      <div className="item-header">
                        <div className="item-title">
                          <h3>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                          <h4>{edu.institution}</h4>
                        </div>
                        {(edu.startDate || edu.endDate || edu.gpa) && (
                          <div className="item-date">
                            {edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : edu.startDate || edu.endDate}
                            {edu.gpa && <div className="gpa-below-date">CGPA: {edu.gpa}</div>}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {/* Skills Section */}
          {(developerTools.length > 0 || skills.length > 0) && (
            <section className="resume-section">
              <h2>Technical Skills</h2>
              <div className="section-content">
                {developerTools.length > 0 && (
                  <div className="skills-category">
                    <div className="skills-list">
                      <span className="skills-category-label">Developer Tools: </span>
                      {developerTools.map((tool, index) => (
                        <div key={index} className="skill-item">
                          <span className="skill-name">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {skills.length > 0 && (
                  <div className="skills-category">
                    <div className="skills-list">
                      <span className="skills-category-label">Skills: </span>
                      {skills.map((skill, index) => (
                        <div key={index} className="skill-item">
                          <span className="skill-name">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Work Experience Section */}
          {resumeData.experience.some(exp => exp.company || exp.position) && (
            <section className="resume-section">
              <h2>Internships</h2>
              <div className="section-content">
                {resumeData.experience.map((exp, index) => (
                  (exp.company || exp.position) && (
                    <div key={index} className="resume-item">
                      <div className="item-header">
                        <div className="item-title">
                          <h3>{exp.company}</h3>
                          <h4>{exp.position}</h4>
                        </div>
                        {(exp.startDate || exp.endDate) && (
                          <div className="item-date">
                            {exp.startDate}{exp.endDate ? ` - ${exp.endDate}` : exp.current ? ' - Present' : ''}
                          </div>
                        )}
                      </div>
                      {exp.description && (
                        <div className="item-description">
                          {exp.description.split('\n').map((line, i) => (
                            line.trim() && <p key={i}>{line}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {resumeData.projects.some(project => project.title) && (
            <section className="resume-section">
              <h2>Projects</h2>
              <div className="section-content">
                {resumeData.projects.map((project, index) => (
                  project.title && (
                    <div key={index} className="resume-item">
                      <div className="item-header">
                        <div className="item-title">
                          <h3>{project.title}</h3>
                          {project.link && (
                            <div className="project-link">
                              <a href={project.link} target="_blank" rel="noopener noreferrer">
                                View Project
                              </a>
                            </div>
                          )}
                        </div>
                        <div className="item-date">
                          {project.startDate || project.endDate ?
                            `${project.startDate || ''}${project.startDate && project.endDate ? ' - ' : ''}${project.endDate || ''}` : ''}
                        </div>
                      </div>

                      {project.description && (
                        <div className="item-description">
                          {project.description.split('\n').map((line, i) => (
                            line.trim() && <p key={i}>{line}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {/* Achievements Section */}
          {resumeData.achievements && resumeData.achievements.some(achievement => achievement.title) && (
            <section className="resume-section">
              <h2>Achievement</h2>
              <div className="section-content">
                {resumeData.achievements.map((achievement, index) => (
                  achievement.title && (
                    <div key={index} className="resume-item">
                      <div className="item-header">
                        <div className="item-title">
                          <h3>{achievement.title}</h3>
                          {achievement.description && <h4>{achievement.description}</h4>}
                        </div>
                        {achievement.date && (
                          <div className="item-date">
                            {achievement.date}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {/* Additional GATE section if present in certifications */}
          {resumeData.certifications && resumeData.certifications.some(cert => cert.name && cert.name.includes('GATE')) && (
            <section className="resume-section">
              <h2>Achievement</h2>
              <div className="section-content">
                {resumeData.certifications.filter(cert => cert.name && cert.name.includes('GATE')).map((cert, index) => (
                  <div key={index} className="resume-item">
                    <div className="item-header">
                      <div className="item-title">
                        <h3>{cert.name}</h3>
                        {cert.issuer && <h4>{cert.issuer}</h4>}
                      </div>
                      {cert.date && (
                        <div className="item-date">
                          {cert.date}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {resumeData.certifications.some(cert => cert.name && !cert.name.includes('GATE')) && (
            <section className="resume-section">
              <h2>Certificates</h2>
              <div className="section-content">
                {resumeData.certifications.filter(cert => cert.name && !cert.name.includes('GATE')).map((cert, index) => (
                  <div key={index} className="resume-item">
                    <div className="item-header">
                      <div className="item-title">
                        <h3>{cert.name}</h3>
                        {cert.issuer && <h4>{cert.issuer}</h4>}
                      </div>
                      {cert.date && (
                        <div className="item-date">
                          {cert.date}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Extracurricular Activities Section */}
          {resumeData.extracurricular.some(activity => activity.activity) && (
            <section className="resume-section">
              <h2>Extracurricular</h2>
              <div className="section-content">
                {resumeData.extracurricular.map((activity, index) => (
                  activity.activity && (
                    <div key={index} className="resume-item">
                      <div className="item-header">
                        <div className="item-title">
                          <h3>{activity.activity}</h3>
                          {activity.role && <h4>{activity.role}</h4>}
                        </div>
                        <div className="item-date">
                          {activity.startDate || activity.endDate ?
                            `${activity.startDate || ''}${activity.startDate && activity.endDate ? ' - ' : ''}${activity.endDate || ''}` : ''}
                        </div>
                      </div>
                      {activity.description && (
                        <div className="item-description">
                          {activity.description.split('\n').map((line, i) => (
                            line.trim() && <p key={i}>{line}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumePreview; 