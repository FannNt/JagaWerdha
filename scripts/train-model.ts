
import * as tf from '@tensorflow/tfjs';
import fs from 'fs';
import path from 'path';

// Load dataset
const DATA_PATH = path.join(process.cwd(), 'synthetic_glucose_data.json');
const MODEL_DIR = path.join(process.cwd(), 'public', 'models', 'glucose_model_tfjs');

interface GlucoseData {
    id: string;
    glucose: number;
    rawPPG: number[];
}

async function trainModel() {
    console.log("🚀 Starting training process...");

    // 1. Load Data
    if (!fs.existsSync(DATA_PATH)) {
        console.error("❌ Data file not found: " + DATA_PATH);
        process.exit(1);
    }
    const rawData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8')) as GlucoseData[];
    console.log(`📊 Loaded ${rawData.length} samples.`);

    // 2. Preprocessing
    // Convert to Tensors
    const signals = rawData.map(d => d.rawPPG);
    const labels = rawData.map(d => d.glucose);

    // Ensure all signals are same length (300)
    const INPUT_SHAPE = 300;
    const cleanSignals = signals.filter(s => s.length === INPUT_SHAPE);
    const cleanLabels = labels.filter((_, i) => signals[i].length === INPUT_SHAPE);

    if (cleanSignals.length !== signals.length) {
        console.warn(`⚠️ Filtered out ${signals.length - cleanSignals.length} samples with incorrect length.`);
    }

    const xs = tf.tensor2d(cleanSignals, [cleanSignals.length, INPUT_SHAPE]);
    const ys = tf.tensor2d(cleanLabels, [cleanLabels.length, 1]);

    // 3. Define Model
    const model = tf.sequential();

    // Hidden Layer 1: Dense with 64 units and ReLU activation
    model.add(tf.layers.dense({
        inputShape: [INPUT_SHAPE],
        units: 64,
        activation: 'relu'
    }));

    // Hidden Layer 2: Dense with 32 units and ReLU
    model.add(tf.layers.dense({
        units: 32,
        activation: 'relu'
    }));

    // Output Layer: Linear regression (1 unit)
    model.add(tf.layers.dense({
        units: 1,
        activation: 'linear' // Standard for regression
    }));

    model.compile({
        optimizer: tf.train.adam(0.001),
        loss: 'meanSquaredError',
        metrics: ['mse']
    });

    console.log("🧠 Model architecture defined.");
    model.summary();

    // 4. Train
    console.log("🏋️ Training model...");
    await model.fit(xs, ys, {
        epochs: 200,
        batchSize: 32,
        validationSplit: 0.2, // 20% for validation
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                if ((epoch + 1) % 10 === 0) {
                    console.log(`Epoch ${epoch + 1}: loss = ${logs?.loss.toFixed(4)}, val_loss = ${logs?.val_loss?.toFixed(4)}`);
                }
            }
        }
    });

    // 5. Save Model
    // Ensure directory exists
    if (!fs.existsSync(MODEL_DIR)) {
        fs.mkdirSync(MODEL_DIR, { recursive: true });
    }

    // Save using file system scheme
    // Note: TFJS Node saving usually requires @tensorflow/tfjs-node, but we are using pure JS/web version in this env.
    // Standard tf.save uses browser downloads or http.
    // We will save weights/topology manually if needed, or use 'file://' scheme if supported by the backend wrapper.
    // Since we are running in a node environment via bun/tsx, let's try 'file://'.

    // Workaround for pure JS environment limitation if tfjs-node is not present:
    // We construct the artifacts manually or use a specific saver.
    // However, for this setup, we'll try the standard IO handler first.

    try {
        await model.save(`file://${MODEL_DIR}`);
        console.log(`✅ Model saved to ${MODEL_DIR}`);
    } catch (e: any) {
        console.error("⚠️ Failed to save via 'file://' scheme (likely needs tfjs-node).");
        console.log("💾 Attempting manual save...");

        // Manual save logic for pure JS environment
        let modelArtifacts: tf.io.ModelArtifacts | undefined;
        await model.save(tf.io.withSaveHandler(async (artifacts) => {
            modelArtifacts = artifacts;
            return {
                modelArtifactsInfo: {
                    dateSaved: new Date(),
                    modelTopologyType: 'JSON',
                },
            };
        }));

        if (!modelArtifacts) throw new Error('Failed to capture model artifacts');

        // Save model.json
        fs.writeFileSync(
            path.join(MODEL_DIR, 'model.json'),
            JSON.stringify(modelArtifacts, null, 2)
        );

        // Save weights.bin
        // artifacts.weightData is an ArrayBuffer
        // @ts-ignore
        if (modelArtifacts.weightData) {
            fs.writeFileSync(
                path.join(MODEL_DIR, 'weights.bin'),
                // @ts-ignore
                Buffer.from(modelArtifacts.weightData)
            );
        }
        console.log(`✅ Model manually saved to ${MODEL_DIR}`);
    }

    // Clean up tensors
    xs.dispose();
    ys.dispose();
}

trainModel().catch(console.error);
