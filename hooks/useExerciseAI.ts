
import { useEffect, useRef, useState, useCallback } from 'react';

// --- TYPES defined manually to avoid imports ---

export interface Results {
    image: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
    poseLandmarks: any[]; // NormalizedLandmarkList
    poseWorldLandmarks?: any[]; // LandmarkList
    segmentationMask?: HTMLCanvasElement | HTMLImageElement;
}

export type ExerciseType = 'knee-lifts' | 'marching' | 'arm-circles' | 'sit-to-stand';

export interface ExerciseState {
    isStarted: boolean;
    count: number;
    feedback: string;
    phase: 'NEUTRAL' | 'UP' | 'HOLD' | 'DOWN';
    confidence: number;
}

export interface UseExerciseAIProps {
    exerciseType: ExerciseType;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    onRepComplete?: (count: number) => void;
}

// MediaPipe Pose Connections (Standard)
const POSE_CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8], [9, 10],
    [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19],
    [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], [11, 23],
    [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], [27, 29],
    [28, 30], [29, 31], [30, 32], [27, 31], [28, 32]
];

export function useExerciseAI({ exerciseType, videoRef, canvasRef, onRepComplete }: UseExerciseAIProps) {
    const [state, setState] = useState<ExerciseState>({
        isStarted: false,
        count: 0,
        feedback: "Siap? Klik Mulai!",
        phase: 'NEUTRAL',
        confidence: 0
    });

    const poseRef = useRef<any>(null); // Window.Pose instance
    const cameraRef = useRef<any>(null); // Window.Camera instance
    const stateRef = useRef(state);
    const scriptLoadedRef = useRef(false);

    const subState = useRef({
        lastPhaseChange: 0,
        holdingFor: 0,
    });

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    // --- LOGIC ---

    const calculateAngle = (a: any, b: any, c: any) => {
        if (!a || !b || !c) return 0;
        const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
        let angle = Math.abs((radians * 180.0) / Math.PI);
        if (angle > 180.0) angle = 360 - angle;
        return angle;
    };

    const isBodyVisible = (landmarks: any[]) => {
        const required = [11, 12, 23, 24, 25, 26];
        return required.every(idx => landmarks[idx] && landmarks[idx].visibility > 0.5);
    };

    const processKneeLifts = (landmarks: any[]) => {
        const leftHip = landmarks[23];
        const leftKnee = landmarks[25];
        const rightHip = landmarks[24];
        const rightKnee = landmarks[26];

        const leftLift = (leftHip.y - leftKnee.y);
        const rightLift = (rightHip.y - rightKnee.y);

        const LIFT_THRESHOLD = 0.02;
        const GROUND_THRESHOLD = -0.15;

        if (stateRef.current.phase === 'NEUTRAL') {
            if (leftLift > LIFT_THRESHOLD || rightLift > LIFT_THRESHOLD) {
                updatePhase('UP', "Tahan sebentar...");
            } else {
                setState(prev => ({ ...prev, feedback: "Angkat lutut setinggi pinggang!" }));
            }
        } else if (stateRef.current.phase === 'UP') {
            if (leftLift < GROUND_THRESHOLD && rightLift < GROUND_THRESHOLD) {
                completeRep();
            }
        }
    };

    const processMarching = (landmarks: any[]) => {
        const leftHip = landmarks[23];
        const leftKnee = landmarks[25];
        const rightHip = landmarks[24];
        const rightKnee = landmarks[26];

        const leftLift = (leftHip.y - leftKnee.y);
        const rightLift = (rightHip.y - rightKnee.y);

        const MARCH_LIFT_THRESHOLD = -0.15;
        const NEUTRAL_THRESHOLD = -0.25;

        if (stateRef.current.phase === 'NEUTRAL') {
            if (leftLift > MARCH_LIFT_THRESHOLD || rightLift > MARCH_LIFT_THRESHOLD) {
                updatePhase('UP', "Terus jalan!");
            } else {
                setState(prev => ({ ...prev, feedback: "Jalan di tempat..." }));
            }
        } else if (stateRef.current.phase === 'UP') {
            if (leftLift < NEUTRAL_THRESHOLD && rightLift < NEUTRAL_THRESHOLD) {
                completeRep();
            }
        }
    };

    const processArmCircles = (landmarks: any[]) => {
        const leftWrist = landmarks[15];
        const leftShoulder = landmarks[11];
        const rightWrist = landmarks[16];
        const rightShoulder = landmarks[12];

        // y decreases upwards
        const leftUp = leftWrist.y < leftShoulder.y;
        const rightUp = rightWrist.y < rightShoulder.y;

        if (stateRef.current.phase === 'NEUTRAL') {
            if (leftUp && rightUp) {
                updatePhase('UP', "Putar ke atas...");
            } else if (leftUp || rightUp) {
                setState(prev => ({ ...prev, feedback: "Angkat KEDUA tangan!" }));
            } else {
                setState(prev => ({ ...prev, feedback: "Mulai putar lengan..." }));
            }
        } else if (stateRef.current.phase === 'UP') {
            if (!leftUp && !rightUp) {
                completeRep();
            }
        }
    };

    const processSitToStand = (landmarks: any[]) => {
        const leftHip = landmarks[23];
        const leftKnee = landmarks[25];
        const leftAnkle = landmarks[27];

        // Calculate knee angle
        const angle = calculateAngle(leftHip, leftKnee, leftAnkle);

        // Standing: Angle close to 180 (straight leg) -> NEUTRAL (UP)
        // Sitting: Angle close to 90 -> DOWN

        // Logic: 
        // Start in NEUTRAL (Standing). 
        // Go DOWN (Sitting, angle < 100).
        // Return to NEUTRAL (Standing, angle > 160).     

        if (stateRef.current.phase === 'NEUTRAL') {
            if (angle < 100) {
                updatePhase('DOWN', "Sekarang berdiri perlahan.");
            } else {
                setState(prev => ({ ...prev, feedback: "Silakan duduk..." }));
            }
        } else if (stateRef.current.phase === 'DOWN') {
            if (angle > 160) {
                completeRep(); // Stood up
            } else {
                setState(prev => ({ ...prev, feedback: "Berdiri tegak!" }));
            }
        }
    };

    const updatePhase = (newPhase: ExerciseState['phase'], feedback: string) => {
        if (stateRef.current.phase !== newPhase) {
            subState.current.lastPhaseChange = Date.now();
            setState(prev => ({ ...prev, phase: newPhase, feedback }));
        }
    };

    const completeRep = () => {
        const now = Date.now();
        if (now - subState.current.lastPhaseChange > 300) {
            const newCount = stateRef.current.count + 1;
            setState(prev => ({
                ...prev,
                count: newCount,
                phase: 'NEUTRAL',
                feedback: "Satu repetisi bagus!"
            }));
            if (onRepComplete) onRepComplete(newCount);
            subState.current.lastPhaseChange = now;
        } else {
            setState(prev => ({ ...prev, phase: 'NEUTRAL' }));
        }
    };

    const onResults = useCallback((results: Results) => {
        const canvasCtx = canvasRef.current?.getContext('2d');
        if (canvasRef.current && canvasCtx) {
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

            const GlobalDraw = (window as any);
            if (GlobalDraw.drawConnectors && GlobalDraw.drawLandmarks && results.poseLandmarks) {
                GlobalDraw.drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
                    color: '#8A9A5B',
                    lineWidth: 4
                });
                GlobalDraw.drawLandmarks(canvasCtx, results.poseLandmarks, {
                    color: '#2F4F4F',
                    lineWidth: 2,
                    radius: 4
                });
            }
            canvasCtx.restore();
        }

        if (!stateRef.current.isStarted || !results.poseLandmarks) return;

        const landmarks = results.poseLandmarks;
        if (!isBodyVisible(landmarks)) {
            setState(prev => ({ ...prev, feedback: "Badan tidak terlihat penuh. Mundur sedikit!" }));
            return;
        }

        switch (exerciseType) {
            case 'knee-lifts': processKneeLifts(landmarks); break;
            case 'marching': processMarching(landmarks); break;
            case 'arm-circles': processArmCircles(landmarks); break;
            case 'sit-to-stand': processSitToStand(landmarks); break;
        }
    }, [exerciseType]);

    // --- INITIALIZATION ---

    useEffect(() => {
        let isMounted = true;

        const loadScript = (src: string) => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve(true);
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.onload = () => resolve(true);
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        const init = async () => {
            try {
                if (!videoRef.current) return;

                // Load all 3 scripts
                await Promise.all([
                    loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js'),
                    loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js'),
                    loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js'),
                ]);

                if (!isMounted) return;

                // Use Global Pose
                const PoseClass = (window as any).Pose;
                if (!PoseClass) throw new Error("Pose class not found in window");

                const pose = new PoseClass({
                    locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
                });

                pose.setOptions({
                    modelComplexity: 1,
                    smoothLandmarks: true,
                    enableSegmentation: false,
                    smoothSegmentation: false,
                    minDetectionConfidence: 0.5,
                    minTrackingConfidence: 0.5
                });

                pose.onResults(onResults);
                poseRef.current = pose;

                // Use Global Camera
                const CameraClass = (window as any).Camera;
                if (CameraClass && videoRef.current) {
                    const camera = new CameraClass(videoRef.current, {
                        onFrame: async () => {
                            if (videoRef.current && poseRef.current) {
                                try {
                                    await poseRef.current.send({ image: videoRef.current });
                                } catch (e) {
                                    // ignore frame errors
                                }
                            }
                        },
                        width: 1280,
                        height: 720
                    });
                    cameraRef.current = camera;

                    if (stateRef.current.isStarted && isMounted) {
                        await camera.start();
                    }
                }
            } catch (error) {
                console.error("Failed to initialize AI:", error);
                setState(prev => ({ ...prev, feedback: "Gagal memuat sistem AI. Cek koneksi internet." }));
            }
        };

        if (!scriptLoadedRef.current) {
            scriptLoadedRef.current = true;
            init();
        }

        return () => {
            isMounted = false;
            cameraRef.current?.stop();
            poseRef.current?.close();
        };
    }, []);

    // --- CONTROLS ---

    const start = () => {
        setState(prev => ({ ...prev, isStarted: true, count: 0, feedback: "Mulai!" }));
        if (cameraRef.current) cameraRef.current.start();
    };

    const stop = () => {
        setState(prev => ({ ...prev, isStarted: false }));
    };

    return {
        ...state,
        start,
        stop
    };
}
