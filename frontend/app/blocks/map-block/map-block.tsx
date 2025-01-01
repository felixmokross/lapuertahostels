import { Page } from "~/payload-types";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useEnvironment } from "~/environment";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useTheme } from "~/themes";
import { cn } from "~/common/cn";
import { Link } from "~/common/link";
import { MapPinIcon } from "@heroicons/react/20/solid";
import {
  mapToGoogleMapsLanguage,
  Place,
  PlaceResolver,
} from "~/common/google-maps";
import { OverlayTextBox } from "../common/overlay-text-box";

type Poi = { location: google.maps.LatLngLiteral };

type MapBlockType = NonNullable<Page["layout"]>[number] & {
  blockType: "Map";
};

export type MapBlockProps = MapBlockType;

export function MapBlock({ elementId, region, ...props }: MapBlockProps) {
  const { googleMapsApiKey } = useEnvironment();
  const { i18n } = useTranslation();
  return (
    <div
      className="my-44 flex flex-col-reverse gap-4 lg:relative lg:h-[35rem]"
      id={elementId || undefined}
    >
      <APIProvider
        apiKey={googleMapsApiKey}
        language={mapToGoogleMapsLanguage(i18n.language)}
        region={region}
      >
        <MapContent {...props} />
      </APIProvider>
    </div>
  );
}

type MapContentProps = Omit<MapBlockType, "elementId" | "region">;

function MapContent({
  address,
  zoomLevel,
  mapId,
  overlayTextBox,
}: MapContentProps) {
  const placesLibrary = useMapsLibrary("places");
  const [place, setPlace] = useState<Place>();
  const [hasTilesLoaded, setHasTilesLoaded] = useState(false);

  useEffect(() => {
    if (place || !placesLibrary) return;

    (async function () {
      setPlace(await new PlaceResolver(placesLibrary).resolvePlace(address));
    })();
  }, [placesLibrary, place, address]);

  if (!place) {
    return <div className="h-[35rem] animate-pulse bg-white lg:h-full"></div>;
  }

  return (
    <>
      <Map
        onTilesLoaded={() => setHasTilesLoaded(true)}
        disableDefaultUI={true}
        keyboardShortcuts={false}
        gestureHandling="none"
        clickableIcons={false}
        mapId={mapId}
        colorScheme="LIGHT"
        zoom={zoomLevel}
        defaultCenter={place.location}
        className={cn(
          hasTilesLoaded ? "opacity-100" : "opacity-0",
          "h-[35rem] transition-opacity duration-1000 ease-in-out lg:h-full",
        )}
      >
        <PoiMarker poi={{ location: place.location }} />
      </Map>

      {overlayTextBox &&
        typeof overlayTextBox.heading === "object" &&
        typeof overlayTextBox.text === "object" && (
          <OverlayTextBox
            position="top-left"
            heading={overlayTextBox.heading}
            text={overlayTextBox.text}
            cta={
              overlayTextBox.callToActionLabel &&
              typeof overlayTextBox.callToActionLabel === "object"
                ? {
                    icon: MapPinIcon,
                    label: overlayTextBox.callToActionLabel,
                    as: Link,
                    variant: "secondary",
                    to: place.url,
                  }
                : undefined
            }
          />
        )}
    </>
  );
}

function PoiMarker({ poi }: { poi: Poi }) {
  const theme = useTheme();
  return (
    <AdvancedMarker position={poi.location}>
      <Pin
        background={theme.mapPinCssColors.background}
        glyphColor={theme.mapPinCssColors.glyph}
        borderColor={theme.mapPinCssColors.border}
      />
    </AdvancedMarker>
  );
}
