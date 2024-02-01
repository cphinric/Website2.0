import React, {useRef, useEffect, useState} from 'react'; 
import { useSpring, animated, config} from 'react-spring';
import './App.css';
import Typewriter from "./Typewriter";
import backgroundVideo from './videos/dark_background.mp4';

function WaveText({ text }) {
  // Split text into letters and wrap each letter in a span
  const letters = text.split('').map((letter, index) => (
    <span key={index} style={{ display: 'inline-block', '--i': index }}>{letter}</span>
  ));

  return <div className="wave-text">{letters}</div>;
  
}

function SlideCard({ index, children }) {
  const delay = index * 500; // Adjust the delay multiplier as needed

  const slideAnimation = useSpring({
    from: {
      transform: 'translateY(1000px) scale(0)'
    },
    to: {
      transform: 'translateY(0px) scale(1)'
    },
    config: config.slow,
    delay: delay
  });

  return (
    <animated.div style={slideAnimation} className="card">
      <div className="card-header">
        <div className="card-header-button maximize"></div>
        <div className="card-header-button minimize"></div>
        <div className="card-header-button close"></div>
      </div>
      <div className="card-content">
        {children}
      </div>
    </animated.div>
  );
}

function App() {
  const videoRef = useRef(null);
  const [repos, setRepos] = useState([]);
  const [externalRepo, setExternalRepo] = useState(null);
  const desiredProjects = ['Website2.0', 'ProjectName2', 'ProjectName3'];
  const externalRepoName = 'CSCE4623-Fayettefun';
  const externalRepoOwner = 'acostaldi';

  // Change playback speed of video background
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/users/cphinric/repos')
        .then(response => response.json())
        .then(data => {
          // Filter the projects based on the desiredProjects array
          const filteredProjects = data.filter(repo => desiredProjects.includes(repo.name));
          setRepos(filteredProjects);
        })
        .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${externalRepoOwner}/${externalRepoName}`)
      .then(response => response.json())
      .then(data => {
        setExternalRepo(data);
      })
      .catch(error => console.error(error));
  }, []);

  // Starting Animation
  const startAnimation = useSpring({
    from: {opacity: 0},
    to: {opacity: 1},
    config: {duration: 2000}
  })

  // Looping Animation
  const loopAnimation = useSpring({
    from: { 
      transform: 'translateY(5px)' // Start position
    },
    to: [
      { 
        transform: 'translateY(-5px)' // Move up
      },
      { 
        transform: 'translateY(5px)' // Move down
      }
    ],
    config: config.wobbly,
    loop: true
  })

  return (
    <animated.div style={startAnimation} className="body">
      <video autoPlay muted loop className="video-background" ref={videoRef}>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div style={loopAnimation} className="header">
        <h1 style={{ color: 'greenyellow' }}><WaveText text = "Parker Hinrichs" delay={100}/></h1>
        <h2 style={{ color: 'greenyellow' }}><WaveText text = "Full-Satck Developer" delay={100}/></h2>
      </div>

      <div className="row">
        <div className="fullCard">
          <SlideCard index={0}>
              <h2>root@parker-os:~$ <Typewriter text="About_Me" delay={100}/></h2>
              <p>Hello, I'm Parker Hinrichs, a dedicated Computer Science major at the University of Arkansas.</p>
          </SlideCard> 
        </div>
        <div className="fullCard">
          <SlideCard index={1}>
            <h2>root@parker-os:~$ <Typewriter text="Testimonials" delay={100}/></h2>
            <ul>
              <p>"If I was responsible for assembling a project team, Charles is the first person I would choose. He has the dedication and hard work ethic to accomplish any goal. I have directly supervised Charles for the last six months. He worked with some our most difficult clients, putting them at ease and resolving their IT issues. Chares was able to develop novel approaches to some of our most difficult problems. He managed his own work schedule to provide the maximum effort to our team. During my prolonged absence, he stepped up to provide excellent support and participation to our department. He is inquisitive and always looking for the best solutions to complex problems. He provided excellent service to a diverse employee base and left everyone feeling better after resolving their issues. I give him my unqualified recommendation and know he will be worthy addition to any work situation."
                -James Simth
                Information Technology Specialist at the University of Arknasas
              </p>
            </ul>
          </SlideCard>
        </div>
        <div className="fullCard">
        <SlideCard index={2}>
            <h2>root@parker-os:~$ <Typewriter text="Projects" delay={100}/></h2>
            <ul>
                {repos.map(repo => (
                    <li key={repo.id}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.name}
                        </a>
                        <p>-{repo.description}<br/><br/></p>
                    </li>
                ))}
                {externalRepo && (
                    <li key={externalRepo.id}>
                        <a href={externalRepo.html_url} target="_blank" rel="noopener noreferrer">
                            {externalRepo.name}
                        </a>
                        <p>-{externalRepo.description}<br/><br/></p>
                    </li>
                )}
            </ul>
          </SlideCard>
        </div>
        <div className="rightCard">
          <SlideCard index={2}>
            <h2>root@parker-os:~$ <Typewriter text="Contact_Me" delay={100}/></h2>
            <ul>
              <li>(479) 319-9663</li>
              <li><a href="mailto:parkerhinrichs914@gmail.com">parkerhinrichs914@gmail.com</a></li>
              <li><a href="https://www.linkedin.com/in/charles-hinrichs-738667231/">linkedin</a></li>
              <li><a href="https://github.com/cphinric">GitHub</a></li>
            </ul>
          </SlideCard>
        </div>
        <div className="rightCard">
          <SlideCard index={3}>
            <h2>root@parker-os:~$ <Typewriter text="Resume" delay={100}/></h2>
            <ul>
              <li><a href="Resume.pdf" download>Click Here</a></li>
            </ul>
          </SlideCard>
        </div>
      </div>
    </animated.div>
  );
}

export default App;
