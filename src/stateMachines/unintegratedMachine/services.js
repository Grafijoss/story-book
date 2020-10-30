import { addMinutes, compareDesc } from "date-fns";

export const fetchUser = async (context) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    headers: { Accept: "application/json" },
  });

  return response.json();
};

export const fetchCheckedTournament = () => {
  const fakeTime = addMinutes(new Date(), 1);

  const unintegrateTournamentMock = {
    statusCode: 200,
    data: {
      entries: {
        utId: 1,
        stateCode: 1,
        tournamentId: "176420",
        tournamentName: "FIFIA 20 (PS$) StartupCities Qalifier #2 Europe",
        checkinTime: fakeTime.getTime(),
        startTime: "176420",
      },
    },
    state: {
      isLoggedIn: false,
      isTokenValid: false,
    },
  };

  const responseEmpty = {
    statusCode: 200,
    data: {
      entries: {},
    },
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(unintegrateTournamentMock);
    }, 2000);
  });
};

export const checkingStartTime = (context) => {
  const checkedTime = context.tournament.checkinTime;
  const currentTime = new Date();
  const currentDateUTC = currentTime.getTime();

  const compareDates = compareDesc(currentDateUTC, checkedTime);

  return new Promise((resolve) => {
    resolve(compareDates > 0);
  });
};
