import type { CatalogCategory } from "./catalog";

export type ManualLink = {
  label?: string;
  url: string;
};

export type Kit = {
  category?: CatalogCategory;
  id: string;
  name: string;
  type?: string;
  planeManufacturer: string;
  planeModel: string;
  kitManufacturer?: string;
  scale: string;
  priceEur?: number;
  manuals?: ManualLink[];
  images: string[];
};

export function getKitImageUrl(filename: string): string {
  return `${import.meta.env.BASE_URL}kits/${filename}`;
}

export const kits: Kit[] = [
  {
    id: "cfm56-7b_revell",
    name: "CFM56-7B engines for Boeing 737 NG",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "737 NG (-600/-700/-800/-900)",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/cfm56-7b-and-cfm56-7be-engines-for-boeing-737-ng-revell-zvezda-kits-in-1-144/",
      },
    ],
    images: [
      "cfm56-7b_revell/1_cov_B_R.jpg",
      "cfm56-7b_revell/2set_B.jpg",
      "cfm56-7b_revell/3dec_B.jpg",
    ],
  },
  {
    id: "cfm56-7b_zvezda",
    name: "CFM56-7B engines for Boeing 737 NG",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "737 NG (-600/-700/-800/-900)",
    kitManufacturer: "Zvezda",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/cfm56-7b-and-cfm56-7be-engines-for-boeing-737-ng-revell-zvezda-kits-in-1-144/",
      },
    ],
    images: [
      "cfm56-7b_zvezda/1cov_B_Z.jpg",
      "cfm56-7b_zvezda/2set_B.jpg",
      "cfm56-7b_zvezda/3dec_B.jpg",
    ],
  },
  {
    id: "cfm56-7be_revell",
    name: 'CFM56-7BE "evolution" engines for Boeing 737 NG',
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "737 NG (-600/-700/-800/-900)",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/cfm56-7b-and-cfm56-7be-engines-for-boeing-737-ng-revell-zvezda-kits-in-1-144/",
      },
    ],
    images: [
      "cfm56-7be_revell/1covBEfR.jpg",
      "cfm56-7be_revell/2setBEfR.jpg",
      "cfm56-7be_revell/3decBEfR.jpg",
    ],
  },
  {
    id: "cfm56-7be_zvezda",
    name: 'CFM56-7BE "evolution" engines for Boeing 737 NG',
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "737 NG (-600/-700/-800/-900)",
    kitManufacturer: "Zvezda",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/cfm56-7b-and-cfm56-7be-engines-for-boeing-737-ng-revell-zvezda-kits-in-1-144/",
      },
    ],
    images: [
      "cfm56-7be_zvezda/1covBEZ.jpg",
      "cfm56-7be_zvezda/2setBEZ.jpg",
      "cfm56-7be_zvezda/3decBEZ.jpg",
    ],
  },
  {
    id: "cfm56-3_b737",
    name: "CFM56-3 engines for Boeing 737-300/400/500",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "737-300/400/500",
    kitManufacturer: "Daco / Eastern Express / Minicraft",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/cfm56-3-engines-for-boeing-737-300-400-500-daco-ee-minicraft-kits-in-1-144-scale/",
      },
    ],
    images: [
      "cfm56-3_b737/1b3.jpg",
      "cfm56-3_b737/2b3.jpg",
      "cfm56-3_b737/3B3.jpg",
    ],
  },
  {
    id: "winglets_b737_revell",
    name: "Winglets for Boeing 737 Classic/NG",
    type: "winglet",
    planeManufacturer: "Boeing",
    planeModel: "737 Classic/NG",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 5,
    images: [
      "winglets_b737_revell/w7371.jpg",
      "winglets_b737_revell/w7372.jpg",
      "winglets_b737_revell/w7373.jpg",
    ],
  },
  {
    id: "jt9d_b747_early",
    name: "Pratt & Whitney JT9D engines for Boeing 747-100/200/300 (early pylons)",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "747-100/200/300",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/pw-jt9d-engines-with-the-early-pylons-in-1-144-scale-for-b747/",
      },
    ],
    images: [
      "jt9d_b747_early/1covEP.jpg",
      "jt9d_b747_early/2setEP.jpg",
      "jt9d_b747_early/3decEP.jpg",
    ],
  },
  {
    id: "jt9d_b747_late",
    name: "Pratt & Whitney JT9D engines for Boeing 747-100/200/300 (late pylons)",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "747-100/200/300",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/pw-jt9d-engines-in-1-144-scale-for-boeing-747-kits-conversion/",
      },
    ],
    images: [
      "jt9d_b747_late/1covLP.jpg",
      "jt9d_b747_late/2setLP.jpg",
      "jt9d_b747_late/3decLP.jpg",
    ],
  },
  {
    id: "jt9d_b747sp",
    name: "Pratt & Whitney JT9D engines — special edition for Eastern Express Boeing 747SP",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "747SP",
    kitManufacturer: "Eastern Express",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/special-edition-pw-jt9-engines-for-eastern-express-boeing-747sp-kit-in-1-144/",
      },
    ],
    images: [
      "jt9d_b747sp/1covSP.jpg",
      "jt9d_b747sp/2setSP.jpg",
      "jt9d_b747sp/3decSP.jpg",
    ],
  },
  {
    id: "cf6-50_b747",
    name: "General Electric CF6-50 engines for Boeing 747-100/200/300",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "747-100/200/300",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/ge-cf6-50-engines-in-1-144-scale-for-boeing-747-kits-conversion/",
      },
    ],
    images: [
      "cf6-50_b747/1covGE1.jpg",
      "cf6-50_b747/2setGE1.jpg",
      "cf6-50_b747/3decGE1.jpg",
    ],
  },
  {
    id: "rb211-524_b747_early",
    name: "Rolls-Royce RB211-524 early version engines for Boeing 747-100/200/300/SP",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "747-100/200/300/SP",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/rolls-royce-rb211-524-early-version-engines-in-1-144/",
      },
    ],
    images: [
      "rb211-524_b747_early/1covRRS.jpg",
      "rb211-524_b747_early/2setRRS.jpg",
      "rb211-524_b747_early/3decRRS.jpg",
    ],
  },
  {
    id: "pw4000_b747",
    name: "Pratt & Whitney PW4000 series engines for Boeing 747-400",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "747-400",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/pw-4000-series-engines-for-boeing-747-400-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "cf6-80c2_b747",
    name: "General Electric CF6-80C2 engines for Boeing 747-400",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "747-400",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/ge-cf6-80c2-engines-in-1-144-scale-for-boeing-747-400-etc/",
      },
    ],
    images: [],
  },
  {
    id: "rb211-524_b747_late",
    name: "Rolls-Royce RB211-524 late version engines for Boeing 747-400",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "747-400",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/rolls-royce-rb211-524-engines-for-boeing-747-400-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "nose_b747",
    name: "Nose section for Boeing 747-400 w/o interior",
    type: "nose",
    planeManufacturer: "Boeing",
    planeModel: "747-400",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 19,
    images: ["nose_b747/nb1.jpg"],
  },
  {
    id: "nose_b747_interior",
    name: "Nose section for Boeing 747-400 with cockpit interior and pilots",
    type: "nose",
    planeManufacturer: "Boeing",
    planeModel: "747-400",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/nose-section-for-boeing-747-400-kits-revell-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "rb211-535e4_b757",
    name: 'Rolls-Royce RB211-535 E4 "late" engines for Boeing 757',
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "757",
    kitManufacturer: "Zvezda",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/rr-rb-211-535-e4-late-engines-for-boeing-757-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "rb211-535c_b757",
    name: 'Rolls-Royce RB211-535 C "early" engines for Boeing 757',
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "757",
    kitManufacturer: "Zvezda",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/rolls-royce-rb-211-535-c-early-engines-for-boeing-757-in-1-144/",
      },
    ],
    images: [],
  },
  {
    id: "pw2000_b757",
    name: "Pratt & Whitney PW2000 engines for Boeing 757",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "757",
    kitManufacturer: "Zvezda",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/pratt-whitney-pw-2000-engines-for-boeing-757-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "pw_b767",
    name: "Pratt & Whitney engines for Boeing 767 (all PW versions)",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "767",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/pratt-whitney-engines-for-boeing-767-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "cf6-80c2_b767",
    name: "General Electric CF6-80C2 engines for Boeing 767",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "767",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/ge-cf6-80c2-engines-for-boeing-767-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "rb211-524_b767",
    name: "Rolls-Royce RB211-524 engines for Boeing 767",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "767",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/rolls-royce-rb211-524-engines-for-boeing-767-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "winglets_b767",
    name: "Winglets set for Boeing 767",
    type: "winglet",
    planeManufacturer: "Boeing",
    planeModel: "767",
    scale: "1/144",
    priceEur: 7,
    manuals: [
      {
        label: "Instagram",
        url: "https://www.instagram.com/p/C_LXWQ0CyRC/?img_index=1",
      },
    ],
    images: [],
  },
  {
    id: "ge90_b777",
    name: "General Electric GE90 engines for Boeing 777 (all 70/80/90 series)",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "777",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/ge-90-engines-for-boeing-777-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "fans_spinners_decals_b777",
    name: "Fans, spinners and decals for Boeing 777-300ER",
    type: "fans",
    planeManufacturer: "Boeing",
    planeModel: "777-300ER",
    kitManufacturer: "Revell / Zvezda",
    scale: "1/144",
    priceEur: 9,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/fans-spinners-and-decals-for-revell-zvezda-boeing-777-300er-kits/",
      },
    ],
    images: [],
  },
  {
    id: "trent800_b777",
    name: "Rolls-Royce Trent 800 engines for Boeing 777",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "777",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/rr-trent-800-engines-for-boeing-777-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "pw4000_b777",
    name: "Pratt & Whitney PW4000 engines for Boeing 777 (all PW versions)",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "777",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/pw-4000-engines-for-boeing-777-kits-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "genx-1b_b787",
    name: "GEnx-1B engines for Boeing 787 Dreamliner",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "787 Dreamliner",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/genx-1b-engines-for-boeing-787-dreamliner-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "cf6-80c2_a300_a310",
    name: "General Electric CF6-80C2 engines for Airbus A300 / A300 ST Beluga / A310",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A300 / A300 ST Beluga / A310",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/ge-cf6-80c2-engines-for-airbus-a300-a300-st-beluga-a310-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "pw_a310",
    name: "Pratt & Whitney engines for Airbus A310 (all PW versions)",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A310",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/pratt-whitney-engines-for-airbus-a310-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "cfm56-5a_a320_revell",
    name: "CFM56-5A engines for Airbus A319/320/321",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A319/320/321",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/cfm56-5a-engines-for-a319-320-321-revell-zvezda-kits-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "cfm56-5a_a320_zvezda",
    name: "CFM56-5A engines for Airbus A319/320/321",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A319/320/321",
    kitManufacturer: "Zvezda",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/cfm56-5a-engines-for-a319-320-321-revell-zvezda-kits-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "cfm56-5b_a320_revell",
    name: "CFM56-5B engines for Airbus A319/320/321",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A319/320/321",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/cfm56-5b-engines-for-a319-320-321-revell-zvezda-kits-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "cfm56-5b_a320_zvezda",
    name: "CFM56-5B engines for Airbus A319/320/321",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A319/320/321",
    kitManufacturer: "Zvezda",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/cfm56-5b-engines-for-a319-320-321-revell-zvezda-kits-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "v2500_a320_revell",
    name: "IAE V2500 engines for Airbus A319/320/321",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A319/320/321",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/iae-v2500-engines-for-a319-320-321-revell-zvezda-kits-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "v2500_a320_zvezda",
    name: "IAE V2500 engines for Airbus A319/320/321",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A319/320/321",
    kitManufacturer: "Zvezda",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/iae-v2500-engines-for-a319-320-321-revell-zvezda-kits-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "leap-1a_a320_revell",
    name: "LEAP-1A engines for Airbus A319/320/321",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A319/320/321 neo",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/leap-1a-engines-for-a319-320-321-neo-revell-zvezda-kits-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "leap-1a_a320_zvezda",
    name: "LEAP-1A engines for Airbus A319/320/321",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A319/320/321 neo",
    kitManufacturer: "Zvezda",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/leap-1a-engines-for-a319-320-321-neo-revell-zvezda-kits-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "pw1100g_a320_revell",
    name: "PW1100G engines for Airbus A319/320/321",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A319/320/321 neo",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/pw-1100g-engines-for-a319-320-321-neo-revell-zvezda-kits-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "pw1100g_a320_zvezda",
    name: "PW1100G engines for Airbus A319/320/321",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A319/320/321 neo",
    kitManufacturer: "Zvezda",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/pw-1100g-engines-for-a319-320-321-neo-revell-zvezda-kits-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "nose_a330_a340",
    name: "Nose section for Airbus A330/340",
    type: "nose",
    planeManufacturer: "Airbus",
    planeModel: "A330/340",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 19,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/replacement-parts-for-revell-a330-340-kits/",
      },
    ],
    images: [],
  },
  {
    id: "winglets_a330_a340",
    name: "Winglets set for Airbus A330/340",
    type: "winglet",
    planeManufacturer: "Airbus",
    planeModel: "A330/340",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 5,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/replacement-parts-for-revell-a330-340-kits/",
      },
    ],
    images: [],
  },
  {
    id: "trent700_a330_revell",
    name: "Rolls-Royce Trent 700 engines for Airbus A330",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A330",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/rolls-royce-trent-700-engines-for-airbus-a-330-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "trent700_a330_zvezda",
    name: "Rolls-Royce Trent 700 engines for Airbus A330",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A330",
    kitManufacturer: "Zvezda",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/rolls-royce-trent-700-engines-for-airbus-a-330-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "cf6-80e1_a330_revell",
    name: "General Electric CF6-80E1 engines for Airbus A330",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A330",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/ge-cf6-80e1-engines-for-airbus-a-330-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "cf6-80e1_a330_zvezda",
    name: "General Electric CF6-80E1 engines for Airbus A330",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A330",
    kitManufacturer: "Zvezda",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/ge-cf6-80e1-engines-for-airbus-a-330-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "cfm56-5c_a340",
    name: "CFM56-5C engines for Airbus A340",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A340",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/cfm56-5c-engines-for-a340-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "trent_xwb_a350_revell",
    name: "Rolls-Royce Trent XWB engines for Airbus A350",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A350",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/rr-trent-xwb-engines-for-airbus-a350-revell-zvezda-kits-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "trent_xwb_a350_zvezda",
    name: "Rolls-Royce Trent XWB engines for Airbus A350",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A350",
    kitManufacturer: "Zvezda",
    scale: "1/144",
    priceEur: 29,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/rr-trent-xwb-engines-for-airbus-a350-revell-zvezda-kits-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "trent900_a380",
    name: "Rolls-Royce Trent 900 engines for Airbus A380",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A380",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 39,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/rr-trent-900-engines-for-airbus-a-380-revell-kits-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "gp7200_a380",
    name: "GP7200 engines for Airbus A380",
    type: "engine",
    planeManufacturer: "Airbus",
    planeModel: "A380",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 39,
    manuals: [
      {
        label: "Instagram",
        url: "https://www.instagram.com/p/DOJmGeiDHJT/?img_index=1",
      },
    ],
    images: [],
  },
  {
    id: "flap_trap_a380",
    name: "Flap trap fairings for Airbus A380",
    type: "fairing",
    planeManufacturer: "Airbus",
    planeModel: "A380",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 19,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/flap-trap-fairings-for-revell-a-380-kits-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "cf6-50_dc10-30",
    name: "General Electric CF6-50 early versions engines for DC-10-30 (CF6-50A/C/C1)",
    type: "engine",
    planeManufacturer: "McDonnell Douglas",
    planeModel: "DC-10-30",
    scale: "1/144",
    priceEur: 27,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/cf6-50-early-versions-engines-for-dc-10-30-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "cf6-6_dc10-10",
    name: "General Electric CF6-6 engines for DC-10-10 (early and late versions)",
    type: "engine",
    planeManufacturer: "McDonnell Douglas",
    planeModel: "DC-10-10",
    scale: "1/144",
    priceEur: 27,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/ge-cf-6-6-engines-for-dc-10-10-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "pw4000_md11",
    name: "Pratt & Whitney PW4000 series engines for MD-11",
    type: "engine",
    planeManufacturer: "McDonnell Douglas",
    planeModel: "MD-11",
    scale: "1/144",
    priceEur: 27,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/pw-4000-series-engines-for-md-11-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "cf6-80c2_md11",
    name: "General Electric CF6-80C2 engines for MD-11",
    type: "engine",
    planeManufacturer: "McDonnell Douglas",
    planeModel: "MD-11",
    scale: "1/144",
    priceEur: 27,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/ge-cf-6-80c2-engines-for-md-11-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "cf6-80c2_c5m",
    name: "General Electric CF6-80C2 engines for C-5M Super Galaxy",
    type: "engine",
    planeManufacturer: "Lockheed",
    planeModel: "C-5M Super Galaxy",
    scale: "1/144",
    priceEur: 33,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/ge-cf-6-80c2-engines-for-c-5m-super-galaxy-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "rb211-524_l1011",
    name: "Rolls-Royce RB211-524 engines for Lockheed L-1011 TriStar",
    type: "engine",
    planeManufacturer: "Lockheed",
    planeModel: "L-1011 TriStar",
    scale: "1/144",
    priceEur: 27,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/rolls-royce-rb-211-524-engines-for-lockheed-l-1011-tristar-1-144/",
      },
    ],
    images: [],
  },
  {
    id: "nk-8_il62",
    name: "Kuznetsov NK-8 engines for Ilyushin IL-62 (early IL-62s, except IL-62M)",
    type: "engine",
    planeManufacturer: "Ilyushin",
    planeModel: "IL-62",
    scale: "1/144",
    priceEur: 27,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/kuznetsov-nk-8-engines-for-ilyushin-il-62-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "pd-14_mc21",
    name: "PD-14 engines for MC-21",
    type: "engine",
    planeManufacturer: "Irkut",
    planeModel: "MC-21",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/pd-14-engines-for-mc-21-in-1-144-scale/",
      },
    ],
    images: [],
  },
  {
    id: "fans_spinners_cf6-80c2",
    name: "Fans & spinners for General Electric CF6-80C2 engines (A300B4 / Beluga / A310)",
    type: "fans",
    planeManufacturer: "Airbus",
    planeModel: "A300B4 / A300B4-608ST Beluga / A310",
    scale: "1/144",
    priceEur: 9,
    images: [],
  },
  {
    id: "intake_exhaust_il86",
    name: "Engine intake and exhaust set for Ilyushin IL-86",
    type: "accessory",
    planeManufacturer: "Ilyushin",
    planeModel: "IL-86",
    kitManufacturer: "Zvezda",
    scale: "1/144",
    priceEur: 9,
    images: [],
  },
  {
    id: "rb211-524_b747_early_1-200",
    name: "Rolls-Royce RB211-524 early version engines for Boeing 747-100/200/300/SP",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "747-100/200/300/SP",
    scale: "1/200",
    priceEur: 27,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/early-rr-rb-211-524-engines-in-1-200-scale-for-b747-announcement/",
      },
    ],
    images: [],
  },
  {
    id: "rb211-524_b747_late_1-200",
    name: "Rolls-Royce RB211-524 late version engines for Boeing 747-400",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "747-400",
    scale: "1/200",
    priceEur: 27,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/rr-rb211-524-engines-for-boeing-747-400-in-1-200-scale/",
      },
    ],
    images: [],
  },
  {
    id: "rb211-524_b767_1-200",
    name: "Rolls-Royce RB211-524 engines for Boeing 767",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "767",
    scale: "1/200",
    priceEur: 22,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/rolls-royce-rb211-524-engines-for-boeing-767-in-1-200-scale/",
      },
    ],
    images: [],
  },
  {
    id: "cf6-80c2_b747_1-200",
    name: "General Electric CF6-80C2 engines for Boeing 747-400",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "747-400",
    scale: "1/200",
    priceEur: 27,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/ge-cf6-80c2-engines-for-boeing-747-400-in-1-200-scale/",
      },
    ],
    images: [],
  },
  {
    id: "cf6-80c2_b767_1-200",
    name: "General Electric CF6-80C2 engines for Boeing 767",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "767",
    scale: "1/200",
    priceEur: 22,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/ge-cf6-80c2-engines-for-boeing-767-in-1-200-scale/",
      },
    ],
    images: [],
  },
];

export const kitsById: Record<string, Kit> = Object.fromEntries(
  kits.map((kit) => [kit.id, kit]),
);
