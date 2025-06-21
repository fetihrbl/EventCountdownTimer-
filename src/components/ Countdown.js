import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./ Countdown.css";
import TimerCard from "./TimerCard";
import { v4 as uuidv4 } from "uuid";

function Countdown() {
    const [timers, setTimers] = useState([]);
    const [newTimerTitle, setNewTimerTitle] = useState("");
    const [newTimerCategory, setNewTimerCategory] = useState("");
    const [newTimerDateTime, setNewTimerDateTime] = useState("");

    const categoryList = ["Meeting", "Birthday", "Reminder"];
    const categoryColors = {
        Meeting: "bg-primary",
        Birthday: "bg-danger",
        Reminder: "bg-success",
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimers((prevTimers) =>
                prevTimers.map((timer) => {
                    const targetTime = new Date(timer.targetDateTime).getTime();
                    const currentTime = new Date().getTime();
                    const remaining = Math.max(Math.floor((targetTime - currentTime) / 1000), 0);
                    return {
                        ...timer,
                        timeRemaining: remaining,
                        isRunning: remaining > 0,
                    };
                })
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const calculateTimeRemaining = (targetTime) => {
        const currentTime = new Date().getTime();
        return Math.max(Math.floor((targetTime - currentTime) / 1000), 0);
    };

    const formatTimeRemaining = (seconds) => {
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return { days, hours, minutes, seconds: secs };
    };

    const addTimer = () => {
        if (!newTimerTitle || !newTimerCategory || !newTimerDateTime) return;

        const targetDateTime = new Date(newTimerDateTime).getTime();

        const newTimer = {
            id: uuidv4(),
            title: newTimerTitle,
            category: newTimerCategory,
            targetDateTime,
            timeRemaining: calculateTimeRemaining(targetDateTime),
            isRunning: true,
        };

        setTimers((prev) => [...prev, newTimer]);
        setNewTimerTitle("");
        setNewTimerCategory("");
        setNewTimerDateTime("");
    };

    const removeTimer = (timerId) => {
        setTimers((prev) => prev.filter((t) => t.id !== timerId));
    };

    return (
        <div className="countdown-container">
            <div className="main-container">
                <div className="input-container m-3">
                    <h1 className="text-center text-success">Countdown Timer</h1>
                    <input
                        type="text"
                        className="form-control m-2"
                        placeholder="Timer Title"
                        value={newTimerTitle}
                        onChange={(e) => setNewTimerTitle(e.target.value)}
                    />
                    <select
                        className="form-select m-2"
                        value={newTimerCategory}
                        onChange={(e) => setNewTimerCategory(e.target.value)}
                    >
                        <option value="">Select a Category</option>
                        {categoryList.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <input
                        className="form-control m-2"
                        type="datetime-local"
                        value={newTimerDateTime}
                        onChange={(e) => setNewTimerDateTime(e.target.value)}
                    />
                    <button
                        className="btn btn-primary m-2"
                        onClick={addTimer}
                        disabled={!newTimerTitle || !newTimerCategory || !newTimerDateTime}
                    >
                        Add Timer
                    </button>
                </div>

                <div className="timers-div m-auto d-flex flex-wrap justify-content-center">
                    {timers.map((timer) => (
                        <TimerCard
                            key={timer.id}
                            timer={timer}
                            timeRemaining={formatTimeRemaining(timer.timeRemaining)}
                            onRemove={removeTimer}
                            categoryColors={categoryColors}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Countdown;
