// import React from 'react'
import './sidebar.css';
import { assets } from '../../assets/assets';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
const SideBar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async(prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
    
  }
  

  const handlesidebar = () => {
    setExtended(!extended);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img className="menu" src={assets.menu_icon} alt="menu_icon" onClick={handlesidebar} />
        <div  onClick={()=>newChat()}className="new-chat">
          <img src={assets.plus_icon} alt="plus_icon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item) => {
              return (
                <>
                  <div  onClick={()=>loadPrompt(item)}  className="recent-entry">
                    <img src={assets.message_icon} alt="message.icon" />
                    <p>{item.slice(0,18)}</p>
                  </div>
                </>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="question_icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="question_icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="question_icon" />
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
