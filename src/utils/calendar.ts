import moment from 'moment-timezone';

interface Month {
    name: string;
    days: number;
}

interface Week {
    [index: number]: string;
}

interface CalendarMonth {
    month: string;
    weeks: Week[];
    monthIndex: number;
}

export interface YearCalendar {
    weekDays: string[];
    calendar: CalendarMonth;
}

export const generateYearCalendar = (year: number, month: number): YearCalendar => {
    // Validate month parameter
    if (month < 0 || month > 11) {
        throw new Error('Month must be between 0 (January) and 11 (December).');
    }

    const months: Month[] = [
        { name: 'January', days: 31 },
        { name: 'February', days: 28 }, // 29 in leap years
        { name: 'March', days: 31 },
        { name: 'April', days: 30 },
        { name: 'May', days: 31 },
        { name: 'June', days: 30 },
        { name: 'July', days: 31 },
        { name: 'August', days: 31 },
        { name: 'September', days: 30 },
        { name: 'October', days: 31 },
        { name: 'November', days: 30 },
        { name: 'December', days: 31 }
    ];

    // Determine if it's a leap year
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    if (isLeapYear) months[1].days = 29;

    const getStartingDay = (year: number, month: number): number => moment.tz(`${year}-${month + 1}-01`, 'Asia/Manila').day();

    const weekDays: string[] = ['S', 'M', 'T', 'W', 'TH', 'F', 'S'];
    
    const generateMonthCalendar = (monthIndex: number): CalendarMonth => {
        const { name, days: daysInMonth } = months[monthIndex];
        const monthCalendar: Week[] = [];
        let startDay = getStartingDay(year, monthIndex);
        let week: Week = Array(7).fill('');

        // Fill the initial empty days
        for (let i = 0; i < startDay; i++) {
            week[i] = '';
        }

        // Fill in the days
        for (let day = 1; day <= daysInMonth; day++) {
            week[startDay] = day.toString().padStart(2, '0');
            startDay++;
            if (startDay === 7) {
                monthCalendar.push(week);
                week = Array(7).fill('');
                startDay = 0;
            }
        }

        // Push the last week if it's not empty
        if (startDay !== 0) monthCalendar.push(week);

        return {
            month: name,
            weeks: monthCalendar,
            monthIndex: monthIndex
        };
    };

    // Generate the calendar data for the specified month
    const calendar: CalendarMonth = generateMonthCalendar(month);

    return {
        weekDays,
        calendar
    };
}
