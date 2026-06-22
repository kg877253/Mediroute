const fs = require("fs");
const path = require("path");

const doctorsPath = path.join(__dirname, "../data/doctors.json");
const doctors = JSON.parse(fs.readFileSync(doctorsPath, "utf8"));

const cities = ["Delhi", "Mumbai", "Jaipur", "Goa", "Bangalore"];
const specialties = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Orthopedic",
  "Pediatrician",
  "ENT Specialist",
  "Gynecologist",
  "Dentist",
];

const cityPrefixes = {
  Delhi: "DEL",
  Mumbai: "MUM",
  Jaipur: "JAI",
  Goa: "GOA",
  Bangalore: "BLR",
};

const firstNames = [
  "Aarav", "Aditi", "Akhil", "Ananya", "Anil", "Anjali", "Arjun", "Deepa",
  "Dev", "Isha", "Karan", "Kavya", "Meera", "Nikhil", "Pooja", "Rahul",
  "Riya", "Sanjay", "Sneha", "Tanvi", "Vikram", "Vivek",
];

const lastNames = [
  "Sharma", "Verma", "Gupta", "Singh", "Kapoor", "Nair", "Iyer", "Rao",
  "Menon", "Mehta", "Patel", "Joshi", "Kaur", "Chopra", "Reddy", "Das",
  "Malhotra", "Bhatia", "Desai", "Sen",
];

function nextIdForCity(city, allDoctors) {
  const prefix = cityPrefixes[city];
  const maxNumber = allDoctors
    .filter((doctor) => doctor.id && doctor.id.startsWith(`${prefix}-`))
    .map((doctor) => Number.parseInt(doctor.id.replace(`${prefix}-`, ""), 10))
    .filter(Number.isFinite)
    .reduce((max, value) => Math.max(max, value), 0);

  return `${prefix}-${String(maxNumber + 1).padStart(3, "0")}`;
}

function makeDoctorName(seed) {
  const first = firstNames[seed % firstNames.length];
  const last = lastNames[(seed * 3) % lastNames.length];
  return `Dr. ${first} ${last}`;
}

function makeFeeRange(specialty, seed) {
  const specialistBase = {
    "General Physician": 350,
    Cardiologist: 800,
    Dermatologist: 500,
    Orthopedic: 650,
    Pediatrician: 400,
    "ENT Specialist": 450,
    Gynecologist: 600,
    Dentist: 300,
  };
  const min = specialistBase[specialty] + ((seed % 4) * 100);
  const max = min + 300 + ((seed % 3) * 100);
  return { min, max };
}

let expanded = [...doctors];
let seed = expanded.length + 1;

for (const city of cities) {
  for (const specialty of specialties) {
    const existing = expanded.filter(
      (doctor) => doctor.city === city && doctor.specialty === specialty
    );
    const needed = Math.max(0, 8 - existing.length);

    for (let i = 0; i < needed; i += 1) {
      const fees = makeFeeRange(specialty, seed);
      const rating = Number((4.0 + ((seed % 10) * 0.1)).toFixed(1));

      expanded.push({
        id: nextIdForCity(city, expanded),
        name: makeDoctorName(seed),
        specialty,
        city,
        feeRangeMin: fees.min,
        feeRangeMax: fees.max,
        rating,
        nmcVerified: seed % 7 !== 0,
      });

      seed += 1;
    }
  }
}

expanded.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
fs.writeFileSync(doctorsPath, `${JSON.stringify(expanded, null, 2)}\n`);

console.log(`Expanded doctors.json to ${expanded.length} doctors.`);
