import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { MainLayout } from './components/MainLayout';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background - Figma Hero for Login, Multi-Color for Main App */}
      {!isLoggedIn ? (
        // Figma Hero Background for Login
        <div 
          className="fixed inset-0 -z-10" 
          style={{ 
            backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 1920 414\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(225.35 53.511 -287.15 194.61 -224.21 -73.476)\\\'><stop stop-color=\\\'rgba(0,3,67,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(1,5,92,1)\\\' offset=\\\'0.4409\\\'/><stop stop-color=\\\'rgba(7,12,120,1)\\\' offset=\\\'0.58067\\\'/><stop stop-color=\\\'rgba(13,19,148,1)\\\' offset=\\\'0.72045\\\'/><stop stop-color=\\\'rgba(24,33,204,1)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      ) : (
        // Multi-Color Background for Main App
        <div className="fixed inset-0 -z-10">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-pink-50/30"></div>
          
          {/* Large floating gradient orbs */}
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20" 
               style={{background: 'radial-gradient(circle, #0E19EF 0%, transparent 70%)'}}></div>
          <div className="absolute -top-20 -right-40 w-80 h-80 rounded-full blur-3xl opacity-15"
               style={{background: 'radial-gradient(circle, #FF248E 0%, transparent 70%)'}}></div>
          <div className="absolute -bottom-40 left-1/4 w-72 h-72 rounded-full blur-2xl opacity-10"
               style={{background: 'radial-gradient(circle, #0E19EF 0%, transparent 70%)'}}></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-2xl opacity-12"
               style={{background: 'radial-gradient(circle, #FF248E 0%, transparent 70%)'}}></div>
          
          {/* Medium floating orbs */}
          <div className="absolute top-1/4 left-1/2 w-48 h-48 rounded-full blur-xl opacity-8"
               style={{background: 'radial-gradient(circle, #0E19EF 0%, transparent 60%)'}}></div>
          <div className="absolute bottom-1/3 left-1/4 w-40 h-40 rounded-full blur-xl opacity-6"
               style={{background: 'radial-gradient(circle, #FF248E 0%, transparent 60%)'}}></div>
          
          {/* Subtle mesh overlay */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0E19EF 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }}></div>
          
          {/* Diagonal accent lines */}
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0E19EF]/30 to-transparent transform rotate-12 origin-left"></div>
            <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF248E]/30 to-transparent transform -rotate-12 origin-left"></div>
            <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0E19EF]/30 to-transparent transform rotate-12 origin-left"></div>
          </div>
          
          {/* Additional organic shapes */}
          <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full blur-lg opacity-6"
               style={{background: 'linear-gradient(45deg, #0E19EF, #FF248E)'}}></div>
          <div className="absolute top-3/4 left-1/3 w-24 h-24 rounded-full blur-lg opacity-4"
               style={{background: 'linear-gradient(-45deg, #FF248E, #0E19EF)'}}></div>
        </div>
      )}

      {/* App Content */}
      {!isLoggedIn ? (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <MainLayout />
      )}
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}