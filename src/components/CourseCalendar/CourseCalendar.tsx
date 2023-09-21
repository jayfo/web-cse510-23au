"use client";

import * as React from "react";

import { ok as assert } from "assert";

import { CalendarItemGuests } from "@/components/CourseCalendar/CalendarItemGuests";
import { CalendarItemTimeAndLocations } from "@/components/CourseCalendar/CalendarItemTimeAndLocations";
import { AppLink } from "@/components/links/AppLink";
import {
  calendarData,
  calendarDates,
  calendarItemsForDate,
  formatCalendarDate,
} from "@/data/CalendarData";
import {
  CalendarDate,
  CalendarItem,
  filterHolidayCalendarItems,
  filterLectureCalendarItems,
  HolidayCalendarItem,
  LectureCalendarItem,
} from "@/types/CalendarData";
import { idAnchorText } from "@/utils/idAnchorText";
import { ExpandCircleDownOutlined } from "@mui/icons-material";
import { Alert, Box, Collapse, Grid, Paper, Typography } from "@mui/material";

const CALENDAR_DATE_FORMAT = "EEE MMM d";

export const CourseCalendar: React.FunctionComponent = () => {
  function renderContentNonstandard(
    calendarItem: CalendarItem,
  ): React.ReactNode {
    if ("contentNonstandard" in calendarItem) {
      return calendarItem.contentNonstandard;
    } else {
      return undefined;
    }
  }

  function renderHolidayCalendarDate(
    calendarDateCurrent: CalendarDate,
    dateCalendarItems: CalendarItem[],
    holidayCalendarItem: HolidayCalendarItem,
  ): React.ReactElement {
    return (
      <Grid
        item
        container
        key={calendarDateCurrent}
        sx={{ marginLeft: 2, marginRight: 2 }}
      >
        <Grid item xs={2}>
          <Typography
            id={idAnchorText(
              formatCalendarDate(calendarDateCurrent, CALENDAR_DATE_FORMAT),
            )}
            component="h2"
            sx={{ typography: "h3", color: "#aaaaaa" }}
          >
            {formatCalendarDate(calendarDateCurrent, CALENDAR_DATE_FORMAT)}
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography
            id={idAnchorText(holidayCalendarItem.title)}
            component="h2"
            sx={{ typography: "h3", color: "#aaaaaa" }}
          >
            {`Holiday: ${holidayCalendarItem.title}`}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  function renderLectureCalendarDate(
    calendarDateCurrent: CalendarDate,
    dateCalendarItems: CalendarItem[],
    lectureCalendarItem: LectureCalendarItem,
  ): React.ReactElement {
    const [expanded, setExpanded] = React.useState<boolean>(
      true,
      // calendarDateCurrent.date.diffNow("days").days >= -1
    );

    const toggleExpanded = () => {
      setExpanded(!expanded);
    };

    const rotation = (() => {
      if (expanded) {
        return "rotate(180deg)";
      } else {
        return "rotate(0deg)";
      }
    })();

    return (
      <Grid
        item
        xs={12}
        key={calendarDateCurrent}
        sx={{ marginBottom: 2, marginTop: 2 }}
      >
        <Paper sx={{ padding: 2 }}>
          <Grid container>
            <Grid item xs={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  height: 1,
                  "& > :first-child": {
                    marginTop: 0,
                    marginBottom: 0,
                  },
                }}
              >
                <Typography
                  id={idAnchorText(
                    formatCalendarDate(
                      calendarDateCurrent,
                      CALENDAR_DATE_FORMAT,
                    ),
                  )}
                  component="h2"
                  sx={{ typography: "h3" }}
                >
                  {formatCalendarDate(
                    calendarDateCurrent,
                    CALENDAR_DATE_FORMAT,
                  )}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={10}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  height: 1,
                  "& > :first-child": {
                    marginTop: 0,
                    marginBottom: 0,
                  },
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  id={idAnchorText(lectureCalendarItem.title)}
                  component="h2"
                  sx={{ typography: "h3" }}
                >
                  {lectureCalendarItem.title}
                </Typography>
                <ExpandCircleDownOutlined
                  onClick={toggleExpanded}
                  sx={{ transform: rotation }}
                />
              </Box>
            </Grid>
          </Grid>
          <Collapse in={expanded} mountOnEnter unmountOnExit>
            <Grid container sx={{ marginTop: 2 }}>
              <Grid
                item
                xs={2}
                sx={{
                  "& > :first-child": {
                    marginTop: 0,
                    marginBottom: 0,
                  },
                }}
              >
                <CalendarItemTimeAndLocations
                  calendarItem={lectureCalendarItem}
                />
              </Grid>
              <Grid
                item
                xs={10}
                sx={{
                  "& > :first-child": {
                    marginTop: 0,
                    marginBottom: 0,
                  },
                }}
              >
                <CalendarItemGuests calendarItem={lectureCalendarItem} />
                {renderContentNonstandard(lectureCalendarItem)}
              </Grid>
            </Grid>
          </Collapse>
        </Paper>
      </Grid>
    );
  }

  function renderCalendarDate(
    calendarDateCurrent: CalendarDate,
  ): React.ReactNode {
    const dateCalendarItems = calendarItemsForDate(calendarDateCurrent);
    const holidayCalendarItems = filterHolidayCalendarItems(dateCalendarItems);
    const lectureCalendarItems = filterLectureCalendarItems(dateCalendarItems);

    if (lectureCalendarItems.length > 0) {
      assert(
        lectureCalendarItems.length === 1,
        `lectureCalendarItems.length for ${calendarDateCurrent} is ${lectureCalendarItems.length}`,
      );

      return renderLectureCalendarDate(
        calendarDateCurrent,
        dateCalendarItems,
        lectureCalendarItems[0],
      );
    } else if (holidayCalendarItems.length > 0) {
      assert(
        holidayCalendarItems.length === 1,
        `holidayCalendarItems.length for ${calendarDateCurrent} is ${holidayCalendarItems.length}`,
      );

      return renderHolidayCalendarDate(
        calendarDateCurrent,
        dateCalendarItems,
        holidayCalendarItems[0],
      );
    } else {
      assert(
        dateCalendarItems.length === 0,
        `Unhandled calendarItems for ${calendarDateCurrent}`,
      );

      return null;
    }

    // const [expanded, setExpanded] = React.useState<boolean>(
    //   // true
    //   calendarDateCurrent.date.diffNow("days").days >= -1,
    // );
    //
    // const toggleExpanded = () => {
    //   setExpanded(!expanded);
    // };
    //
    // let rotation;
    // if (expanded) {
    //   rotation = "rotate(180deg)";
    // } else {
    //   rotation = "rotate(0deg)";
    // }

    const expanded = true;
    const rotation = "rotate(0deg)";
  }

  return (
    <Grid container>
      {calendarDates()
        .filter((calendarDateCurrent: CalendarDate) => {
          return calendarItemsForDate(calendarDateCurrent).length > 0;
        })
        .map((calendarDateCurrent: CalendarDate) => {
          return renderCalendarDate(calendarDateCurrent);
        })}
    </Grid>
  );
};

// function renderAdditionalResources(calendarDateCurrent: CalendarDate) {
//     if (calendarDateCurrent.additionalResources) {
//         return (
//             <Box>
//                 <h3>Additional Optional Resources</h3>
//                 <ul>
//                     {calendarDateCurrent.additionalResources.map(readingCurrent => (
//                         <li key={readingCurrent.title}>
//                             <p><FormattedReading reading={readingCurrent}/></p>
//                         </li>
//                     ))}
//                 </ul>
//             </Box>
//         )
//     } else {
//         return null;
//     }
// }
//
// function renderAwayJames(calendarDateCurrent: CalendarDate) {
//     if (calendarDateCurrent.awayJames) {
//         return (
//             <Alert severity='info' sx={{marginBottom: 1}}>
//                 James will be away.
//             </Alert>
//         );
//     } else {
//         return null;
//     }
// }
//
// function renderContent(calendarDateCurrent: CalendarDate) {
//     if ('readingsStandard' in calendarDateCurrent) {
//         return (
//             <Box>
//                 <p>Read the framing paper:</p>
//                 <ul>
//                     <li>
//                         <p><FormattedReading reading={calendarDateCurrent.readingsStandard.framing}/></p>
//                     </li>
//                 </ul>
//                 <p>Select one additional reading:</p>
//                 <ul>
//                     {calendarDateCurrent.readingsStandard.instances.map(readingCurrent => (
//                         <li key={readingCurrent.title}>
//                             <p><FormattedReading reading={readingCurrent}/></p>
//                         </li>
//                     ))}
//                 </ul>
//                 <h3>Standard Reading Format</h3>
//                 <p>Post a reading report in the appropriate thread(s), by 11:59pm the night before class:</p>
//                 <p><CourseInformationLink linkName={'linkDiscussion'}/></p>
//             </Box>
//         );
//     } else if ('contentNonstandard' in calendarDateCurrent) {
//         // Non-standard content rendered in an outside component
//         return calendarDateCurrent.contentNonstandard;
//     }
// }
//
// function renderVirtual(calendarDateCurrent: CalendarDate) {
//     if (calendarDateCurrent.virtual) {
//         return (
//             <Alert severity='info' sx={{marginBottom: 1}}>
//                 Class will be conducted via Zoom, using meeting information provided by email and in Canvas.
//             </Alert>
//         );
//     } else {
//         return null;
//     }
// }
//
