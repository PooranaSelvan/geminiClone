import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, MessageSquare } from 'lucide-react';
import { Button } from "./components/ui/button";
import { ScrollArea } from "./components/ui/scroll-area";
import GeminiChat from './components/GeminiChat';
import "./App.css"

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const handleNewChat = () => {
    setIsSidebarOpen(false);
  }

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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

      <Button
        ref={toggleButtonRef}
        className="fixed top-4 left-4 z-40"
        size="icon"
        variant="outline"
        onClick={toggleSidebar}
      >
        <Menu className="h-4 w-4" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-card text-card-foreground shadow-lg transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } z-40 md:w-80`} // Adjusted width for larger screens
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Conversations</h2>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
          <ScrollArea className="flex-grow">
            <nav className="p-4 space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" onClick={handleNewChat} />
                New chat
              </Button>
            </nav>
          </ScrollArea>
        </div>
      </aside>

      <main className={`h-full transition-margin duration-300 ease-in-out ${isSidebarOpen ? 'ml-64 md:ml-80' : 'ml-0'}`}>
        <header className="flex items-center p-4 pl-20 bg-card shadow-md">
          <h1 className="font-semibold text-3xl sm:text-4xl">GEMINI</h1>
        </header>
        <div className="p-4 sm:p-10 max-w-4xl mx-auto">
          <GeminiChat />
        </div>
      </main>
    </div>
  );
}

export default App;