export const PAGE_HOME_ON_NOW = 13;
export const PAGE_HOME_UP_NEXT = 15;
export const PAGE_HOME_SCHEDULE = 17;

export const PAGE_ANNOUNCEMENTS = 19;

export const PAGE_VENUE_ALL = 23;
export const PAGE_VENUE_MILKY_WAY = 26;
export const PAGE_VENUE_ANDROMEDA = 28;
export const PAGE_VENUE_HAYABUSA = 30;
export const PAGE_VENUE_CASSINI = 32;
export const PAGE_VENUE_ROSETTA = 34;

export const PAGE_CREDITS = 36;

export const PAGE_SESSION_BEFORE = 50;
export const PAGE_SESSION_CONTRIBUTORS = 52;
export const PAGE_SESSION_THURSDAY_NIGHT = 56;
export const PAGE_SESSION_FRIDAY_NIGHT = 58;
export const PAGE_SESSION_AFTER_PARTY = 60;
export const PAGE_SESSION_AFTER = 62;

export const PAGE_MENU_COC = 76;
export const PAGE_MENU_MENUS = 78;

export const TRACK_NETWORKING = 5551;
export const TRACK_MILKY_WAY = 13411;
export const TRACK_ANDROMEDA = 13412;
export const TRACK_HAYABUSA = 919798;
export const TRACK_CASSINI = 919799;
export const TRACK_ROSETTA = 1242640;

export const venues = [
  PAGE_VENUE_ALL,
  PAGE_VENUE_MILKY_WAY,
  PAGE_VENUE_ANDROMEDA,
  PAGE_VENUE_HAYABUSA,
  PAGE_VENUE_CASSINI,
  PAGE_VENUE_ROSETTA,
];

export const customSessions = [
  PAGE_SESSION_BEFORE,
  PAGE_SESSION_CONTRIBUTORS,
  PAGE_SESSION_THURSDAY_NIGHT,
  PAGE_SESSION_FRIDAY_NIGHT,
  PAGE_SESSION_AFTER_PARTY,
  PAGE_SESSION_AFTER,
];

export const menu = [PAGE_MENU_COC, PAGE_MENU_MENUS];

export const allPages = [PAGE_ANNOUNCEMENTS]
  .concat(venues)
  .concat(customSessions)
  .concat(menu);
