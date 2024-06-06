import { Maintenance } from "~/payload-types";

export type MaintenanceScreenProps = NonNullable<
  Maintenance["maintenanceScreen"]
>;

export function MaintenanceScreen({ message }: MaintenanceScreenProps) {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br text-6xl font-light tracking-tighter text-neutral-800">
      {message}
    </div>
  );
}
