import { SITE_LINKS as PARENT_SITE_LINKS } from "../sitelinks";

export const SITE_LINKS = (() => {
  const insertAfterIndex = PARENT_SITE_LINKS.findIndex((element) => {
    return element.anchor == "Assignments";
  });

  return [
    ...PARENT_SITE_LINKS.slice(0, insertAfterIndex + 1),
    [
      {
        anchor: "Readings",
        href: "/assignments/readings/#readings",
      },
      {
        anchor: "Project",
        href: "/assignments/project/#project",
      },
      {
        anchor: "Statistics Lab",
        href: "/assignments/statisticslab/#statistics-lab",
      },
      {
        anchor: "Exam",
        href: "/assignments/exam/#exam",
      },
    ],
    ...PARENT_SITE_LINKS.slice(insertAfterIndex + 1),
  ];
})();
