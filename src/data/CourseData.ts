import * as React from "react";

export type CourseDataLinkHREF = string;

export type CourseDataLinkKey = {
  href?: CourseDataLinkHREF;
  anchor?: React.ReactNode;
};

export const courseData = {
  linkAccessiblePresentations: {
    href: "https://interactions.acm.org/archive/view/july-august-2017/making-your-presentation-accessible",
    anchor: "Guidance on Making Your Presentation Accessible",
  },

  linkVisionsOrganization: {
    href: "https://docs.google.com/document/d/1vtwIw_jZurCsgwtlNloEoedjRblA5q2v7avqo_AYvXQ/edit#heading=h.sm4v937g4cdo",
    anchor: "Visions of HCI Presentation Organization",
  },

  linkVisionsSlides: {
    href: "https://docs.google.com/presentation/d/10wRbnA7hIAYDbrybF6yMA6WRaFzoFtYQBxSBYa1Y-5Y/edit?usp=drive_link",
    anchor: "Visions of HCI Presentation Slides",
  },
} as const;

// export type CourseDataLinkKey = keyof typeof courseData;
