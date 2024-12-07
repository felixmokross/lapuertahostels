"use client";

import { Button, useDocumentInfo, useForm, useLocale } from "@payloadcms/ui";
import { useState } from "react";
import { updateAltText } from "./generate-alt-text-action";
import { TypedLocale } from "payload";

export function GenerateAltTextButton() {
  const [isGenerating, setIsGenerating] = useState(false);
  const locale = useLocale();
  const { id } = useDocumentInfo();
  if (typeof id !== "string") throw new Error("Expected id to be a string");
  return (
    <Button
      size="medium"
      onClick={async () => {
        setIsGenerating(true);

        await updateAltText(id, locale.code as TypedLocale);
        try {
        } finally {
          setIsGenerating(false);
        }
      }}
    >
      {isGenerating ? "Generating…" : "Generate"}
    </Button>
  );
}
