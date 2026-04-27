export function generateUserNameFromEmail(email: string) {
  return email.split("@")[0];
}

export function formatName(fullName: string) {
  const salutations = ["Mr.", "Mrs.", "Ms.", "Dr.", "MD."];

  const splitedName = fullName.split(" ");

  if (splitedName.length === 2) {
    return {
      firstName: splitedName[0],
      lastName: splitedName[splitedName.length - 1],
    };
  }

  for (let s of salutations) {
    if (fullName.startsWith(s)) {
      return {
        firstName: splitedName[1],
        lastName: splitedName[splitedName.length - 1],
      };
    }
  }

  throw fullName;
}

export function formatSeconds(
  totalSeconds: number,
  options?: { dhms: boolean },
) {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (options?.dhms) {
    return `${days > 0 && `${days}d`} ${hours > 0 && `${hours}h`} ${minutes > 0 && `${minutes}m `} ${seconds > 0 && `${seconds}s`}  `;
  }

  // Default: hh:mm:ss with leading zeros
  const totalHours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);

  return [totalHours, mins, secs]
    .map((val) => val.toString().padStart(2, "0"))
    .join(":");
}

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const diff = targetDate.getTime() - new Date().getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};
