import classes from "./KitManufacturerName.module.css";

export function KitManufacturerName({ name }: { name: string }) {
  return name.split(/(\bRevell\b|\bZvezda\b)/gi).map((part, index) => {
    const manufacturer = part.toLowerCase();
    if (manufacturer !== "revell" && manufacturer !== "zvezda") return part;

    return (
      <strong key={index} className={classes[manufacturer]}>
        {part}
      </strong>
    );
  });
}
