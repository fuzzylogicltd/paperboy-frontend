import moment from "moment";

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ",
    s: "s",
    m: "m",
    mm: "%d m",
    h: "h",
    hh: "%d h",
    d: "d",
    dd: "%d d",
    M: "a mth",
    MM: "%d mths",
    y: "y",
    yy: "%d y",
  },
});

export default function convertToRelativeTime(
  UTCTime: string | undefined
): string {
  if (!UTCTime) {
    return "";
  }

  const relativeTime = moment(UTCTime).fromNow().replace(/\s/g, "");

  return relativeTime;
}
