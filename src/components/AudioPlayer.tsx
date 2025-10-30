'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface AudioPlayerProps {
  src: string;
  title?: string;
}

export default function AudioPlayer({ src, title = "Rooted & Radiant Theme" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Auto-play when component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log('Auto-play prevented:', error);
          });
      }
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleLoadedData = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleCanPlay = () => {
    if (audioRef.current && !duration) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && progressBarRef.current && duration) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Sparkle/Glitter Effect Background */}
      <style jsx>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        .sparkle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: radial-gradient(circle, #D4AF37 0%, transparent 70%);
          border-radius: 50%;
          animation: sparkle 2.5s infinite;
        }
        .sparkle:nth-child(1) { top: 15%; left: 10%; animation-delay: 0s; }
        .sparkle:nth-child(2) { top: 25%; left: 30%; animation-delay: 0.4s; }
        .sparkle:nth-child(3) { top: 20%; left: 60%; animation-delay: 0.8s; }
        .sparkle:nth-child(4) { top: 30%; left: 80%; animation-delay: 1.2s; }
        .sparkle:nth-child(5) { top: 45%; left: 15%; animation-delay: 1.6s; }
        .sparkle:nth-child(6) { top: 55%; left: 70%; animation-delay: 0.3s; }
        .sparkle:nth-child(7) { top: 65%; left: 40%; animation-delay: 0.7s; }
        .sparkle:nth-child(8) { top: 70%; left: 90%; animation-delay: 1.1s; }
      `}</style>
      
      <div className="fixed bottom-0 left-0 right-0 z-[100] backdrop-blur-md bg-gradient-to-r from-amber-50/35 via-yellow-50/30 to-amber-50/35 border-t border-amber-200/20 shadow-2xl">
        {/* Sparkle overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
        </div>

        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onLoadedData={handleLoadedData}
          onCanPlay={handleCanPlay}
          onEnded={() => setIsPlaying(false)}
          loop
        />
        
        <div className="max-w-7xl mx-auto px-3 py-1.5">
          {/* Spotify-style Progress Bar */}
          <div className="mb-1 flex items-center gap-1.5 text-[10px] text-amber-900/70 font-medium">
            <span className="w-8 text-right">{formatTime(currentTime)}</span>
            <div 
              ref={progressBarRef}
              className="flex-1 h-0.5 bg-amber-200/60 rounded-full cursor-pointer group relative"
              onClick={handleProgressBarClick}
            >
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-100 relative"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity border border-amber-300"></div>
              </div>
            </div>
            <span className="w-8 text-left">{formatTime(duration)}</span>
          </div>

          {/* Main Player Controls */}
          <div className="flex items-center justify-between gap-3">
            {/* Left: Album Cover & Track Info */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="relative w-10 h-10 flex-shrink-0 rounded overflow-hidden shadow-md">
                <Image
                  src="/logo.png"
                  alt="Rooted & Radiant Album Cover"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold truncate text-amber-900 hover:underline cursor-pointer">
                  {title}
                </div>
                <div className="text-[10px] text-amber-700/70 truncate">
                  Rooted & Radiant
                </div>
              </div>
            </div>

            {/* Center: Play/Pause Button Only */}
            <div className="flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-900 text-white hover:scale-110 transition-transform shadow-lg hover:shadow-xl"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Right: Volume Control - Always Visible */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                className="text-amber-700 hover:text-amber-900 transition-colors"
                aria-label="Volume"
              >
                {volume === 0 ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                ) : volume < 0.5 ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                )}
              </button>
              
              {/* Always visible volume slider */}
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-0.5 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  style={{
                    background: `linear-gradient(to right, rgb(212, 175, 55) 0%, rgb(212, 175, 55) ${volume * 100}%, rgb(254, 243, 199) ${volume * 100}%, rgb(254, 243, 199) 100%)`
                  }}
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
