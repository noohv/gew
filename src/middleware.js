import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["lv", "en"],

  // Used when no locale matches
  defaultLocale: "lv",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(lv|en)/:path*"],
};
