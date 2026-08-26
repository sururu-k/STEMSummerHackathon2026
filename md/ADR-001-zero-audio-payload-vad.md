# ADR-001: Zero-Audio-Payload VAD and Decentralized Speaker Diarization

## Status
Accepted

## Context
In hackathon presentations and real-time multiplayer conversational analysis, transmitting raw audio streams across multiple mobile client devices introduces severe hurdles:
1. **Privacy Concerns**: Sending raw audio of participants/judges to a central server raises consent and security issues.
2. **Network Bandwidth & Latency**: Transmitting concurrent PCM/Opus streams congests local hackathon Wi-Fi.
3. **Acoustic Cross-talk**: When participants are in the same room, adjacent microphones capture neighboring voices.

## Decision
We implement a **Zero-Audio-Payload Edge VAD** combined with **Decentralized Speaker Diarization**:
1. **Edge VAD via Web Audio API & AudioWorklet**:
   - 300Hz–3400Hz band-pass filtering in client AudioWorklet thread.
   - Local RMS calculation and adaptive noise floor calibration.
   - Only `{ speaking: boolean, level: number }` (10Hz JSON payload) is transmitted over WebSocket.
2. **Server-side Diarization (Max-RMS Arbiter)**:
   - When multiple clients report `speaking: true` simultaneously, the server assigns active speaker status to the client with the highest RMS amplitude.

## Consequences
- **Positive**: Zero raw audio egress, sub-15ms processing latency, minimal network footprint (under 1KB/s per client).
- **Negative**: Relies on client CPU for Worklet calculations (mitigated by ultra-lightweight integer math in VAD).
