import React from 'react'; 
import './App.css'; 
import backgroundVideo from './videos/backgroundVideo.mp4';

function MyButton() {
  return (<button>Light/Dark</button>);
}

function App() {
  return (
    <div className="body">
      <video autoPlay muted loop className="video-background">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="header">
        <h1 style={{ color: 'greenyellow' }}>Parker Hinrichs</h1>
        <p style={{ color: 'greenyellow' }}>Student at the University of Arkansas College of Engineering</p>
      </div>

      <div className="row">
        <div className="centerbox">
            <div className="card">
              <h2>About Me</h2>
              <p>Hello, I'm Parker Hinrichs, a dedicated Computer Science major at the University of Arkansas. Welcome to my digital space, where I share my passion for all things tech and beyond!</p>
            </div>
        </div>
        <div className="centerbox">
          <div className="card">
            <h2>Contact Me</h2>
            <ul>
              <li>(479) 319-9663</li>
              <li><a href="mailto:parkerhinrichs914@gmail.com">parkerhinrichs914@gmail.com</a></li>
              <li><a href="https://www.linkedin.com/in/charles-hinrichs-738667231/"><button className="custom_button">Linkedin</button></a></li>
            </ul>
          </div>
        </div>
        <div className="centerbox">
          <div className="card">
            <h2>Download My Resume</h2>
            <ul>
              <li><a href="Resume.docx" download="Resume.docx">.docx</a></li>
              <li><a href="Resume.docx" download="Resume.docx">.pdf</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
