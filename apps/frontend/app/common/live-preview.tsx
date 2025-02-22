import { useLivePreview } from "@payloadcms/live-preview-react";
import { ReactNode } from "react";
import { useEnvironment } from "~/common/environment";

export type OptInLivePreviewProps<TData> = {
  path: string;
  data: TData;
  depth: number;
  children: (data: TData) => ReactNode;
};

export function OptInLivePreview<TData>({
  children,
  path,
  data,
  depth,
}: OptInLivePreviewProps<TData>) {
  const { preview } = useEnvironment();

  return preview === path ? (
    <LivePreview data={data} depth={depth}>
      {children}
    </LivePreview>
  ) : (
    children(data)
  );
}

type LivePreviewProps<TData> = {
  data: TData;
  depth: number;
  children: (data: TData) => ReactNode;
};

function LivePreview<T>({ data, depth, children }: LivePreviewProps<T>) {
  const { payloadCmsBaseUrl } = useEnvironment();
  const { data: livePreviewData } = useLivePreview({
    initialData: data,
    serverURL: payloadCmsBaseUrl,
    depth,
  });

  return children(livePreviewData);
}
