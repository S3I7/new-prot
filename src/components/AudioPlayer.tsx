import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

interface AudioPlayerProps {
  src?: string;
  title?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src = '/audio/bgm.mp3',
  title = 'TAME IMPALA'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.55;
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Playback waiting for user interaction:', err);
        });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      className="manga-audio-pill"
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        right: '1.25rem',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '2px solid #000000',
        boxShadow: '3px 3px 0px #000000',
        padding: '0.35rem 0.65rem'
      }}
    >
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="manga-audio-btn"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause' : 'Play'}
        style={{
          width: '1.75rem',
          height: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          color: '#FFFFFF',
          border: '1px solid #000000',
          cursor: 'pointer',
          flexShrink: 0
        }}
      >
        {isPlaying ? <Pause size={12} /> : <Play size={12} style={{ marginLeft: '1px' }} />}
      </button>

      {/* Mini Equalizer Wave */}
      <div
        className="manga-audio-bars"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '2px',
          height: '14px',
          padding: '1px 3px',
          border: '1px solid #000000',
          backgroundColor: '#F5F5F5'
        }}
      >
        <span
          className={`manga-audio-bar ${isPlaying ? 'playing-1' : ''}`}
          style={{ width: '2px', backgroundColor: '#000000', height: isPlaying ? undefined : '4px' }}
        />
        <span
          className={`manga-audio-bar ${isPlaying ? 'playing-2' : ''}`}
          style={{ width: '2px', backgroundColor: '#000000', height: isPlaying ? undefined : '8px' }}
        />
        <span
          className={`manga-audio-bar ${isPlaying ? 'playing-3' : ''}`}
          style={{ width: '2px', backgroundColor: '#000000', height: isPlaying ? undefined : '3px' }}
        />
      </div>

      {/* Track Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '2px' }}>
        <Music size={12} style={{ color: '#000000' }} />
        <span
          style={{
            fontWeight: 'bold',
            color: '#000000',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontSize: '11px',
            whiteSpace: 'nowrap'
          }}
        >
          {title}
        </span>
      </div>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        style={{
          padding: '2px',
          color: '#000000',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          marginLeft: '2px',
          display: 'flex',
          alignItems: 'center'
        }}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>
    </div>
  );
};
