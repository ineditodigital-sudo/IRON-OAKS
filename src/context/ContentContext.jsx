import { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      const response = await fetch('api/cms.php');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const saveContent = async (newData, token) => {
    try {
      const response = await fetch('api/cms.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          token,
          data: newData
        })
      });
      const result = await response.json();
      if (result.success) {
        setContent(newData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving content:', error);
      return false;
    }
  };

  return (
    <ContentContext.Provider value={{ content, loading, saveContent, refreshContent: fetchContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
