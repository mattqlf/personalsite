export const SITE = {
  website: "https://mattqlf.com/",
  author: "Matthew Li",
  profile: "https://mattqlf.com/",
  desc: "Personal website and blog of Matthew Li - Software Engineer and CMU student.",
  title: "Matthew Li",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: false,
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/mattqlf/personal/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "America/New_York", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
