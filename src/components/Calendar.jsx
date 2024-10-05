import React, { useState, useEffect } from 'react';
import '../css/Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Geçerli ayın günlerini hesapla
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate(); // O ayın son gününü alır.
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // İlk günün haftanın hangi günü olduğunu al (Pazar 0, Cumartesi 6)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);

    const daysArray = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null); // Ayın başlamadığı günler için boşluk ekle
    }
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(day);
    }
    return daysArray;
  };

  const handlePreviousMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  const daysArray = generateCalendar();

  const today = new Date();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePreviousMonth}>&lt;</button>
        <h2>
          {currentDate.toLocaleString('default', { month: 'long' }).toUpperCase()} {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        <div className="calendar-day">M</div>
        <div className="calendar-day">T</div>
        <div className="calendar-day">W</div>
        <div className="calendar-day">T</div>
        <div className="calendar-day">F</div>
        <div className="calendar-day weekend">S</div>
        <div className="calendar-day weekend">S</div>
        {daysArray.map((day, index) => (
          <div
            key={index}
            className={`calendar-date ${day === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear() ? 'today' : ''}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;