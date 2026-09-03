// Audio synthesizer for realistic paper tear sound using Web Audio API
export function playPaperTearSound() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const duration = 0.22; // 220ms
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const channelData = buffer.getChannelData(0);

    // Generate textured paper friction noise with micro-crackles
    for (let i = 0; i < bufferSize; i++) {
      const progress = i / bufferSize;
      // Irregular bursts simulating tearing paper fibers
      const burst = Math.sin(progress * Math.PI) * (Math.random() * 2 - 1);
      const crackle = Math.random() > 0.4 ? (Math.random() * 1.8 - 0.9) : 0;
      channelData[i] = (burst * 0.7 + crackle * 0.3) * Math.exp(-progress * 4);
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    // Bandpass filter centered at paper tear frequencies (~1.6kHz - 2.4kHz)
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1900, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + duration);
    filter.Q.value = 1.4;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.28, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseSource.start();
  } catch {
    // Audio context may be restricted before user gesture
  }
}
