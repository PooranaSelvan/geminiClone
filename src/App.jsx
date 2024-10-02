import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { Button } from "./components/ui/button";
import Sidebar from './components/SideBar';
import GeminiChat from './components/GeminiChat';
import "./App.css";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const handleNewChat = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative h-screen bg-background">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Button ref={toggleButtonRef} className="fixed top-2 left-4 z-40" size="icon" variant="outline" onClick={toggleSidebar}>
        <Menu className="h-4 w-4" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sidebarRef={sidebarRef} handleNewChat={handleNewChat} className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg transition-transform transform 
        ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      />

      <div className={`h-full transition-margin duration-500 ease-in-out ${ isSidebarOpen ? 'ml-64 md:ml-64' : 'ml-0' }`}>
        <header className="flex items-center p-1 pl-20 bg-card shadow-md">
          <h1 className="font-semibold text-3xl sm:text-4xl">GEMINI</h1>
        </header>
        <div className="p-4 sm:p-10 max-w-4xl mx-auto">
          <GeminiChat />
        </div>
      </div>
    </div>
  );
};

export default App;
