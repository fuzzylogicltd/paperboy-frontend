import moment from "moment";

export function convertToRelativeTime(UTCTime: string | undefined): string {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ",
      s: "s",
      m: "m",
      mm: "%dm",
      h: "h",
      hh: "%dh",
      d: "a day ago",
      dd: "%dd",
      M: "a month ago",
    },
  });

  if (!UTCTime) {
    return "";
  }

  const date = moment(UTCTime);
  const now = moment();
  const daysDifference = now.diff(date, "days");

  if (daysDifference > 30) {
    if (date.year() === now.year()) {
      return date.format("D MMM");
    } else {
      return date.format("D MMM YYYY");
    }
  }

  const relativeTime = moment(UTCTime).fromNow();

  return relativeTime;
}

export function convertToHumanReadableDateAndTime(
  UTCTime: string | undefined
): string {
  if (!UTCTime) {
    return "";
  }

  const date = moment(UTCTime);

  return date.format("MMMM D, YYYY [at] LT");
}
