import { ok as assert } from "assert";

import { default as ContentNoReading } from "@/contentcomponents/NoReading.mdx";
import { default as ContentVisionsOfHCI } from "@/contentcomponents/VisionsOfHCI.mdx";
import {
  AssignmentCalendarItem,
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
  assignments: { [key: string]: AssignmentCalendarItem };
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
      contentNonstandard: (
        <ContentVisionsOfHCI
          readings={[
            {
              // Because this paper is reviewed in history discussion,
              // text below clarifies it can be read but will not be presented
              authorText: "Vannevar Bush",
              title: "As We May Think",
              publicationText: "The Atlantic, 1945",
              link: "https://theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/",
            },
            {
              authorText: "Mark Weiser",
              title: "The Computer for the 21st Century",
              publicationText: "Scientific American, 1991",
              link: "https://canvas.uw.edu/files/109669385/",
            },
            {
              authorText:
                "Roy Want, Andy Hopper, Veronica Falcão, Jonathan Gibbons",
              title: "The Active Badge Location System",
              publicationText: "TOIS 1992",
              link: "https://canvas.uw.edu/files/109669381/",
            },
            {
              authorText: "James D. Hollan, Scott Stornetta",
              title: "Beyond Being There",
              publicationText: "CHI 1992",
              link: "https://canvas.uw.edu/files/109669382/",
            },
            {
              authorText: "Pierre Wellner",
              title: "Interacting with Paper on the DigitalDesk",
              publicationText: "CACM 1993",
              link: "https://canvas.uw.edu/files/109669377/",
            },
            {
              authorText: "Benjamin B. Bederson, James D. Hollan",
              title:
                "Pad++: A Zooming Graphical Interface for Exploring Alternate Interface Physics",
              publicationText: "UIST 1994",
              link: "https://canvas.uw.edu/files/109669378/",
            },
            {
              authorText: "Hiroshi Ishii, Brygg Ullmer",
              title:
                "Tangible Bits: Towards Seamless Interfaces between People, Bits and Atoms",
              publicationText: "CHI 1997",
              link: "https://canvas.uw.edu/files/109669372/",
            },
            {
              authorText: "Eric Horvitz",
              title: "Principles of Mixed-Initiative User Interfaces",
              publicationText: "CHI 1999",
              link: "https://canvas.uw.edu/files/109669379/",
            },
            {
              authorText:
                "Ken Hinckley, Jeff Pierce, Mike Sinclair, Eric Horvitz",
              title: "Sensing Techniques for Mobile Interaction",
              publicationText: "UIST 2000",
              link: "https://canvas.uw.edu/files/109669380/",
            },
            {
              authorText: "Claudio S. Pinhanez",
              title:
                "The Everywhere Displays Projector: A Device to Create Ubiquitous Graphical Interfaces",
              publicationText: "UbiComp 2001",
              link: "https://canvas.uw.edu/files/109669383/",
            },
            {
              authorText: "Saul Greenberg, Chester Fitchett",
              title:
                "Phidgets: Easy Development of Physical Interfaces through Physical Widgets",
              publicationText: "UIST 2001",
              link: "https://canvas.uw.edu/files/109669384/",
            },
            {
              authorText:
                "Roy Want, Trevor Pering, Gunner Danneels, Muthu Kumar, Murali Sundar, John Light",
              title:
                "The Personal Server: Changing the Way We Think about Ubiquitous Computing",
              publicationText: "UbiComp 2002",
              link: "https://canvas.uw.edu/files/109669375/",
            },
            {
              authorText:
                "Jonathan Lester, Tanzeem Choudhury, Gaetano Borriello",
              title: "A Practical Approach to Recognizing Physical Activities",
              publicationText: "Pervasive 2006",
              link: "https://canvas.uw.edu/files/109669374/",
            },
            {
              authorText: "Bret Victor",
              title:
                "Magic Ink: Information Software and the Graphical Interface",
              publicationText: "2006",
              link: "http://worrydream.com/MagicInk/",
            },
            {
              authorText:
                "Michael S. Bernstein, Greg Little, Robert C. Miller, Björn Hartmann, Mark S. Ackerman, David R. Karger, David Crowell, Katrina Panovich",
              title: "Soylent: A Word Processor with a Crowd Inside",
              publicationText: "UIST 2010",
              link: "https://canvas.uw.edu/files/109669648/",
            },
          ]}
        />
      ),
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
      readingsStandard: {
        framing: {
          authorText: "Saul Greenberg, Bill Buxton",
          title: "Usability Evaluation Considered Harmful (Some of the Time)",
          publicationText: "CHI 2008",
          link: 'https://canvas.uw.edu/files/109846204/'
        },
        instances: [
          {
            authorText: "Dan R. Olsen, Jr",
            title: "Evaluating User Interface Systems Research",
            publicationText: "UIST 2007",
            link: 'https://canvas.uw.edu/files/109846207/'
          },
          {
            authorText: "James Fogarty",
            title: "Code and Contribution in Interactive Systems Research",
            publicationText:
              "CHI 2017 Workshop on #HCI.Tools: Strategies and Best Practices for Designing, Evaluating, and Sharing Technical HCI Toolkits",
            link: 'https://canvas.uw.edu/files/109846202/'
          },
        ],
      },
    },
    {
      date: verifyCalendarDate("2023-10-19", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Research Topic: Design Tools",
    },
    // Week 5
    {
      date: verifyCalendarDate("2023-10-24", "Tue"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title:
        "Research Topic: Information and Communication Technologies and Development",
      guest: {
        name: "Kurtis Heimerl",
        link: "https://kurti.sh/",
      },
      readingsStandard: {
        framing: {
          authorText:
            "Lilly Irani, Janet Vertesi, Paul Dourish, Kavita Philip, Rebecca E. Grinter",
          title: "Postcolonial Computing: A Lens on Design and Development",
          publicationText: "CHI 2010",
          link: "https://canvas.uw.edu/files/109846175/",
        },
        instances: [
          {
            authorText:
              "Eric Brewer, Michael Demmer, Melissa Ho, R. J. Honicky, Joyojeet Pal, Madelaine Plauche, Sonesh Surana",
            title:
              "The Challenges of Technology Research for Developing Regions",
            publicationText: "IEEE Pervasive Computing, 2006",
            link: "https://canvas.uw.edu/files/109846171/",
          },
          {
            authorText:
              "Matthew William Johnson, Esther Han Beol Jang, Frankie O'Rourke, Rachel Ye, Kurtis Heimerl",
            title:
              "Network Capacity as Common Pool Resource: Community-Based Congestion Management in a Community Network",
            publicationText: "CSCW 2021",
            link: "https://canvas.uw.edu/files/109846179/",
          },
        ],
      },
    },
    {
      date: verifyCalendarDate("2023-10-26", "Thu"),
      timeAndLocation: LECTURE_TIME_AND_LOCATION,
      type: "lecture",
      title: "Experimental Design and Analysis",
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
        link: "https://bigyipper.com/",
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

  assignments: {
    projectProposal: {
      type: "assignment",
      title: "Project Proposal",
      date: verifyCalendarDate("2023-10-13", "Fri"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1665830/assignments/8670194",
    },
    projectMilestoneReport1: {
      type: "assignment",
      title: "Project Milestone Report 1",
      date: verifyCalendarDate("2023-10-30", "Mon"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1665830/assignments/8670192",
    },
    projectMilestoneReport2: {
      type: "assignment",
      title: "Project Milestone Report 2",
      date: verifyCalendarDate("2023-11-27", "Mon"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1665830/assignments/8670193",
    },
    projectFinalReport: {
      type: "assignment",
      title: "Project Final Report",
      date: verifyCalendarDate("2023-12-12", "Tue"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1665830/assignments/8670191",
    },
  },
};
