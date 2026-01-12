
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Interface matching the user's Firestore data
interface GlucoseData {
    id: string;
    userId: string;
    glucose: number;
    rawPPG: number[];
    bpm: number;
    confidence: number;
    timestamp: number;
    createdAt: string; // ISO String
}

// Configuration
const DATASET_SIZE = 5000;
const SIGNAL_LENGTH = 300; // Match the approx length of user's sample (approx 300 samples for 10-15s at 30fps)

function generateSyntheticSignal(glucoseLevel: number): { signal: number[], calculatedBpm: number } {
    // Simulate PPG waveform
    // Higher glucose might slightly alter signal complexity or variance (mock correlation)

    // Base heart rate between 60 and 100
    const baseBpm = 60 + Math.random() * 40;
    const frequency = baseBpm / 60; // Hz
    const samplingRate = 30; // Hz

    const signal: number[] = [];

    // Glucose feature injection: 
    // Let's assume higher glucose adds a specific high-frequency noise or alters the dicrotic notch
    const glucoseFactor = (glucoseLevel - 70) / 100; // Normalized roughly 0 to 1.5

    for (let i = 0; i < SIGNAL_LENGTH; i++) {
        const t = i / samplingRate;

        // Systolic peak
        const systolic = Math.sin(2 * Math.PI * frequency * t);

        // Diastolic peak (dicrotic notch) - usually shifted
        const diastolic = 0.5 * Math.sin(2 * Math.PI * (frequency * 2) * t + 0.5);

        // Base waveform
        let val = systolic + diastolic;

        // Add "Glucose Signature" (Mocking a feature for the AI to learn)
        // e.g., Higher glucose -> higher amplitude variation or specific harmonic
        val += 0.1 * glucoseFactor * Math.sin(2 * Math.PI * (frequency * 5) * t);

        // Noise
        val += (Math.random() - 0.5) * 0.1;

        signal.push(val);
    }

    // Normalize signal (Z-Score standardization like in the user's sample approx range)
    // User sample range is roughly -1 to 0.2. Let's normalize to mean 0 std 1 then scale/shift if needed.
    // Actually user sample looks like it has a baseline drift and normalized values. 
    // We'll standard normalize it.

    const mean = signal.reduce((a, b) => a + b, 0) / signal.length;
    const std = Math.sqrt(signal.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / signal.length);

    const normalizedSignal = signal.map(x => (x - mean) / std);

    return { signal: normalizedSignal, calculatedBpm: Math.round(baseBpm) };
}

function generateDataset() {
    const dataset: GlucoseData[] = [];
    const userIds = [
        "d6cbd21f-045d-4320-9a58-ce837ea911d0",
        "wQjhcSkCiFYO3vCwIL1el1MVaOE3",
        "user_synthetic_01",
        "user_synthetic_02"
    ];

    console.log(`Generating ${DATASET_SIZE} synthetic samples...`);

    for (let i = 0; i < DATASET_SIZE; i++) {
        // Target Glucose: Normal distribution centered around 100, range 70-180
        const glucose = Math.floor(70 + Math.random() * 110 + (Math.random() > 0.8 ? 50 : 0)); // Occasional spikes

        const { signal, calculatedBpm } = generateSyntheticSignal(glucose);

        const now = Date.now();
        const pastTime = now - Math.floor(Math.random() * 10000000); // Random time in past
        const date = new Date(pastTime);

        const entry: GlucoseData = {
            id: uuidv4(),
            userId: userIds[Math.floor(Math.random() * userIds.length)],
            glucose: glucose,
            rawPPG: signal,
            bpm: calculatedBpm,
            confidence: 90 + Math.random() * 10,
            timestamp: pastTime,
            createdAt: date.toISOString()
        };

        dataset.push(entry);
    }

    const outputPath = path.join(process.cwd(), 'synthetic_glucose_data.json');
    fs.writeFileSync(outputPath, JSON.stringify(dataset, null, 2));

    console.log(`✅ Success! Dataset saved to ${outputPath}`);
    console.log(`First sample preview: Glucose ${dataset[0].glucose} mg/dL, Signal Length: ${dataset[0].rawPPG.length}`);
}

generateDataset();
