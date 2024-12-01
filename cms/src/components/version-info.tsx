import packageJson from "../../package.json";
import { Pill } from "@payloadcms/ui";

export function VersionInfo() {
  return (
    <div className="tw-mx-auto tw-mb-8">
      <Pill pillStyle="light-gray" rounded>
        v{packageJson.version}
      </Pill>
    </div>
  );
}
