import * as React from "react";

import AppLink from "@/components/AppLink";
import Box from "@mui/material/Box";

import {
  stylesSidebar,
  stylesSidebarPageLinksList,
  stylesSidebarPageLinksListItem,
  stylesSidebarPageLinksNestedListItem,
  stylesSidebarSiteLinksList,
  stylesSidebarSiteLinksListItem,
} from "./styles";

type sidebarLink = {
  anchor: React.ReactNode;
  href: string;
};

interface SidebarProps {
  siteLinks: sidebarLink[];
  pageLinks: (sidebarLink | sidebarLink[])[];
}

const Sidebar: React.FunctionComponent<SidebarProps> = ({
  siteLinks,
  pageLinks,
}) => {
  return (
    <div style={stylesSidebar}>
      <ul style={stylesSidebarSiteLinksList}>
        {siteLinks.map((siteLinkCurrent, siteLinkIndex) => {
          return (
            <li key={siteLinkIndex} style={stylesSidebarSiteLinksListItem}>
              <AppLink href={siteLinkCurrent.href}>
                {siteLinkCurrent.anchor}
              </AppLink>
            </li>
          );
        })}
      </ul>
      <ul style={stylesSidebarPageLinksList}>
        {pageLinks.map((pageLinkCurrent, pageLinkIndex) => {
          if (!Array.isArray(pageLinkCurrent)) {
            return (
              <li key={pageLinkIndex} style={stylesSidebarPageLinksListItem}>
                <AppLink href={pageLinkCurrent.href}>
                  {pageLinkCurrent.anchor}
                </AppLink>
              </li>
            );
          } else {
            const nestedPageLinks = pageLinkCurrent;

            return nestedPageLinks.map(
              (nestedPageLinkCurrent, nestedPageLinkIndex) => {
                return (
                  <li
                    key={nestedPageLinkIndex}
                    style={stylesSidebarPageLinksNestedListItem}
                  >
                    <AppLink href={nestedPageLinkCurrent.href}>
                      {nestedPageLinkCurrent.anchor}
                    </AppLink>
                  </li>
                );
              },
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
