import React from 'react';

export const triggerRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const rect = btn.getBoundingClientRect();
    circle.style.cssText = `
    position: absolute;
    width: ${diameter}px; height: ${diameter}px;
    left: ${e.clientX - rect.left - diameter / 2}px;
    top:  ${e.clientY - rect.top - diameter / 2}px;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    pointer-events: none;
    animation: ripple 0.6s ease-out forwards;
  `;
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
};
