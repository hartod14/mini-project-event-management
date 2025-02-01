"use client"
import { useState, useEffect } from "react";

const CountdownTimer = ({ targetTimestamp }: any) => {
    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const difference = targetTimestamp - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetTimestamp]);

    return (
        <div className="text-center text-lg font-semibold">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
    );
};

export default function Test2() {
    const targetDate = new Date("2025-02-01T14:00:00").getTime(); // Change to your desired timestamp

    return (
        <div className="flex justify-center items-center">
            <CountdownTimer targetTimestamp={targetDate} />
        </div>
    );
}