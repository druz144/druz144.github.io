export type ManualLink = {
  label?: string;
  url: string;
};

export type Kit = {
  id: string;
  name: string;
  type?: string;
  planeManufacturer: string;
  planeModel: string;
  kitManufacturer?: string;
  scale: string;
  priceEur?: number;
  manuals?: ManualLink[];
  image: string;
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
    planeModel: "737 NG (737-600/-700/-800/-900)",
    kitManufacturer: "Revell",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/cfm56-7b-and-cfm56-7be-engines-for-boeing-737-ng-revell-zvezda-kits-in-1-144/",
      },
    ],
    image: "0b7-2.jpg",
  },
  {
    id: "cfm56-7b_zvezda",
    name: "CFM56-7B engines for Boeing 737 NG",
    type: "engine",
    planeManufacturer: "Boeing",
    planeModel: "737 NG (737-600/-700/-800/-900)",
    kitManufacturer: "Zvezda",
    scale: "1/144",
    priceEur: 24,
    manuals: [
      {
        label: "Airliner Cafe",
        url: "https://airlinercafe.com/forums/topic/cfm56-7b-and-cfm56-7be-engines-for-boeing-737-ng-revell-zvezda-kits-in-1-144/",
      },
    ],
    image: "0b7-2.jpg",
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
    image: "1w7.jpg",
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
    image: "nb1.jpg",
  },
];
