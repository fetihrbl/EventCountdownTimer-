// src/components/TimerCard.jsx
import React from "react";

function TimerCard({ timer, timeRemaining, onRemove, categoryColors }) {
    return (
        <div
            key={timer.id}
            className={`card m-4 ${categoryColors[timer.category] || ""}`}
        >
            <h3 className="card-title m-2 text-light">{timer.title}</h3>
            <h4 className="card-title m-2 text-dark">{timer.category}</h4>
            <div className="card-body d-flex flex-wrap">
                {timeRemaining.days > 0 && (
                    <TimeBox label="days" value={timeRemaining.days} />
                )}
                <TimeBox label="hours" value={timeRemaining.hours} />
                <TimeBox label="minutes" value={timeRemaining.minutes} />
                <TimeBox label="seconds" value={timeRemaining.seconds} />
            </div>
            <button
                className="btn btn-dark m-2"
                onClick={() => onRemove(timer.id)}
                disabled={timer.timeRemaining <= 0}
            >
                Remove
            </button>
        </div>
    );
}

function TimeBox({ label, value }) {
    return (
        <div className="container bg-light text-dark rounded m-2">
            <div>
                <h1><strong>{value}</strong></h1>
            </div>
            <div>{label}</div>
        </div>
    );
}

export default TimerCard;
