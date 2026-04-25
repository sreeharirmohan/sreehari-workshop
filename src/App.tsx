import { useState, useEffect } from 'react';
import { Cloud, GitBranch, Server, Terminal, Settings, ShieldCheck } from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const name = "sreeharirmohan"; // Placeholder name

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    setIsVisible(true);
  }, []);

  const skills = [
    {
      title: "CI/CD Pipelines",
      desc: "Automating builds, tests, and deployments using tools like Jenkins, GitHub Actions, and GitLab CI.",
      icon: <GitBranch size={24} />
    },
    {
      title: "Containerization",
      desc: "Packaging applications and their dependencies into lightweight, portable containers with Docker.",
      icon: <Server size={24} />
    },
    {
      title: "Orchestration",
      desc: "Managing and scaling containerized applications across clusters using Kubernetes.",
      icon: <Settings size={24} />
    },
    {
      title: "Infrastructure as Code",
      desc: "Provisioning and managing infrastructure through code using Terraform and Ansible.",
      icon: <Terminal size={24} />
    },
    {
      title: "Cloud Platforms",
      desc: "Deploying and managing scalable architectures on AWS, Azure, and Google Cloud.",
      icon: <Cloud size={24} />
    },
    {
      title: "DevSecOps",
      desc: "Integrating security practices and automated scanning early in the software development lifecycle.",
      icon: <ShieldCheck size={24} />
    }
  ];

  return (
    <div className={`app-container ${isVisible ? 'visible' : ''}`}>
      {/* Header Card */}
      <div className="card">
        <div className="icon-container">
          <Cloud className="devops-icon" size={48} />
        </div>
        <h1 className="greeting">
          Hi, I'm <span className="name">{name}</span>
        </h1>
        <h2 className="workshop-message">
          I successfully completed the Zoople DevOps Workshop.
        </h2>
        <p className="subtitle">
          Ready to automate, scale, and secure modern infrastructure!
        </p>
      </div>

      {/* Skills / What I Learned */}
      <h3 className="section-title">My DevOps Toolkit</h3>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            <div className="skill-icon-container">
              {skill.icon}
            </div>
            <h4 className="skill-title">{skill.title}</h4>
            <p className="skill-desc">{skill.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
