import { Fragment } from "react";
import { Button } from "../common/button";
import { BrandLogo } from "../common/brand-logo";
import { Brand, Common } from "~/payload-types";
import { useTranslation } from "react-i18next";
import { socials } from "~/common/socials";
import { Link } from "../common/link";
import { useTheme } from "~/themes";
import { PageLink } from "~/common/page-link";

type FooterProps = {
  content: Common["footer"];
  brand: Brand;
  allBrands: Brand[];
};

export function Footer({ content, brand, allBrands }: FooterProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const puertaBrand = allBrands.find((b) => b.id === "puerta");
  if (!puertaBrand) throw new Error("Puerta brand not found");
  return (
    <footer
      className={`mt-40 ${theme.lightBackgroundColor}`}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        {t("footer.heading")}
      </h2>
      <div className="mx-auto max-w-5xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <h6 className="mt-2">
              <Link to={puertaBrand.homeLinkUrl}>
                <BrandLogo size="small" brand={puertaBrand} />
              </Link>
            </h6>
            <p className="text-sm leading-6 text-neutral-600">
              {content.address.split("\n").map((line, index, allLines) => (
                <Fragment key={index}>
                  {line}
                  {index < allLines.length - 1 && <br />}
                </Fragment>
              ))}
            </p>
            <div className="flex space-x-6">
              {content.socialLinks?.map((socialLink) => {
                const social = socials[socialLink.platform];
                return (
                  <a
                    key={socialLink.platform}
                    href={socialLink.url}
                    className="text-neutral-400 hover:text-neutral-500"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="sr-only">{social.name}</span>
                    <social.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 xl:col-span-2 xl:mt-0">
            {brand.footer?.linkGroups?.map((linkGroup) => {
              if (typeof linkGroup !== "object") {
                throw new Error("Invalid link group");
              }

              if (typeof linkGroup.title !== "object") {
                throw new Error("Invalid link group title");
              }
              return (
                <div key={linkGroup.id}>
                  <h3 className="text-sm font-semibold leading-6 text-neutral-900">
                    {linkGroup.title.text}
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {linkGroup.links?.map((link) => {
                      if (typeof link !== "object") {
                        throw new Error("Invalid link");
                      }
                      return (
                        <li key={link.id}>
                          <PageLink
                            label={link.label}
                            link={link.link}
                            className="text-sm leading-6 text-neutral-600 hover:text-neutral-900"
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {content.newsletter && content.newsletter.show && (
          <div className="mt-16 border-t border-neutral-900/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-neutral-900">
                {content.newsletter.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {content.newsletter.description}
              </p>
            </div>
            <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
              <label htmlFor="email-address" className="sr-only">
                {t("footer.newsletter.emailLabel")}
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-puerta-600 sm:w-56 sm:text-sm sm:leading-6"
                placeholder={content.newsletter.emailPlaceholder || ""}
              />
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <Button
                  size="small"
                  type="submit"
                  className="flex h-full w-full items-center justify-center"
                >
                  {content.newsletter.buttonLabel}
                </Button>
              </div>
            </form>
          </div>
        )}
        <div className="mt-8 border-t border-neutral-900/10 pt-8 sm:mt-10 lg:mt-12">
          <p className="text-xs leading-5 text-neutral-500">
            &copy; {new Date().getFullYear()} {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
