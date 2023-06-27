
  function simulateData(nSamples, shape, scale, lambda) {
    const customerNumbers = [];
    const serverNumbers = [];
    const arrivalTimes = [];
    const interArrivalTimes = [];
    const serviceTimes = [];
    const startTimes = [];
    const endTimes = [];
    const turnaroundTimes = [];
    const waitTimes = [];
    const responseTimes = [];

    const numServers = parseInt(document.getElementById("num-servers").value); // Number of servers
    let currentTime = 0;
    let previousEndTime = 0;

    for (let i = 0; i < nSamples; i++) {
      const customerNumber = i + 1;
      const serverNumber = Math.floor(Math.random() * numServers) + 1; // Generate random server number between 1 and numServers
      const interArrivalTime = jStat.poisson.sample(lambda); // Generate random inter-arrival time using Poisson distribution with the user-defined lambda
      const serviceTime = jStat.gamma.sample(shape, scale); // Generate random service time using Gamma distribution with user-defined shape and scale

      currentTime += interArrivalTime; // Update current time
      const startTime = Math.max(currentTime, previousEndTime); // Set start time as max of current time and previous end time
      const endTime = startTime + serviceTime; // Calculate end time
      const turnaroundTime = endTime - currentTime;
      const waitTime = startTime - currentTime;
      const responseTime = waitTime + serviceTime;

      customerNumbers.push(customerNumber);
      serverNumbers.push(serverNumber);
      arrivalTimes.push(currentTime.toFixed(2));
      interArrivalTimes.push(interArrivalTime.toFixed(2));
      serviceTimes.push(serviceTime.toFixed(2));
      startTimes.push(startTime.toFixed(2));
      endTimes.push(endTime.toFixed(2));
      turnaroundTimes.push(turnaroundTime.toFixed(2));
      waitTimes.push(waitTime.toFixed(2));
      responseTimes.push(responseTime.toFixed(2));

      previousEndTime = endTime; // Update previous end time for the next iteration
    }

    return { customerNumbers, serverNumbers, arrivalTimes, interArrivalTimes, serviceTimes, startTimes, endTimes, turnaroundTimes, waitTimes, responseTimes };
  }
        
  






function calculateServerMetrics(data, numServers) {
const { interArrivalTimes, serviceTimes, startTimes, endTimes, waitTimes } = data;

const meanInterArrivalTime = calculateMean(interArrivalTimes);
const meanServiceTime = calculateMean(serviceTimes);
const avgCustomersInQueue = calculateMean(waitTimes) / meanInterArrivalTime;
const avgCustomersInSystem = avgCustomersInQueue + (meanServiceTime / meanInterArrivalTime);
const avgWaitInSystem = calculateMean(waitTimes);
const avgWaitInQueue = avgWaitInSystem - (meanServiceTime / numServers);
const serverUtilization = (calculateMean(serviceTimes) * numServers) / endTimes[endTimes.length - 1];
const serverIdle = 1 - serverUtilization;
// Traffic Intensity (rho) calculation
const rho = meanInterArrivalTime * serverUtilization / (meanServiceTime * numServers);

return {
  meanInterArrivalTime,
  meanServiceTime,
  avgCustomersInQueue,
  avgCustomersInSystem,
  avgWaitInSystem,
  avgWaitInQueue,
  serverUtilization,
  serverIdle,
  rho,
};
}

function calculateMean(values) {
const sum = values.reduce((acc, value) => acc + value, 0);
return sum / values.length;
}

function generateData() {
const numCustomers = parseInt(document.getElementById("num-customers").value);
const shape = parseFloat(document.getElementById("shape").value);
const scale = parseFloat(document.getElementById("scale").value);
const lambda = parseFloat(document.getElementById("lambda").value);
const numServers = parseInt(document.getElementById("num-servers").value);

const interArrivalTimes = generatePoissonDistribution(lambda, numCustomers);
const serviceTimes = generateGammaDistribution(shape, scale, numCustomers);

const startTimes = [0];
const endTimes = [serviceTimes[0]];
const waitTimes = [0];

for (let i = 1; i < numCustomers; i++) {
  startTimes[i] = Math.max(endTimes[i - 1], startTimes[i - 1] + interArrivalTimes[i]);
  endTimes[i] = startTimes[i] + serviceTimes[i];
  waitTimes[i] = startTimes[i] - endTimes[i - 1];
}

const data = {
  interArrivalTimes,
  serviceTimes,
  startTimes,
  endTimes,
  waitTimes,
};

displayData(data, numServers); // Call displayData to show the generated data
}




function generateGammaDistribution(shape, scale, size) {
const interArrivalTimes = [];

for (let i = 0; i < size; i++) {
  const interArrivalTime = jStat.gamma.sample(shape, scale);
  interArrivalTimes.push(interArrivalTime);
}

return interArrivalTimes;
}

function generatePoissonDistribution(lambda, size) {
const serviceTimes = [];

for (let i = 0; i < size; i++) {
  const serviceTime = jStat.poisson.sample(lambda);
  serviceTimes.push(serviceTime);
}

return serviceTimes;
}

function displayData(data, numServers) {
const { interArrivalTimes, serviceTimes, startTimes, endTimes, waitTimes } = data;

const dataContainer = document.getElementById("data-container");
dataContainer.innerHTML = ""; // Clear previous data

const table = document.createElement("table");
const tableHead = document.createElement("thead");
const tableBody = document.createElement("tbody");

// Create table header row
const headerRow = document.createElement("tr");
const headerLabels = [
  "Customer Number",
  "Inter-Arrival Time",
  "Service Time",
  "Start Time",
  "End Time",
  "Turnaround Time",
  "Wait Time",
  "Response Time",
];

headerLabels.forEach((label) => {
  const th = document.createElement("th");
  th.textContent = label;
  headerRow.appendChild(th);
});

tableHead.appendChild(headerRow);
table.appendChild(tableHead);

// Create table body rows
for (let i = 0; i < interArrivalTimes.length; i++) {
  const row = document.createElement("tr");
  const rowData = [
    i + 1,
    interArrivalTimes[i].toFixed(2),
    serviceTimes[i].toFixed(2),
    startTimes[i].toFixed(2),
    endTimes[i].toFixed(2),
    (endTimes[i] - startTimes[i]).toFixed(2),
    waitTimes[i].toFixed(2),
    (waitTimes[i] + serviceTimes[i]).toFixed(2),
  ];

  rowData.forEach((value) => {
    const td = document.createElement("td");
    td.textContent = value;
    row.appendChild(td);
  });

  tableBody.appendChild(row);
}

table.appendChild(tableBody);
dataContainer.appendChild(table);

// Calculate and display server metrics
const metricsContainer = document.getElementById("metrics-container");
metricsContainer.innerHTML = ""; // Clear previous metrics

const metrics = calculateServerMetrics(data, numServers);

// Create metrics table
const metricsTable = document.createElement("table");
const metricsTableHead = document.createElement("thead");
const metricsTableBody = document.createElement("tbody");

// Create metrics table header
const metricsHeaderRow = document.createElement("tr");
const metricsHeaderLabels = [
  "Mean Inter-Arrival Time",
  "Mean Service Time",
  "Average Number of Customers in Queue",
  "Average Number of Customers in System",
  "Average Wait in System",
  "Average Wait in Queue",
  "Average Server Utilization",
  "Average Server Idle",
  "Traffic Intensity (rho)",
];

metricsHeaderLabels.forEach((label) => {
  const th = document.createElement("th");
  th.textContent = label;
  metricsHeaderRow.appendChild(th);
});

metricsTableHead.appendChild(metricsHeaderRow);
metricsTable.appendChild(metricsTableHead);

// Create metrics table row
const metricsRow = document.createElement("tr");
const {
  meanInterArrivalTime,
  meanServiceTime,
  avgCustomersInQueue,
  avgCustomersInSystem,
  avgWaitInSystem,
  avgWaitInQueue,
  serverUtilization,
  serverIdle,
  rho,
} = metrics;

const metricsCellValues = [
  meanInterArrivalTime.toFixed(2),
  meanServiceTime.toFixed(2),
  avgCustomersInQueue.toFixed(2),
  avgCustomersInSystem.toFixed(2),
  avgWaitInSystem.toFixed(2),
  avgWaitInQueue.toFixed(2),
  serverUtilization.toFixed(2),
  serverIdle.toFixed(2),
  rho.toFixed(2),
];

metricsCellValues.forEach((value) => {
  const td = document.createElement("td");
  td.textContent = value;
  metricsRow.appendChild(td);
});

metricsTableBody.appendChild(metricsRow);
metricsTable.appendChild(metricsTableBody);
metricsContainer.appendChild(metricsTable);


}

