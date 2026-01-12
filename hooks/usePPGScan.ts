
import { useEffect, useRef, useState, useCallback } from 'react';

interface PPGState {
    isScanning: boolean;
    progress: number; // 0-100
    isFingerDetected: boolean;
    bpm: number;
    error: string | null;
    isDone: boolean;
    // Debug info
    debugR?: number;
    debugG?: number;
    debugB?: number;
}

export function usePPGScan(
    videoRef: React.RefObject<HTMLVideoElement | null>,
    canvasRef: React.RefObject<HTMLCanvasElement | null>
) {
    const [state, setState] = useState<PPGState>({
        isScanning: false,
        progress: 0,
        isFingerDetected: false,
        bpm: 0,
        error: null,
        isDone: false
    });

    const signalRef = useRef<number[]>([]);
    const processingRef = useRef<number | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // Configuration
    const TARGET_FPS = 30;
    const SCAN_DURATION_MS = 10000;
    const MIN_SIGNAL_LENGTH = (SCAN_DURATION_MS / 1000) * TARGET_FPS;

    // Front Camera Thresholds
    const MIN_BRIGHTNESS = 40;
    const RED_LIMIT_RATIO = 1.2;

    // Start Camera (Front Facing)
    const initCamera = useCallback(async () => {
        try {
            if (streamRef.current) return;

            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "user",
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    frameRate: { ideal: TARGET_FPS },
                    // @ts-ignore
                    brightness: { ideal: 100 }
                }
            });

            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play().catch(e => console.warn("Auto-play blocked:", e));
            }
        } catch (err: any) {
            console.error("Camera Init Error:", err);
            setState(prev => ({
                ...prev,
                error: (err.name === 'NotAllowedError')
                    ? "Akses kamera ditolak."
                    : "Gagal membuka kamera depan."
            }));
        }
    }, [videoRef]);

    // Stop Camera
    const stopCamera = useCallback(() => {
        if (processingRef.current) {
            cancelAnimationFrame(processingRef.current);
            processingRef.current = null;
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    }, [videoRef]);

    // Frame Processing Loop
    const processFrame = useCallback(() => {
        if (!state.isScanning || state.isDone) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas || video.readyState !== 4) {
            processingRef.current = requestAnimationFrame(processFrame);
            return;
        }

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        const SAMPLE_SIZE = 30;
        canvas.width = SAMPLE_SIZE;
        canvas.height = SAMPLE_SIZE;
        ctx.drawImage(video, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);

        const frame = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
        const data = frame.data;

        let rSum = 0;
        let gSum = 0;
        let bSum = 0;
        let count = 0;

        for (let i = 0; i < data.length; i += 4) {
            rSum += data[i];
            gSum += data[i + 1];
            bSum += data[i + 2];
            count++;
        }

        const avgR = rSum / count;
        const avgG = gSum / count;
        const avgB = bSum / count;

        /* --- FINGER DETECTION LOGIC --- */
        const isRedDominant = (avgR > avgG * RED_LIMIT_RATIO) && (avgR > avgB * RED_LIMIT_RATIO);
        const isBrightEnough = avgR > MIN_BRIGHTNESS;

        const isCovered = (avgR > avgG + 10) && (avgR > avgB + 10) && isBrightEnough;

        setState(prev => {
            const newState = { ...prev, debugR: Math.round(avgR), isFingerDetected: isCovered };
            return newState;
        });

        if (isCovered) {
            signalRef.current.push(avgR);

            const visualBpm = 70 + (Math.sin(Date.now() / 500) * 10);
            const currentLength = signalRef.current.length;
            const progress = Math.min((currentLength / MIN_SIGNAL_LENGTH) * 100, 100);

            setState(prev => ({
                ...prev,
                progress,
                bpm: Math.floor(visualBpm)
            }));

            if (progress >= 100) {
                finishScan();
                return;
            }
        }

        processingRef.current = requestAnimationFrame(processFrame);
    }, [state.isScanning, state.isDone, videoRef, canvasRef]);

    // Start / Stop
    useEffect(() => {
        if (state.isScanning && !processingRef.current) {
            signalRef.current = [];
            processingRef.current = requestAnimationFrame(processFrame);
        }
    }, [state.isScanning, processFrame]);

    // Helper functions
    const startScan = () => {
        setState(prev => ({ ...prev, isScanning: true, isDone: false, progress: 0, error: null }));
    };

    const finishScan = () => {
        setState(prev => ({ ...prev, isScanning: false, isDone: true }));
        if (processingRef.current) {
            cancelAnimationFrame(processingRef.current);
            processingRef.current = null;
        }
    };

    useEffect(() => {
        initCamera();
        return () => stopCamera();
    }, [initCamera, stopCamera]);

    return {
        ...state,
        startScan,
        signalData: signalRef.current,
        stopCamera, // Export stopCamera
        restart: () => {
            // 1. Stop existing resources
            stopCamera();
            signalRef.current = [];

            // 2. Reset State
            setState({
                isScanning: false,
                progress: 0,
                isFingerDetected: false,
                bpm: 0,
                error: null,
                isDone: false
            });

            // 3. Re-init Camera (wait a bit to ensure cleanup)
            setTimeout(() => {
                initCamera();
            }, 100);
        }
    };
}
