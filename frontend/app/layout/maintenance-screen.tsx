import { Maintenance, Text } from "~/payload-types";

export type MaintenanceScreenProps = NonNullable<
  Maintenance["maintenanceScreen"]
>;

export function MaintenanceScreen({ message }: MaintenanceScreenProps) {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br text-center text-4xl font-light tracking-tighter text-neutral-800 sm:text-6xl">
      {(message as Text).text}
    </div>
  );
}
