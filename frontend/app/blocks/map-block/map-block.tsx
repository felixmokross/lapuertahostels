import { Page, Text } from "~/payload-types";
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
import { Heading } from "~/common/heading";
import { RichTextParagraph } from "~/common/paragraph";
import { RichTextObject } from "~/common/rich-text";
import { Button } from "~/common/button";
import { Link } from "~/common/link";
import { MapPinIcon } from "@heroicons/react/20/solid";
import {
  mapToGoogleMapsLanguage,
  Place,
  PlaceResolver,
} from "~/common/google-maps";

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
      className="my-44 flex flex-col-reverse gap-4 md:relative md:h-[35rem]"
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
    return <div className="h-[35rem] animate-pulse bg-white md:h-full"></div>;
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
          "h-[35rem] transition-opacity duration-1000 ease-in-out md:h-full",
        )}
      >
        <PoiMarker poi={{ location: place.location }} />
      </Map>

      {overlayTextBox && (
        <div
          className={cn(
            "w-full bg-white px-6 pb-6 pt-3 text-center md:absolute md:left-12 md:top-12 md:w-auto md:max-w-md md:rounded-md md:px-8 md:pb-8 md:pt-5 md:text-left md:shadow-lg xl:left-20 xl:top-20",
          )}
        >
          <Heading as="h3" size="small">
            {(overlayTextBox.heading as Text).text}
          </Heading>
          <RichTextParagraph className="mt-2">
            {
              (overlayTextBox.text as Text)
                .richText as unknown as RichTextObject
            }
          </RichTextParagraph>
          {overlayTextBox.callToActionLabel && (
            <Button
              icon={MapPinIcon}
              as={Link}
              to={place.url}
              variant="secondary"
              className="mt-4"
            >
              {(overlayTextBox.callToActionLabel as Text).text}
            </Button>
          )}
        </div>
      )}
    </>
  );
}

const PoiMarker = ({ poi }: { poi: Poi }) => {
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
};
