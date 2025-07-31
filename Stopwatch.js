class Stopwatch {
  #elapsedTimeInSeconds = 0;
  #intervalId = null;

  start(callback = () => {}) {
    this.#intervalId = setInterval(() => {
      this.#elapsedTimeInSeconds++;
      callback();
    }, 1000);
  }

  stop(callback = () => {}) {
    clearInterval(this.#intervalId);
    callback();
  }

  reset(callback = () => {}) {
    this.#elapsedTimeInSeconds = 0;
    callback();
  }

  get elapsedTime() {
    return Stopwatch.formatTime(this.#elapsedTimeInSeconds);
  }

  static formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds - hours * 3600 - minutes * 60;

    return `${Stopwatch.zeroPadding(hours)}:${Stopwatch.zeroPadding(
      minutes
    )}:${Stopwatch.zeroPadding(seconds)}`;
  }

  static zeroPadding(originalNumber, desiredAmountOfDigits = 2) {
    let stringNumber = originalNumber.toString();
    const zeroesRequired = desiredAmountOfDigits - stringNumber.length;

    if (zeroesRequired <= 0) {
      return stringNumber;
    }

    for (let i = 0; i < zeroesRequired; i++) {
      stringNumber = `0${stringNumber}`;
    }

    return stringNumber;
  }
}

const startBtn = document.querySelector("#start-button");
const pauseBtn = document.querySelector("#pause-button");
const resetBtn = document.querySelector("#reset-button");
const stopwatchDisplay = document.querySelector("#stopwatch-display");

const sw1 = new Stopwatch();

startBtn.addEventListener("click", () => {
  sw1.start(() => {
    stopwatchDisplay.textContent = sw1.elapsedTime;
  });
});

pauseBtn.addEventListener("click", () => {
  sw1.stop(() => {
    stopwatchDisplay.textContent = sw1.elapsedTime;
  });
});

resetBtn.addEventListener("click", () => {
  sw1.reset(() => {
    stopwatchDisplay.textContent = sw1.elapsedTime;
  });
});