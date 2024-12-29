/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import run from '../config/gemini';

export const Context = createContext();

const ContextProvider = props => {
  const [input, setInput] = useState('');
  const [recentPrompt, setRecentPrompt] = useState('');
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultDate, setResultData] = useState('');


  const delayPara =(index,nexWord)=>{
    setTimeout(() => {
        setResultData((prev)=>prev+nexWord)
        
    }, 75*index);
  }


  const newChat = ()=>{
    setLoading(false);
    setShowResult(false);
  }
  
  const onSent = async (prompt) => {
    setResultData('');
    setLoading(true);
    setShowResult(true);
    // -----------------for the side bar to search 
    let response;
    if (prompt !== undefined) {
      response= await run(prompt);
      setRecentPrompt(prompt);
    }
    else{
      setPrevPrompt((prev)=>[...prev,input])
      setRecentPrompt(input);
      response = await run(input)
      
    }
    let responseArray = response.split('**');
    let newResponse="";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i%2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += '<b>' + responseArray[i] + '</b>';

      }
    }
    
    let newResponse2 = newResponse.split("*").join("</br> ")
    let newResponseArray = newResponse2.split(" ");
    for (let index = 0; index < newResponse2.length; index++) {
     const nextword = newResponseArray[index]   ;
     if (nextword) {
      delayPara(index, nextword + ' ');
  }
    }

    setResultData(newResponse2);
    setLoading(false);
    setInput('');
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultDate,
    input,
    setInput,
    newChat
  };

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
