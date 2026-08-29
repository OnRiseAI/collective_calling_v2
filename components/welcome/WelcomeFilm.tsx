'use client'

/**
 * Standalone 9:16 welcome film. Not the first-visit gate. Chrome-free so the
 * cut can be watched on a phone without the designed overlay sitting on top.
 */
export function WelcomeFilm(): React.JSX.Element {
  return (
    <div className="flex min-h-svh items-center justify-center bg-[#141009]">
      <video
        src="/videos/welcome-gate.mp4"
        poster="/videos/welcome-gate.png"
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="auto"
        className="h-svh w-auto max-w-full object-contain"
      >
        The welcome film could not be played.
      </video>
    </div>
  )
}

export default WelcomeFilm
