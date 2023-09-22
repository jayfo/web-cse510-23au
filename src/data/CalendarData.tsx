import { ok as assert } from "assert";

import ContentNoReading from "@/contentcomponents/NoReading.mdx";
import {
  CalendarDate,
  CalendarItem,
  HolidayCalendarItem,
  LectureCalendarItem,
} from "@/types/CalendarData";
import {
  format as datefnsFormat,
  isValid as datefnsIsValid,
  parse as datefnsParse,
  eachDayOfInterval,
} from "date-fns";

const dayOfWeekValues = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;
type dayOfWeek = (typeof dayOfWeekValues)[number];

const LECTURE_TIME_AND_LOCATION = {
  time: "10:00 to 11:20",
  location: "CSE2/Gates G04",
};

export function parseCalendarDate(calendarDate: CalendarDate): Date {
  const parsedDate = datefnsParse(calendarDate, "yyyy-MM-dd", new Date());
  assert(datefnsIsValid(parsedDate), `Invalid date: ${calendarDate}`);

  return parsedDate;
}

export function formatCalendarDate(
  calendarDate: CalendarDate,
  format: string,
): string {
  return datefnsFormat(parseCalendarDate(calendarDate), format);
}

export function calendarDates(): string[] {
  return eachDayOfInterval({
    start: parseCalendarDate(calendarData.datesOfInstruction.start),
    end: parseCalendarDate(calendarData.datesOfInstruction.end),
  }).map((dateCurrent: Date): string => {
    return datefnsFormat(dateCurrent, "yyyy-MM-dd");
  });
}

export function calendarItems(): CalendarItem[] {
  return [...calendarData.holidays, ...calendarData.lectures];
}

export function calendarItemsForDate(
  calendarDate: CalendarDate,
): CalendarItem[] {
  return calendarItems().filter(
    (calendarItemCurrent: CalendarItem): boolean => {
      if ("date" in calendarItemCurrent) {
        return calendarDate === calendarItemCurrent.date;
      } else {
        return calendarItemCurrent.dates.includes(calendarDate);
      }
    },
  );
}

function verifyCalendarDate(
  calendarDate: CalendarDate,
  dayOfWeek: dayOfWeek,
): CalendarDate {
  assert(dayOfWeekValues.includes(dayOfWeek));

  const parsedDate = parseCalendarDate(calendarDate);
  const parsedDateDayOfWeek = datefnsFormat(parsedDate, "EEE");
  assert(
    parsedDateDayOfWeek === dayOfWeek,
    `Date ${calendarDate} is not ${dayOfWeek}`,
  );

  return calendarDate;
}

export const calendarData: {
  datesOfInstruction: {
    start: CalendarDate;
    end: CalendarDate;
  };
  holidays: HolidayCalendarItem[];
  lectures: LectureCalendarItem[];
} = {
  datesOfInstruction: {
    start: verifyCalendarDate("2023-09-27", "Wed"),
    end: verifyCalendarDate("2023-12-08", "Fri"),
  },

  holidays: [
    {
      date: verifyCalendarDate("2023-11-10", "Fri"),
      type: "holiday",
      title: "Veterans Day Observed",
    },
    {
      date: verifyCalendarDate("2023-11-23", "Thu"),
      type: "holiday",
      title: "Thanksgiving",
    },
    {
      date: verifyCalendarDate("2023-11-24", "Fri"),
      type: "holiday",
      title: "Native American Heritage Day",
    },
  ],

  lectures: [
    // Week 1
    {
      date: verifyCalendarDate("2023-09-28", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Introductions and Overview",
      contentNonstandard: <ContentNoReading />,
    },
    // Week 2
    {
      date: verifyCalendarDate("2023-10-03", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Visions of Human-Computer Interaction",
    },
    {
      date: verifyCalendarDate("2023-10-05", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Contributions in Human-Computer Interaction",
    },
    // Week 3
    {
      date: verifyCalendarDate("2023-10-10", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "In-Class Work on Project Proposals",
    },
    {
      date: verifyCalendarDate("2023-10-12", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Human-Computer Interaction History",
    },
    // Week 4
    {
      date: verifyCalendarDate("2023-10-17", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Usability Evaluation Considered Harmful",
    },
    {
      date: verifyCalendarDate("2023-10-19", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: TBD",
    },
    // Week 5
    {
      date: verifyCalendarDate("2023-10-24", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: TBD",
    },
    {
      date: verifyCalendarDate("2023-10-26", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: TBD",
    },
    // Week 7
    {
      date: verifyCalendarDate("2023-11-07", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: Accessibility",
      guest: {
        name: "Martez Mott",
        link: "http://www.martezmott.com/",
      },
    },
    {
      date: verifyCalendarDate("2023-11-09", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: Computing Education and Learning",
      guest: {
        name: "Ben Shapiro",
        link: "https://benshapi.ro/",
      },
    },
    // Week 8
    {
      date: verifyCalendarDate("2023-11-14", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: Interaction with AI",
      guest: {
        name: "Mitchell Gordon",
        link: "https://mgordon.me/",
      },
    },
    {
      date: verifyCalendarDate("2023-11-16", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: Designing with Children",
      guest: {
        name: "Jason Yip",
        link: "http://bigyipper.com/",
      },
    },
    // Week 9
    {
      date: verifyCalendarDate("2023-11-21", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: CSCW and Social Computing",
      guest: {
        name: "Mako Hill",
        link: "https://mako.cc/",
      },
    },
    // Week 11
    {
      date: verifyCalendarDate("2023-12-05", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: TBD",
    },
    {
      date: verifyCalendarDate("2023-12-07", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: TBD",
    },

    // Project Milestone Presentations, Week 6 and Week 10
    {
      dates: [
        verifyCalendarDate("2023-10-31", "Tue"),
        verifyCalendarDate("2023-11-02", "Thu"),
        verifyCalendarDate("2023-11-28", "Tue"),
        verifyCalendarDate("2023-11-30", "Thu"),
      ],
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Project Milestone Presentations",
    },
  ],
};
