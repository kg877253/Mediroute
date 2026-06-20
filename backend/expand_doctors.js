const fs = require('fs');
const path = require('path');

const doctorsPath = path.join(__dirname, 'data', 'doctors.json');
const doctors = JSON.parse(fs.readFileSync(doctorsPath, 'utf8'));

// Names to generate new ones
const firstNamesM = ['Rahul', 'Amit', 'Vikram', 'Sanjay', 'Rohit', 'Rajesh', 'Rakesh', 'Suresh', 'Manish', 'Nitin', 'Kapil', 'Praveen', 'Sachin', 'Anil', 'Gaurav', 'Tarun', 'Naveen', 'Ashish', 'Deepak', 'Vikas', 'Vivek', 'Ravi', 'Ajay', 'Vijay', 'Sumit', 'Sunil', 'Rajeev', 'Alok', 'Anurag', 'Akhil'];
const firstNamesF = ['Priya', 'Neha', 'Pooja', 'Anjali', 'Kavita', 'Sneha', 'Megha', 'Shruti', 'Divya', 'Swati', 'Ritu', 'Anita', 'Sunita', 'Rekha', 'Kiran', 'Shilpa', 'Sonali', 'Nidhi', 'Rashmi', 'Preeti', 'Simran', 'Shweta', 'Pallavi', 'Neelam', 'Seema', 'Mamta', 'Aarti'];
const lastNames = ['Sharma', 'Verma', 'Gupta', 'Singh', 'Kumar', 'Patel', 'Shah', 'Reddy', 'Rao', 'Iyer', 'Menon', 'Nair', 'Pillai', 'Joshi', 'Desai', 'Mehta', 'Kaur', 'Chopra', 'Malhotra', 'Bhatia', 'Kapoor', 'Das', 'Sen', 'Bose', 'Chatterjee', 'Banerjee', 'Mukherjee', 'Dutta'];

const cities = ['Delhi', 'Mumbai', 'Jaipur', 'Goa', 'Bangalore'];
const specialties = [
  'General Physician', 'Cardiologist', 'Dermatologist', 'Orthopedic',
  'Pediatrician', 'ENT Specialist', 'Gynecologist', 'Dentist'
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateName(specialty) {
  const isFemale = specialty === 'Gynecologist' || Math.random() > 0.5;
  const first = isFemale ? getRandomItem(firstNamesF) : getRandomItem(firstNamesM);
  const last = getRandomItem(lastNames);
  return `Dr. ${first} ${last}`;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let newDoctors = [...doctors];
let idCounter = 100; // start ids safely above 001-008

cities.forEach(city => {
  specialties.forEach(specialty => {
    // Check how many currently exist
    const existing = newDoctors.filter(d => d.city === city && d.specialty === specialty);
    const numNeeded = Math.max(0, 3 - existing.length);
    
    for (let i = 0; i < numNeeded; i++) {
      const cityPrefix = city === 'Delhi' ? 'DEL' : city === 'Mumbai' ? 'MUM' : city === 'Jaipur' ? 'JAI' : city === 'Goa' ? 'GOA' : 'BLR';
      const id = `${cityPrefix}-${idCounter++}`;
      
      const minFee = getRandomInt(3, 10) * 100; // 300 to 1000
      const maxFee = minFee + getRandomInt(2, 5) * 100; // + 200 to 500
      
      const rating = (Math.random() * (5.0 - 3.8) + 3.8).toFixed(1);
      const isVerified = Math.random() > 0.1; // 90% verified

      newDoctors.push({
        id,
        name: generateName(specialty),
        specialty,
        city,
        feeRangeMin: minFee,
        feeRangeMax: maxFee,
        rating: parseFloat(rating),
        nmcVerified: isVerified
      });
    }
  });
});

fs.writeFileSync(doctorsPath, JSON.stringify(newDoctors, null, 2));
console.log(`Updated doctors.json to contain ${newDoctors.length} doctors.`);
