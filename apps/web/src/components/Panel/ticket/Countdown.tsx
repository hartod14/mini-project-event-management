"use client";

import { useState, useEffect } from "react";

export default function Countdown({ targetTimestamp }: { targetTimestamp: number }) {
    const [hasMounted, setHasMounted] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        setHasMounted(true); // Ensures rendering happens only after hydration

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = targetTimestamp - now;

            return {
                hours: Math.floor(difference / (1000 * 60 * 60)),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetTimestamp]);

    if (!hasMounted) return null; // Prevents hydration errors by not rendering on the server

    return (
        <div className="flex">
            <div className="text-center">
                <p className="font-bold text-4xl">{timeLeft.hours}</p>
                <p>Jam</p>
            </div>
            <p className="font-bold text-4xl px-2">:</p>
            <div className="text-center">
                <p className="font-bold text-4xl">{timeLeft.minutes}</p>
                <p>Menit</p>
            </div>
            <p className="font-bold text-4xl px-2">:</p>
            <div className="text-center">
                <p className="font-bold text-4xl">{timeLeft.seconds}</p>
                <p>Detik</p>
            </div>
        </div>
    );
}
