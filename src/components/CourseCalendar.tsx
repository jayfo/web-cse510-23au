import * as React from "react";

import { ok as assert } from "assert";

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
  function renderGuests(calendarItem: CalendarItem): React.ReactNode {
    const calendarItemGuests = (() => {
      if ("guest" in calendarItem) {
        return [calendarItem.guest];
      } else if ("guests" in calendarItem) {
        return calendarItem.guests;
      } else {
        return undefined;
      }
    })();

    return (
      calendarItemGuests &&
      calendarItemGuests.map(
        (guestCurrent, indexCurrent): React.ReactElement => {
          return (
            <Alert key={indexCurrent} severity="info">
              Guest:{" "}
              {((): React.ReactNode => {
                if (guestCurrent.link) {
                  return (
                    <AppLink href={guestCurrent.link}>
                      {guestCurrent.name}
                    </AppLink>
                  );
                } else {
                  return guestCurrent.name;
                }
              })()}
            </Alert>
          );
        },
      )
    );
  }

  function renderTimeAndLocations(calendarItem: CalendarItem): React.ReactNode {
    const calendarItemTimeAndLocations = (() => {
      if ("timeAndLocation" in calendarItem) {
        return [calendarItem.timeAndLocation];
      } else if ("timeAndLocations" in calendarItem) {
        return calendarItem.timeAndLocations;
      } else {
        return undefined;
      }
    })();

    return (
      calendarItemTimeAndLocations &&
      calendarItemTimeAndLocations.map(
        (timeAndLocationCurrent, indexCurrent): React.ReactElement => {
          return <Box key={indexCurrent} sx={{fontSize: "0.875rem"}}>
            <Box>{timeAndLocationCurrent.time}</Box>
            <Box>{timeAndLocationCurrent.location}</Box>
          </Box>
        },
      )
    );
  }

  function renderHolidayCalendarDate(
    calendarDateCurrent: CalendarDate,
    dateCalendarItems: CalendarItem[],
    holidayCalendarItem: HolidayCalendarItem,
  ): React.ReactElement {
    return (
      <Grid item container key={calendarDateCurrent}>
        <Grid item xs={2}>
          <Typography
            id={idAnchorText(
              formatCalendarDate(calendarDateCurrent, CALENDAR_DATE_FORMAT),
            )}
            component="h2"
            sx={{ typography: "h3", color: "lightgrey" }}
          >
            {formatCalendarDate(calendarDateCurrent, CALENDAR_DATE_FORMAT)}
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography
            id={idAnchorText(holidayCalendarItem.title)}
            component="h2"
            sx={{ typography: "h3", color: "lightgrey" }}
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
    return (
      <Grid item container key={calendarDateCurrent}>
        <Grid item xs={2}>
          <Typography
            id={idAnchorText(
              formatCalendarDate(calendarDateCurrent, CALENDAR_DATE_FORMAT),
            )}
            component="h2"
            sx={{ typography: "h3" }}
          >
            {formatCalendarDate(calendarDateCurrent, CALENDAR_DATE_FORMAT)}
          </Typography>
          {renderTimeAndLocations(lectureCalendarItem)}
        </Grid>
        <Grid item xs={10}>
          <Typography
            id={idAnchorText(lectureCalendarItem.title)}
            component="h2"
            sx={{ typography: "h3" }}
          >
            {lectureCalendarItem.title}
          </Typography>
          {renderGuests(lectureCalendarItem)}
        </Grid>

        {/*<Grid item xs={10}>*/}
        {/*  <Box*/}
        {/*    sx={{*/}
        {/*      display: "flex",*/}
        {/*      alignItems: "baseline",*/}
        {/*      justifyContent: "space-between",*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <h2 id={anchorText(calendarDateCurrent.dateTitle)}>*/}
        {/*      {calendarDateCurrent.dateTitle}*/}
        {/*    </h2>*/}
        {/*    <ExpandCircleDownOutlined*/}
        {/*      // onClick={toggleExpanded}*/}
        {/*      sx={{ transform: rotation }}*/}
        {/*    />*/}
        {/*  </Box>*/}
        {/*  <Collapse in={expanded} mountOnEnter unmountOnExit>*/}
        {/*    /!*{renderVirtual(calendarDateCurrent)}*!/*/}
        {/*    /!*{renderAwayJames(calendarDateCurrent)}*!/*/}
        {/*    /!*{renderGuest(calendarDateCurrent)}*!/*/}
        {/*    /!*{renderContent(calendarDateCurrent)}*!/*/}
        {/*    /!*{renderAdditionalResources(calendarDateCurrent)}*!/*/}
        {/*  </Collapse>*/}
        {/*</Grid>*/}
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
