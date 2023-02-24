import React, { useState, useEffect } from 'react';
import './App.css';

type Insect = {
  src: string,
  alt: string
}

const App: React.FC = () => {
  const [selectedInsect, setSelectedInsect] = useState<Insect>({src: '', alt: ''});
  const [seconds, setSeconds] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (score > 19) {
      const message = document.getElementById('message');
      if (message) {
        message.classList.add('visible');
      }
    }
  }, [score]);

  const handleStart = () => {
    const screen = document.querySelector('.screen:first-child');
    if (screen) {
      screen.classList.add('up');
    }
  };

  const handleChooseInsect = (src: string, alt: string) => {
    setSelectedInsect({ src, alt });
    const screen = document.querySelector('.screen:nth-child(3)');
    if (screen) {
      screen.classList.add('up');
    }
    setTimeout(() => createInsect(), 1000);
  };

  const createInsect = () => {
    const insectContainer = document.getElementById('game-container');
    if (insectContainer) {
      const { x, y } = getRandomLocation();
      const insect = document.createElement('div');
      insect.classList.add('insect');
      insect.style.top = `${y}px`;
      insect.style.left = `${x}px`;
      insect.addEventListener('click', catchInsect);
      const img = document.createElement('img');
      img.src = selectedInsect.src;
      img.alt = selectedInsect.alt;
      img.style.transform = `rotate(${Math.random() * 360}deg)`;
      insect.appendChild(img);
      insectContainer.appendChild(insect);
    }
  };

  const getRandomLocation = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
  };

  const catchInsect = (e: MouseEvent) => {
    setScore((s) => s + 1);
    const target = e.target as HTMLDivElement;
    target.classList.add('caught');
    setTimeout(() => {
      target.remove();
      addInsects();
    }, 2000);
  };

  const addInsects = () => {
    setTimeout(() => createInsect(), 1000);
    setTimeout(() => createInsect(), 1500);
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
  };
  return (
    <div>
      <div className="screen">
        <h1>Catch The Insect</h1>
        <button className="btn" id="start-btn">Play Game</button>
      </div>

      <div className="screen">
        <h1>What is your "favorite" insect?</h1>
        <ul className="insects-list">
          <li>
            <button className="choose-insect-btn">
              <p>Fly</p>
              <img src="http://pngimg.com/uploads/fly/fly_PNG3946.png" alt="fly" />
            </button>
          </li>
          <li>
            <button className="choose-insect-btn">
              <p>Mosquito</p>
              <img src="http://pngimg.com/uploads/mosquito/mosquito_PNG18175.png" alt="mosquito" />
            </button>
          </li>
          <li>
            <button className="choose-insect-btn">
              <p>Spider</p>
              <img src="http://pngimg.com/uploads/spider/spider_PNG12.png" alt="spider" />
            </button>
          </li>
          <li>
            <button className="choose-insect-btn">
              <p>Roach</p>
              <img src="http://pngimg.com/uploads/roach/roach_PNG12163.png" alt="roach" />
            </button>
          </li>
        </ul>
      </div>

      <div className="screen game-container" id="game-container">
        <h3 id="time" className="time">Time: 00:00</h3>
        <h3 id="score" className="score">Score: 0</h3>
        <h5 id="message" className="message">
          Are you annoyed yet? <br />
          You are playing an impossible game!!
        </h5>
      </div>

    </div>
  );
}

export default App;