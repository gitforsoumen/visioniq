import React from 'react';
import { Upload, FileText, History, Shield, LogOut, User } from 'lucide-react';
import { ViewType } from './MainLayout';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Logo } from './Logo';

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'upload' as ViewType, label: 'Upload', icon: Upload },
    { id: 'history' as ViewType, label: 'History', icon: History },
  ];

  return (
    <TooltipProvider delayDuration={200}>
      <nav className="w-16 bg-gradient-to-b from-[#000343] via-[#01055C] to-[#1821CC] border-r border-blue-800/50 flex flex-col shadow-lg">
        {/* Header */}
        <div className="p-3 border-b border-blue-700/30 flex justify-center">
          <Tooltip>
            <TooltipTrigger className="bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center cursor-pointer border-0 hover:bg-white/20 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-white hover:scale-105 p-1.5">
              <Logo variant="icon" />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600 }}>VisionIQ</p>
              <p className="text-gray-400" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 400, fontSize: '0.75rem' }}>Document Processing</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 p-2 space-y-3 flex flex-col items-center pt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ease-out border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-white ${
                    isActive 
                      ? 'bg-white/25 text-white fluent-shadow hover:bg-white/35 backdrop-blur-sm scale-105' 
                      : 'text-blue-200 hover:text-white hover:bg-white/15 hover:scale-105'
                  }`}
                  onClick={() => onViewChange(item.id)}
                >
                  <Icon className="w-5 h-5" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600 }}>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        <Separator className="mx-2 bg-blue-700/30" />

        {/* User Section */}
        <div className="p-2 space-y-3 flex flex-col items-center pb-4">
          <Tooltip>
            <TooltipTrigger className="w-10 h-10 bg-gradient-to-tr from-[#0E19EF] to-[#FF248E] backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer border-0 hover:scale-110 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-white shadow-md">
              <User className="w-5 h-5 text-white" />
            </TooltipTrigger>
            <TooltipContent side="right">
              <div style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '0.875rem' }}>
                <p style={{ fontWeight: 600 }}>John Doe</p>
                <p className="text-gray-400" style={{ fontWeight: 400, fontSize: '0.75rem' }}>Admin</p>
                <p className="text-gray-500 mt-1" style={{ fontWeight: 400, fontSize: '0.75rem' }}>Last login: Today</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger
              className="w-10 h-10 rounded-xl flex items-center justify-center text-blue-200 hover:text-white hover:bg-white/15 transition-all duration-200 ease-out cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-white hover:scale-105"
              onClick={() => window.location.reload()}
            >
              <LogOut className="w-4 h-4" />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600 }}>Sign Out</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </nav>
    </TooltipProvider>
  );
}