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

  linkProjectMilestone1Signup: {
    href: undefined,
  },

  linkProjectMilestone2Signup: {
    href: undefined,
  },

  linkProjectProposalGoogleDoc: {
    href: "https://docs.google.com/document/d/1mmYPRx8LmdH6f9p0zq1CjZznMe8nJp72DDqR9cd6QMM/edit?usp=sharing",
  },

  linkVisionsSignup: {
    href: "https://docs.google.com/document/d/1vtwIw_jZurCsgwtlNloEoedjRblA5q2v7avqo_AYvXQ/edit#heading=h.sm4v937g4cdo",
    anchor: "Visions of HCI Presentation Signup",
  },

  linkVisionsSlides: {
    href: "https://docs.google.com/presentation/d/10wRbnA7hIAYDbrybF6yMA6WRaFzoFtYQBxSBYa1Y-5Y/edit?usp=drive_link",
    anchor: "Visions of HCI Presentation Slides",
  },

  // Reading on paper writing
  readingWobbrockPaperWriting: {
    authorText: "Jacob O. Wobbrock",
    title: "Catchy Titles are Good: But Avoid Being Cute",
    publicationText: "2015",
    link: "https://faculty.washington.edu/wobbrock/pubs/Wobbrock-2015.pdf",
  },
} as const;

// export type CourseDataLinkKey = keyof typeof courseData;
