/**
 * Store calendar dates as YYYY-MM-DD strings (e.g., "2023-09-28").
 */
export type CalendarDate = string;

/**
 * One or more dates associated with a calendar item.
 */
export type BaseCalendarItemDates =
  | {
      date: CalendarDate;
    }
  | {
      dates: CalendarDate[];
    };

/**
 * Calendar item types.
 */

export type HolidayCalendarItem = {
  type: "holiday";
  title: string;
} & BaseCalendarItemDates;

export type LectureCalendarItem = {
  type: "lecture";
  title: string;
} & BaseCalendarItemDates;

export type CalendarItem = HolidayCalendarItem | LectureCalendarItem;

export function filterHolidayCalendarItems(
  calendarItems: CalendarItem[],
): HolidayCalendarItem[] {
  return calendarItems.filter((calendarItemCurrent: CalendarItem): boolean => {
    return calendarItemCurrent.type === "holiday";
  }) as HolidayCalendarItem[];
}

export function filterLectureCalendarItems(
  calendarItems: CalendarItem[],
): LectureCalendarItem[] {
  return calendarItems.filter((calendarItemCurrent: CalendarItem): boolean => {
    return calendarItemCurrent.type === "lecture";
  }) as LectureCalendarItem[];
}
