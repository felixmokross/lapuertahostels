import {
  ArrowRightStartOnRectangleIcon,
  WrenchIcon,
} from "@heroicons/react/16/solid";
import { Form } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { Button } from "~/common/button";
import { cn } from "~/common/cn";
import { Link } from "~/common/link";
import { Paragraph } from "~/common/paragraph";
import { useEnvironment } from "~/environment";

export type PreviewBarProps = {
  className?: string;
  adminLocale: string;
};

export function PreviewBar({ className, adminLocale }: PreviewBarProps) {
  const { t } = useTranslation(undefined, { lng: adminLocale });
  const { payloadCmsBaseUrl } = useEnvironment();
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-8 border-t border-neutral-300 bg-neutral-800 bg-opacity-90 px-4 py-4 backdrop-blur-sm",
        className,
      )}
    >
      <Paragraph size="small" variant="white">
        {t("previewBar.message")}
      </Paragraph>
      <div className="flex gap-4">
        <Button
          size="small"
          as={Link}
          to={payloadCmsBaseUrl}
          variant="primary"
          icon={WrenchIcon}
        >
          {t("previewBar.manageContent")}
        </Button>
        <Form action="/logout" className="contents" method="POST">
          <Button
            type="submit"
            size="small"
            icon={ArrowRightStartOnRectangleIcon}
          >
            {t("previewBar.logOut")}
          </Button>
        </Form>
      </div>
    </div>
  );
}
