import { Page } from "~/payload-types";
import {
  AdvancedMarker,
  Map,
  Pin,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { useTheme } from "~/themes";
import { cn } from "~/common/cn";
import { Link } from "~/common/link";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { Place, PlaceResolver } from "~/common/google-maps";
import { OverlayTextBox } from "../common/overlay-text-box";

type Poi = { location: google.maps.LatLngLiteral };

type MapBlockType = NonNullable<Page["layout"]>[number] & {
  blockType: "Map";
};

export type MapBlockProps = MapBlockType;

export function MapBlock({
  elementId,
  address,
  zoomLevel,
  mapId,
  overlayTextBox,
}: MapBlockProps) {
  const placesLibrary = useMapsLibrary("places");
  const [place, setPlace] = useState<Place>();

  useEffect(() => {
    if (place || !placesLibrary) return;

    (async function () {
      setPlace(await new PlaceResolver(placesLibrary).resolvePlace(address));
    })();
  }, [placesLibrary, place, address]);

  return (
    <div
      id={elementId || undefined}
      className={cn(
        "my-44 overflow-hidden bg-neutral-100",
        !place && "animate-pulse",
      )}
    >
      <div
        className={cn(
          "flex flex-col-reverse gap-4 transition duration-1000 ease-in-out lg:relative lg:h-[35rem]",
          place ? "scale-100 opacity-100" : "scale-105 opacity-0",
        )}
      >
        <div className={cn("h-[35rem] lg:h-full")}>
          {place && (
            <Map
              disableDefaultUI={true}
              keyboardShortcuts={false}
              gestureHandling="none"
              clickableIcons={false}
              mapId={mapId}
              colorScheme="LIGHT"
              zoom={zoomLevel}
              defaultCenter={place.location}
            >
              <PoiMarker poi={{ location: place.location }} />
            </Map>
          )}
        </div>

        {overlayTextBox &&
          place &&
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
      </div>
    </div>
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
