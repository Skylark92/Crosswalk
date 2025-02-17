import { fetchWithTimeout } from "./utils.js";

const getTimeInfo = (itstId) => {
  const data = fetchWithTimeout(
    `https://tapi.skylark92.workers.dev/v2xSignalPhaseTimingInformation/1.0?itstId=${itstId}&numOfRows=1`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data) return data[0];
      else return data;
    })
    .catch((error) => {
      console.error(error);
    })

  return data;
}

const getSignalInfo = (itstId) => {
  const data = fetchWithTimeout(
    `https://tapi.skylark92.workers.dev/v2xSignalPhaseInformation/1.0?itstId=${itstId}&numOfRows=1`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data) return data[0];
      else return data;
    })
    .catch((error) => {
      console.error(error);
    })

  return data;
}

export { getTimeInfo, getSignalInfo };

// 1274 적색등 약 48.4초