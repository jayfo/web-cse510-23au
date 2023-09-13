import { SiteLinkKey } from "@/types/SiteLinks";

export class SiteLinksImpl {
  homeTop: SiteLinkKey = {
    href: "/#course-overview",
    anchor: "Course Overview",
  };

  assignmentsTop: SiteLinkKey = {
    href: "/assignments/#assignments",
    anchor: "Assignments",
  };
  assignmentsReadingsTop: SiteLinkKey = {
    href: "/assignments/readings/#readings",
    anchor: "Readings",
  };
  assignmentsProjectTop: SiteLinkKey = {
    href: "/assignments/project/#project",
    anchor: "Project",
  };
  assignmentsStatisticsLabTop: SiteLinkKey = {
    href: "/assignments/statisticslab/#statistics-lab",
    anchor: "Statistics Lab",
  };
  assignmentsExamTop: SiteLinkKey = {
    href: "/assignments/exam/#exam",
    anchor: "Exam",
  };

  calendarTop: SiteLinkKey = {
    href: "/calendar/#calendar",
    anchor: "Calendar",
  };
}

export const SiteLinks = new SiteLinksImpl();
