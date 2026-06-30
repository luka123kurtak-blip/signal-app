function playMetallicStrike(ctx: AudioContext, startTime: number) {
  const fundamental = 480;
  const partials = [
    { mult: 1, gain: 1, decay: 1.6 },
    { mult: 2.8, gain: 0.55, decay: 1.2 },
    { mult: 4.6, gain: 0.35, decay: 0.9 },
    { mult: 6.1, gain: 0.2, decay: 0.7 },
  ];

  for (const { mult, gain, decay } of partials) {
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = fundamental * mult;

    amp.gain.setValueAtTime(0.001, startTime);
    amp.gain.exponentialRampToValueAtTime(0.95 * gain, startTime + 0.006);
    amp.gain.exponentialRampToValueAtTime(0.001, startTime + decay);

    osc.connect(amp);
    amp.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + decay + 0.05);
  }

  const length = Math.floor(ctx.sampleRate * 0.18);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (length * 0.07));
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 2600;
  filter.Q.value = 1.4;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.001, startTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.62, startTime + 0.004);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  noise.start(startTime);
  noise.stop(startTime + 0.35);
}

/** Голосний металевий удар — кінець раунду в боксі */
export function playBeep(ctx: AudioContext) {
  const now = ctx.currentTime;
  const gap = 0.38;
  const strikes = 5;

  for (let i = 0; i < strikes; i++) {
    playMetallicStrike(ctx, now + gap * i);
  }
}
