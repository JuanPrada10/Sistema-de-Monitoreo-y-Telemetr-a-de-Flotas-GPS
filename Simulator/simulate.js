const API_URL = 'http://localhost:3000/gps';

const vehicles = [
  { id: 'VH-001', lat: 14.6349, lng: -90.5069, moving: true },
  { id: 'VH-002', lat: 14.6400, lng: -90.5100, moving: true },
  { id: 'VH-003', lat: 14.6350, lng: -90.5070, moving: false },
];

function generateInvalidPayload() {
  const errors = [
    { vehicle_id: '', lat: 14.6349, lng: -90.5069, timestamp: new Date().toISOString() },
    { vehicle_id: 'VH-ERR', lat: 200, lng: -90.5069, timestamp: new Date().toISOString() },
    { vehicle_id: 'VH-ERR', lat: 14.6349, lng: 999, timestamp: new Date().toISOString() },
    { vehicle_id: 'VH-ERR', lat: 14.6349, lng: -90.5069, timestamp: 'not-a-date' },
    { lat: 14.6349, lng: -90.5069, timestamp: new Date().toISOString() },
    { vehicle_id: 'VH-ERR', lng: -90.5069, timestamp: new Date().toISOString() },
  ];
  return errors[Math.floor(Math.random() * errors.length)];
}

function generatePayload(vehicle) {
  if (Math.random() < 0.1) {
    return generateInvalidPayload();
  }

  if (vehicle.moving) {
    vehicle.lat += (Math.random() - 0.5) * 0.002;
    vehicle.lng += (Math.random() - 0.5) * 0.002;
  }

  return {
    vehicle_id: vehicle.id,
    lat: Math.round(vehicle.lat * 10000000) / 10000000,
    lng: Math.round(vehicle.lng * 10000000) / 10000000,
    timestamp: new Date().toISOString(),
  };
}

async function sendGps(vehicle) {
  const payload = generatePayload(vehicle);
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const status = res.status;
    const tag = status >= 200 && status < 300 ? 'OK' : 'ERR';
    console.log(`[${new Date().toLocaleTimeString()}] [${vehicle.id}] ${tag} ${status} | lat:${payload.lat} lng:${payload.lng}`);
  } catch (err) {
    console.log(`[${new Date().toLocaleTimeString()}] [${vehicle.id}] FAIL | ${err.message}`);
  }
}

function loop(vehicle) {
  sendGps(vehicle);
  setTimeout(() => loop(vehicle), 3000 + Math.random() * 2000);
}

console.log('=== GPS Simulator Started ===');
console.log(`Vehicles: ${vehicles.map(v => `${v.id} (${v.moving ? 'moving' : 'static'})`).join(', ')}`);
console.log(`Target: ${API_URL}`);
console.log('10% of requests will contain invalid data');
console.log('===============================');

vehicles.forEach(loop);
