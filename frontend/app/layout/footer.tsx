import { Button } from "../common/button";
import { BrandLogo } from "../common/brand-logo";
import { Brand, Common, Text } from "~/payload-types";
import { useTranslation } from "react-i18next";
import { socials } from "~/common/socials";
import { useTheme } from "~/themes";
import { PageLink } from "~/common/page-link";
import { RichTextObject } from "~/common/rich-text.model";
import { Input } from "~/common/input";
import { ReactNode } from "react";
import { gracefully } from "~/common/utils";
import { RichText } from "~/common/rich-text";

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

  if (content.address && typeof content.address !== "object") {
    throw new Error("Invalid address");
  }

  function getComponent(children: ReactNode) {
    if (!puertaBrand) throw new Error("Puerta brand not found");
    return puertaBrand.homeLink ? (
      <PageLink link={puertaBrand.homeLink}>{children}</PageLink>
    ) : (
      <div>{children}</div>
    );
  }
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
            <h3 className="mt-2">
              {getComponent(<BrandLogo size="small" brand={puertaBrand} />)}
            </h3>
            {content.address && (
              <p className="text-sm leading-6 text-neutral-600">
                <RichText
                  content={
                    gracefully(content.address, "richText") as
                      | RichTextObject
                      | undefined
                  }
                  lineBreakHandling="line-break"
                />
              </p>
            )}
            <div className="flex space-x-6">
              {content.socialLinks?.map((socialLink) => {
                const social = socials[socialLink.platform];
                return (
                  <PageLink
                    key={socialLink.platform}
                    link={socialLink.link}
                    className="text-neutral-400 hover:text-neutral-500"
                  >
                    <span className="sr-only">{social.name}</span>
                    <social.icon className="h-6 w-6" aria-hidden="true" />
                  </PageLink>
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

                      if (typeof link.label !== "object") {
                        throw new Error("Invalid link label");
                      }
                      return (
                        <li key={link.id}>
                          <PageLink
                            link={link.link}
                            className="text-sm leading-6 text-neutral-600 hover:text-neutral-900"
                          >
                            {link.label.text}
                          </PageLink>
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
                {gracefully(content.newsletter.title, "text")}
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {gracefully(content.newsletter.description, "text")}
              </p>
            </div>
            <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
              <label htmlFor="email-address" className="sr-only">
                {t("footer.newsletter.emailLabel")}
              </label>
              <Input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                placeholder={
                  (
                    content.newsletter.emailPlaceholder as
                      | Text
                      | null
                      | undefined
                  )?.text ?? ""
                }
              />
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <Button
                  size="small"
                  type="submit"
                  className="flex h-full w-full items-center justify-center"
                >
                  {gracefully(content.newsletter.buttonLabel, "text")}
                </Button>
              </div>
            </form>
          </div>
        )}
        <div className="mt-8 border-t border-neutral-900/10 pt-8 sm:mt-10 lg:mt-12">
          <p className="text-xs leading-5 text-neutral-500">
            &copy; {new Date().getFullYear()}
            {content.copyright && (
              <>
                {" "}
                <RichText
                  content={
                    gracefully(content.copyright, "richText") as
                      | RichTextObject
                      | undefined
                  }
                  lineBreakHandling="line-break"
                />
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
