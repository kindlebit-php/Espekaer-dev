import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [testName, setTestName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [commonData,setCommonData] = useState({
    userName:""
  })
 
  return (
        <AppContext.Provider value={{commonData,setCommonData, testName, setTestName,userImage, setUserImage }}>
        {children}
        </AppContext.Provider>
  );
};