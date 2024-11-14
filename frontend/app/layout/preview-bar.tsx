import {
  ArrowRightStartOnRectangleIcon,
  WrenchIcon,
} from "@heroicons/react/16/solid";
import { Form } from "@remix-run/react";
import { Button } from "~/common/button";
import { cn } from "~/common/cn";
import { Link } from "~/common/link";
import { Paragraph } from "~/common/paragraph";
import { useEnvironment } from "~/environment";
import { useTheme } from "~/themes";

export type PreviewBarProps = {
  className?: string;
};

export function PreviewBar({ className }: PreviewBarProps) {
  const theme = useTheme();
  const { payloadCmsBaseUrl } = useEnvironment();
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-8 border-t border-neutral-300 bg-neutral-800 bg-opacity-90 px-4 py-4 backdrop-blur-sm",
        theme.lightBackgroundColor,
        className,
      )}
    >
      <Paragraph size="small" variant="white">
        The website is currently in maintenance mode and not accessible
        publicly. You are viewing a preview of the website.
      </Paragraph>
      <div className="flex gap-4">
        <Button
          size="small"
          as={Link}
          to={payloadCmsBaseUrl}
          variant="primary"
          icon={WrenchIcon}
        >
          Manage Content…
        </Button>
        <Form action="/logout" className="contents" method="POST">
          <Button
            type="submit"
            size="small"
            icon={ArrowRightStartOnRectangleIcon}
          >
            Log Out
          </Button>
        </Form>
      </div>
    </div>
  );
}
