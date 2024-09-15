import defaultProfile from "./profileLink";
const imgLink = "https://naamist.mist.ac.bd/api/images/";
const allMembers = [
  {
    id: 11,
    studentId: "201324011",
    name: "Aritra Kumar Saha",
    gender: "Male",
    phone: "1821701027",
    email: "aritrasaha10@gmail.com",
    workSector: "Research Assistant, Yokohama National University",
    jobType: "Academician", // Adding the relevant sector
    batch: "01",
    imageUrl: `${imgLink}aritra_kumar_saha_name01.png`,
    workSectorType: "Higher Study", // New field added
  },
  {
    id: 12,
    studentId: "201324012",
    name: "Md. Rabab Raiyatur Rahaman",
    gender: "Male",
    phone: "1684330519",
    email: "rabab.rahman148@gmail.com",
    workSector: "Analyst, CET, Standard Chartered Bangladesh",
    batch: "01",
    imageUrl: `${imgLink}RababRaiyaturRahaman_name01.jpg`,
    workSectorType: "Private", // New field added
  },
  {
    id: 14,
    studentId: "201324014",
    name: "Md. Sakib-Ul-Alam",
    gender: "Male",
    phone: "1676259099",
    email: "shohan572@gmail.com",
    workSector: "Marine Surveyor, BV",
    batch: "01",
    imageUrl: `${imgLink}sakib_ul_alam_name01.png`,
    workSectorType: "Private", // New field added
  },
  {
    id: 15,
    studentId: "201324015",
    name: "Reyana Islam",
    gender: "Female",
    phone: "1688414106",
    email: "reyanaislam@gmail.com",
    workSector: "GTA, Yokohama National University",
    batch: "01",
    imageUrl: `${imgLink}reyana_islam_name01.png`,
    workSectorType: "Higher Study", // New field added
  },
  {
    id: 16,
    studentId: "201324016",
    name: "Abdullah His Saad",
    gender: "Male",
    phone: "1621449494",
    email: "ahsaad7881@yahoo.com",
    workSector: "AD (General), Bangladesh Bank LTD.",
    batch: "01",
    imageUrl: `${imgLink}AbdullahHisSaad_name01.jpg`,
    workSectorType: "Government", // New field added
  },
  {
    id: 17,
    studentId: "201324017",
    name: "Rajia Sultana Kamol",
    gender: "Female",
    phone: "1676714924",
    email: "rajiaakamol17@gmail.com",
    workSector: "GTA, TU Bergakademie Freiberg",
    batch: "01",
    imageUrl: `${imgLink}RajiaSultanaKamol_name01.jpg`,
    workSectorType: "Higher Study", // New field added
  },
  {
    id: 18,
    studentId: "201324018",
    name: "Kaniza Fatema Bristy",
    gender: "Female",
    phone: "1764623623",
    email: "kanizjulia22@gmail.com",
    batch: "01",
    workSector: "Naval Engineer, Saipem, France",
    imageUrl: `${imgLink}KanizaFatemaBristy_name01.png`,
    workSectorType: "Private", // New field added
  },
  {
    id: 19,
    studentId: "201324019",
    name: "Kazi Shakib Ahasan",
    gender: "Male",
    phone: "1686817033",
    email: "sakibahsan9@gmail.com",
    batch: "01",
    workSector: "Project Specialist (Marine), Islamic Development Bank",
    imageUrl: defaultProfile,
    workSectorType: "Private", // New field added
  },
  {
    id: 20,
    studentId: "201324020",
    name: "Muhammad Azharul Hannan",
    gender: "Male",
    phone: "1773245058",
    email: "hannanazharul1993@gmail.com",
    workSector: "Civil",
    batch: "01",
    imageUrl: `${imgLink}KaziShakibAhasan_name01.jpg`,
    workSectorType: "Government", // New field added
  },
];


export default allMembers;