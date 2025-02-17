import { createMap } from "./map.js";
import { getSignalInfo, getTimeInfo } from "./info.js";
import { sign } from "./sign.js";

class Main {
  constructor() {
    if (Main.instance) {
      return Main.instance;
    }

    Main.instance = this;
  }

  static getInstance() {
    if (!Main.instance) {
      Main.instance = new Main();
    }

    return Main.instance;
  }

  run() {
    console.log('Run crosswalk app.');

    createMap();
    console.log('Create map.');

    updateSignal();
    console.log('Update signal.');
  }
}

try {
  const app = new Main();
  app.run();
} catch (error) {
  alert('오류가 발생했습니다: ', error);
  console.error(error);
}

async function updateSignal() {
  const TIME_DIFF = 150;
  const STOP_TIME = 484;
  const GO_TIME = 1120;
  let signal;
  let time;
  await getSignalInfo(1274)
    .then((data) => {
      // console.log('기준 시각: ', new Date(data.trsmUtcTime).toTimeString());
      console.log(data);

      signal = data?.etStsgStatNm;
    });
  await getTimeInfo(1274)
    .then((data) => {
      // console.log('기준 시각: ', new Date(data.trsmUtcTime).toTimeString());
      console.log(data);

      time = data?.etStsgRmdrCs;
    });

  if (!(signal && time)) return;

  if (signal === 'stop-And-Remain') {
    if (time < STOP_TIME - TIME_DIFF) {
      sign.on(time);
    }
    else {
      sign.off(time - (STOP_TIME - TIME_DIFF));
    }
  }
  else {
    if (signal === 'protected-Movement-Allowed') {
      sign.off(time + TIME_DIFF);
    }
  }

  // 'protected-clearance' (황색 신호)일 때 대응 불가 약 3초
}