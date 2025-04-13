let currentPower = 0;
let reactorTemperature = 300;
let coolantLevel = 50; // 50% coolant
let requiredPower = 500;
let reactorRunning = false;
let powerGenerationRate = 0.01; // Slower power generation rate
let temperatureIncreaseRate = 0.01; // Slower temperature increase rate
let coolantRate = 0.005; // Slower coolant depletion rate

const powerElement = document.getElementById("reactor-power");
const temperatureElement = document.getElementById("reactor-temperature");
const reactorStatus = document.getElementById("reactor-status");
const explosionImage = document.getElementById("explosion");
const reactorStatusText = document.getElementById("reactor-status-text");
const gridPower = document.getElementById("grid-power");
const temperatureStatus = document.getElementById("temperature-status");
const coolantLevelText = document.getElementById("coolant-level");

const startButton = document.getElementById("start-button");
const increasePowerBtn = document.getElementById("increase-power");
const decreasePowerBtn = document.getElementById("decrease-power");
const increaseCoolantBtn = document.getElementById("increase-coolant");
const decreaseCoolantBtn = document.getElementById("decrease-coolant");

const requiredPowerElement = document.getElementById("required-power");

function startReactor() {
  // Reset all variables before starting the reactor again
  currentPower = 0;
  reactorTemperature = 300;
  coolantLevel = 50;
  
  reactorRunning = true;
  startButton.disabled = true; // Disable start button once reactor starts
  reactorStatusText.textContent = "Reactor Status: Starting...";
  explosionImage.style.display = "none";

  // Begin the start-up sequence
  autoStartSequence();
}

function autoStartSequence() {
  let sequenceInterval = setInterval(() => {
    // Gradually increase power to get reactor stable
    if (currentPower < requiredPower) {
      currentPower += 20; // Gradually increase power
    }
    
    // Gradually increase coolant if necessary
    if (coolantLevel < 70) {
      coolantLevel += 1; // Gradually increase coolant
    }
    
    // Gradually adjust temperature based on power and coolant
    reactorTemperature += temperatureIncreaseRate * currentPower;
    reactorTemperature -= coolantLevel * 0.2; // Decrease temperature if coolant is present

    // Update the displayed metrics
    powerElement.textContent = `Power: ${Math.round(currentPower)} MW`;
    temperatureElement.textContent = `Temperature: ${Math.round(reactorTemperature)}°C`;
    coolantLevelText.textContent = `Coolant Level: ${Math.round(coolantLevel)}%`;

    // If the reactor reaches a stable state, stop the sequence
    if (currentPower >= requiredPower && reactorTemperature <= 1000 && coolantLevel >= 60) {
      reactorStatus.textContent = "Reactor is Stable!";
      reactorStatus.style.backgroundColor = "#4CAF50";
      reactorStatusText.textContent = "Reactor Status: Stable";
      clearInterval(sequenceInterval); // Stop the automatic sequence
      // Change required power after stabilization
      requiredPower = 800 + Math.floor(Math.random() * 200); // Randomly change required power
      requiredPowerElement.textContent = `Required Power: ${requiredPower} MW`;
      startButton.disabled = false; // Enable start button again after stabilization
    }
  }, 1000); // Update every second
}

function triggerExplosion() {
  explosionImage.style.display = "block";
  setTimeout(() => {
    alert("Boom! The reactor has exploded!");
    resetReactor();
  }, 1000);
}

function resetReactor() {
  // Reset reactor status after explosion
  reactorRunning = false;
  reactorStatusText.textContent = "Reactor Status: Off";
  startButton.disabled = false; // Enable the start button again
  explosionImage.style.display = "none";
}

// Control the reactor power and coolant
increasePowerBtn.addEventListener("click", () => {
  if (reactorRunning) {
    currentPower += 50; // Increase power gradually
    updateReactor();
  }
});

decreasePowerBtn.addEventListener("click", () => {
  if (reactorRunning && currentPower > 0) {
    currentPower -= 50; // Decrease power gradually
    updateReactor();
  }
});

increaseCoolantBtn.addEventListener("click", () => {
  if (reactorRunning && coolantLevel < 100) {
    coolantLevel += 10; // Increase coolant
    updateReactor();
  }
});

decreaseCoolantBtn.addEventListener("click", () => {
  if (reactorRunning && coolantLevel > 0) {
    coolantLevel -= 10; // Decrease coolant
    updateReactor();
  }
});

startButton.addEventListener("click", startReactor);

function updateReactor() {
  if (reactorTemperature >= 1000 || currentPower > requiredPower) {
    triggerExplosion();
  }
  
  powerElement.textContent = `Power: ${Math.round(currentPower)} MW`;
  temperatureElement.textContent = `Temperature: ${Math.round(reactorTemperature)}°C`;
  coolantLevelText.textContent = `Coolant Level: ${Math.round(coolantLevel)}%`;
}
