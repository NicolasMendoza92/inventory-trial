import React, { createContext, useState } from 'react';

export const ProjectSearchContext = createContext();

export const ProjectSearchProvider = ({ children }) => {
  const [projectSearched, setProjectSearched] = useState('');

  const [filtersMui, setFiltersMui] = useState({
    regulatedMarket: [], // Inicialmente vacío
    corsia: [], // Inicialmente vacío
    ccp: [], // Inicialmente vacío
  });


  return (
    <ProjectSearchContext.Provider value={{ projectSearched, setProjectSearched, filtersMui, setFiltersMui }}>
      {children}
    </ProjectSearchContext.Provider>
  );
};