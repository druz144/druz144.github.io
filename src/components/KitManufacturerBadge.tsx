import { Badge } from "@mantine/core";
import { KitManufacturerName } from "./KitManufacturerName";

type Props = {
  name: string;
  size?: string;
};

export function KitManufacturerBadge({ name, size = "md" }: Props) {
  return (
    <Badge color="gray" variant="light" size={size} tt="none">
      <KitManufacturerName name={name} />
    </Badge>
  );
}
