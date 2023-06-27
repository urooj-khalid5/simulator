
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

    const numServers = 5; // Number of servers
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

  // Generate data and display it
  function generateIACharts() {
    const nSamples = parseInt(document.getElementById("num-customers").value);
    if (isNaN(nSamples) || nSamples <= 0) {
      alert("Please enter a valid number of customers.");
      return;
    }

    const shape = parseFloat(document.getElementById("shape").value);
    if (isNaN(shape) || shape <= 0) {
      alert("Please enter a valid shape value for the Gamma distribution.");
      return;
    }

    const scale = parseFloat(document.getElementById("scale").value);
    if (isNaN(scale) || scale <= 0) {
      alert("Please enter a valid scale value for the Gamma distribution.");
      return;
    }

    const lambda = parseFloat(document.getElementById("lambda").value);
    if (isNaN(lambda) || lambda <= 0) {
      alert("Please enter a valid lambda value for the Poisson distribution.");
      return;
    }

    const { customerNumbers, serverNumbers, arrivalTimes, interArrivalTimes, serviceTimes, startTimes, endTimes, turnaroundTimes, waitTimes, responseTimes } = simulateData(nSamples, shape, scale, lambda);

    const dataContainer = document.getElementById("data-container");
    dataContainer.innerHTML = ""; // Clear previous data

    // Generate charts
    generateInterArrivalChart(interArrivalTimes);
  }
  function generateSTCharts() {
    const nSamples = parseInt(document.getElementById("num-customers").value);
    if (isNaN(nSamples) || nSamples <= 0) {
      alert("Please enter a valid number of customers.");
      return;
    }

    const shape = parseFloat(document.getElementById("shape").value);
    if (isNaN(shape) || shape <= 0) {
      alert("Please enter a valid shape value for the Gamma distribution.");
      return;
    }

    const scale = parseFloat(document.getElementById("scale").value);
    if (isNaN(scale) || scale <= 0) {
      alert("Please enter a valid scale value for the Gamma distribution.");
      return;
    }

    const lambda = parseFloat(document.getElementById("lambda").value);
    if (isNaN(lambda) || lambda <= 0) {
      alert("Please enter a valid lambda value for the Poisson distribution.");
      return;
    }

    const { customerNumbers, serverNumbers, arrivalTimes, interArrivalTimes, serviceTimes, startTimes, endTimes, turnaroundTimes, waitTimes, responseTimes } = simulateData(nSamples, shape, scale, lambda);

    const dataContainer = document.getElementById("data-container");
    dataContainer.innerHTML = ""; // Clear previous data

    // Generate charts
    generateServiceTimeChart(serviceTimes); 
  }
  function generatePCharts() {
    const nSamples = parseInt(document.getElementById("num-customers").value);
    if (isNaN(nSamples) || nSamples <= 0) {
      alert("Please enter a valid number of customers.");
      return;
    }

    const shape = parseFloat(document.getElementById("shape").value);
    if (isNaN(shape) || shape <= 0) {
      alert("Please enter a valid shape value for the Gamma distribution.");
      return;
    }

    const scale = parseFloat(document.getElementById("scale").value);
    if (isNaN(scale) || scale <= 0) {
      alert("Please enter a valid scale value for the Gamma distribution.");
      return;
    }

    const lambda = parseFloat(document.getElementById("lambda").value);
    if (isNaN(lambda) || lambda <= 0) {
      alert("Please enter a valid lambda value for the Poisson distribution.");
      return;
    }

    const { customerNumbers, serverNumbers, arrivalTimes, interArrivalTimes, serviceTimes, startTimes, endTimes, turnaroundTimes, waitTimes, responseTimes } = simulateData(nSamples, shape, scale, lambda);

    const dataContainer = document.getElementById("data-container");
    dataContainer.innerHTML = ""; // Clear previous data

    // Generate charts
    generateProbabilityChart(nSamples, interArrivalTimes, serviceTimes);
  }
  function generateUCharts() {
    const nSamples = parseInt(document.getElementById("num-customers").value);
    if (isNaN(nSamples) || nSamples <= 0) {
      alert("Please enter a valid number of customers.");
      return;
    }

    const shape = parseFloat(document.getElementById("shape").value);
    if (isNaN(shape) || shape <= 0) {
      alert("Please enter a valid shape value for the Gamma distribution.");
      return;
    }

    const scale = parseFloat(document.getElementById("scale").value);
    if (isNaN(scale) || scale <= 0) {
      alert("Please enter a valid scale value for the Gamma distribution.");
      return;
    }

    const lambda = parseFloat(document.getElementById("lambda").value);
    if (isNaN(lambda) || lambda <= 0) {
      alert("Please enter a valid lambda value for the Poisson distribution.");
      return;
    }

    const { customerNumbers, serverNumbers, arrivalTimes, interArrivalTimes, serviceTimes, startTimes, endTimes, turnaroundTimes, waitTimes, responseTimes } = simulateData(nSamples, shape, scale, lambda);

    const dataContainer = document.getElementById("data-container");
    dataContainer.innerHTML = ""; // Clear previous data

    // Generate charts
    generateUtilizationChart(nSamples, startTimes, endTimes);
  }
  function generateSUCharts() {
    const nSamples = parseInt(document.getElementById("num-customers").value);
    if (isNaN(nSamples) || nSamples <= 0) {
      alert("Please enter a valid number of customers.");
      return;
    }

    const shape = parseFloat(document.getElementById("shape").value);
    if (isNaN(shape) || shape <= 0) {
      alert("Please enter a valid shape value for the Gamma distribution.");
      return;
    }

    const scale = parseFloat(document.getElementById("scale").value);
    if (isNaN(scale) || scale <= 0) {
      alert("Please enters a valid scale value for the Gamma distribution.");
      return;
    }

    const lambda = parseFloat(document.getElementById("lambda").value);
    if (isNaN(lambda) || lambda <= 0) {
      alert("Please enter a valid lambda value for the Poisson distribution.");
      return;
    }

    const { customerNumbers, serverNumbers, arrivalTimes, interArrivalTimes, serviceTimes, startTimes, endTimes, turnaroundTimes, waitTimes, responseTimes } = simulateData(nSamples, shape, scale, lambda);

    const dataContainer = document.getElementById("data-container");
    dataContainer.innerHTML = ""; // Clear previous data

    // Generate charts
    generateServerUtilizationChart(nSamples, serverNumbers, startTimes, endTimes);
  }

  // Generate inter-arrival time chart
  function generateInterArrivalChart(interArrivalTimes) {
    const ctx = document.getElementById("inter-arrival-chart").getContext("2d");
    const labels = Array.from({ length: interArrivalTimes.length }, (_, i) => i + 1);
    const data = {
      labels: labels,
      datasets: [{
        label: "Inter-Arrival Time",
        data: interArrivalTimes,
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }]
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
    new Chart(ctx, {
      type: "bar",
      data: data,
      options:{
        responsive: true,
      }
    });
  }

  // Generate service time chart
  function generateServiceTimeChart(serviceTimes) {
    const ctx = document.getElementById("service-time-chart").getContext("2d");
    const labels = Array.from({ length: serviceTimes.length }, (_, i) => i + 1);
    const data = {
      labels: labels,
      datasets: [{
        label: "Service Time",
        data: serviceTimes,
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
      }]
    };
    const options = {
      scales: {
        y: {
          ticks:{
            color:'black'
            
          },
          beginAtZero: true
        }
      }
    };
    new Chart(ctx, {
      type: "bar",
      data: data,
      options:{
        responsive: true,
      }

    });
  }

  // Generate probability of n customers in the system chart
  function generateProbabilityChart(nSamples, interArrivalTimes, serviceTimes) {
    const ctx = document.getElementById("probability-chart").getContext("2d");
    const labels = Array.from({ length: nSamples }, (_, i) => i + 1);
    const probabilities = labels.map((label) => calculateProbability(label, interArrivalTimes, serviceTimes));
    const data = {
      labels: labels,
      datasets: [{
        label: "Probability of n Customers in System",
        data: probabilities,
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }]
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
    new Chart(ctx, {
      type: "line",
      data: data,
      options:{
        responsive: true,
      }
    });
  }

  // Calculate the probability of having n customers in the system
  function calculateProbability(n, interArrivalTimes, serviceTimes) {
    const arrivalSum = interArrivalTimes.reduce((sum, time) => sum + parseFloat(time), 0);
    const serviceSum = serviceTimes.reduce((sum, time) => sum + parseFloat(time), 0);
    const lambda = interArrivalTimes.length / arrivalSum;
    const mu = interArrivalTimes.length / serviceSum;
    const rho = lambda / mu;
    const p0 = 1 / (1 + (Math.pow(rho, n) / factorial(n) * (1 - rho / (n + 1))));
    const pn = (Math.pow(rho, n) / factorial(n) * p0);
    return pn;
  }

  // Calculate the factorial of a number
  function factorial(n) {
    if (n === 0 || n === 1) {
      return 1;
    }
    for (var i = n - 1; i >= 1; i--) {
      n *= i;
    }
    return n;
  }

  // Generate server utilization chart
  function generateUtilizationChart(nSamples, startTimes, endTimes) {
    const ctx = document.getElementById("utilization-chart").getContext("2d");
    const labels = Array.from({ length: nSamples }, (_, i) => i + 1);
    const utilization = labels.map((label) => calculateUtilization(label, startTimes, endTimes));
    const data = {
      labels: labels,
      datasets: [{
        label: "Server Utilization",
        data: utilization,
        backgroundColor: "rgba(255, 206, 86, 0.8)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1
      }]
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
    new Chart(ctx, {
      type: "line",
      data: data,
      options:{
        responsive:true,
      }
    });
  }

  // Calculate server utilization
  function calculateUtilization(n, startTimes, endTimes) {
    let numCustomersInSystem = 0;
    for (let i = 0; i < startTimes.length; i++) {
      if (startTimes[i] <= n && endTimes[i] >= n) {
        numCustomersInSystem++;
      }
    }
    return numCustomersInSystem / startTimes.length;
  }

  // Generate number of servers vs utilization chart
  function generateServerUtilizationChart(nSamples, serverNumbers, startTimes, endTimes) {
    const ctx = document.getElementById("server-utilization-chart").getContext("2d");
    const serverSet = new Set(serverNumbers);
    const labels = Array.from(serverSet);
    const utilization = labels.map((label) => calculateServerUtilization(label, serverNumbers, startTimes, endTimes));
    const data = {
      labels: labels,
      datasets: [{
        label: "Number of Servers vs Utilization",
        data: utilization,
        backgroundColor: "rgba(153, 102, 255, 0.8)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1
      }]
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
    new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        responsive:true,
      }
    });
  }

  // Calculate server utilization based on the number of servers
  function calculateServerUtilization(n, serverNumbers, startTimes, endTimes) {
    let numCustomersInSystem = 0;
    for (let i = 0; i < startTimes.length; i++) {
      if (serverNumbers[i] <= n && startTimes[i] <= n && endTimes[i] >= n) {
        numCustomersInSystem++;
      }
    }
    return numCustomersInSystem / startTimes.length;
  }
  

