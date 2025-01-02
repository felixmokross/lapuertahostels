import { useLivePreview } from "@payloadcms/live-preview-react";
import { ReactNode } from "react";
import { useEnvironment } from "~/common/environment";

export type OptInLivePreviewProps<TData> = {
  path: string;
  data: TData;
  children: (data: TData) => ReactNode;
};

export function OptInLivePreview<TData>({
  children,
  path,
  data,
}: OptInLivePreviewProps<TData>) {
  const { preview } = useEnvironment();

  return preview === path ? (
    <LivePreview data={data}>{children}</LivePreview>
  ) : (
    children(data)
  );
}

type LivePreviewProps<TData> = {
  data: TData;
  children: (data: TData) => ReactNode;
};

function LivePreview<T>({ data, children }: LivePreviewProps<T>) {
  const { payloadCmsBaseUrl } = useEnvironment();
  const { data: livePreviewData } = useLivePreview({
    initialData: data,
    serverURL: payloadCmsBaseUrl,
  });

  return children(livePreviewData);
}
