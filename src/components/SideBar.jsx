import React from "react";
import { X, MessageSquare, CircleHelp } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, sidebarRef }) => {

     const handleWeb = () => {
          window.open("https://pooranaselvan.vercel.app/", "_blank")
     }

     const HandleNewChat = () => {
          setIsSidebarOpen(false);
          alert("Still Under Developement..")
     }
  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full bg-card text-card-foreground shadow-lg transition-transform duration-500 ease-in-out transform 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} z-40 md:w-80`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-wrap flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Conversations</h2>
            <Button size="icon" variant="ghost" onClick={() => setIsSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex flex-wrap p-4">
            <Button variant="ghost" className="w-full justify-start" onClick={HandleNewChat}>
              <MessageSquare className="mr-2 h-4 w-4" />
              New chat
            </Button>
          </ScrollArea>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          <ScrollArea className="flex flex-wrap p-4">
            <Button variant="ghost" className="w-full justify-start font-semibold" onClick={handleWeb}>
              <CircleHelp className="mr-2 h-5 w-5" />
              Help
            </Button>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
