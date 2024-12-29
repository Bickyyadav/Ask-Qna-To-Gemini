// import React from 'react'

import { useContext } from 'react';
import { assets } from '../../assets/assets';
import './Main.css';
import { Context } from '../../context/Context';

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultDate, setInput, input } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user_icon" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hellow, Dev.</span>
              </p>
              <p>How can i help you todoay</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beatuiful place for the upcomming road trip.</p>
                <img src={assets.compass_icon} alt="compass_icon" />
              </div>
              <div className="card">
                <p>Brefly summarize this concept: urban planning.</p>
                <img src={assets.bulb_icon} alt="bulb_icon" />
              </div>
              <div className="card">
                <p>Brainstrom tream bonding activities for our work retreat.</p>
                <img src={assets.message_icon} alt="message_icon" />
              </div>
              <div className="card">
                <p>Improve the reability of the following code</p>
                <img src={assets.code_icon} alt="code_icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-date">
              <img src={assets.gemnini_icon} alt="gemini_icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultDate }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={e => {
                setInput(e.target.value);
              }}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery_icon" />
              <img src={assets.mic_icon} alt="mic_icon" />
             {input? <img onClick={() => onSent()} src={assets.send_icon} alt="send_icon" />: null}
            </div>
          </div>
          <div className="bottom-into">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti ipsam odio reprehenderit quo, iste repellat blanditiis voluptatibus ex nulla rem unde officiis aperiam et placeat ab
            totam dolor qui corporis.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
