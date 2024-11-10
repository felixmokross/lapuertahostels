import { Link } from "~/common/link";
import { Maintenance, Text } from "~/payload-types";

export type MaintenanceScreenProps = NonNullable<
  Maintenance["maintenanceScreen"]
>;

export function MaintenanceScreen({ message }: MaintenanceScreenProps) {
  return (
    <main className="flex h-screen flex-col items-center justify-center text-center">
      <p className="text-4xl font-light tracking-tighter text-neutral-800 sm:text-6xl">
        {(message as Text).text}
      </p>

      <Link to="/login">Login</Link>
    </main>
  );
}
