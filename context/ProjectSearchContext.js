import React, { createContext, useState } from 'react';

export const ProjectSearchContext = createContext();

export const ProjectSearchProvider = ({ children }) => {
  const [projectSearched, setProjectSearched] = useState('');

  return (
    <ProjectSearchContext.Provider value={{ projectSearched, setProjectSearched }}>
      {children}
    </ProjectSearchContext.Provider>
  );
};