import { GlobalConfig } from "payload";
import { canManageContent } from "../../common/access-control";
import { showField } from "../../fields/show";
import { socialPlatformOptions } from "@/common/social-platforms";
import { SocialPlatformRowLabelProps } from "@/globals/common/social-platform-row-label";
import { descriptionField } from "@/fields/description";
import { richTextField } from "@/fields/rich-text";
import { textField } from "@/fields/text";
import { textareaField } from "@/fields/textarea";
import { linkField } from "@/fields/link";
import { contentGroup } from "@/groups";

export const Common: GlobalConfig = {
  slug: "common",
  label: {
    en: "Common",
    es: "Común",
  },
  access: {
    update: canManageContent,
  },
  admin: {
    group: contentGroup,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "footer",
          label: {
            en: "Footer",
            es: "Pie de página",
          },
          fields: [
            richTextField({
              name: "address",
              label: {
                en: "Address",
                es: "Dirección",
              },
            }),
            richTextField({
              name: "copyright",
              label: {
                en: "Copyright",
                es: "Derechos de autor",
              },
            }),
            {
              type: "array",
              name: "socialLinks",
              label: {
                en: "Social Links",
                es: "Enlaces sociales",
              },
              labels: {
                singular: {
                  en: "Social Link",
                  es: "Enlace social",
                },
                plural: {
                  en: "Social Links",
                  es: "Enlaces sociales",
                },
              },
              fields: [
                {
                  name: "platform",
                  type: "select",
                  label: {
                    en: "Platform",
                    es: "Plataforma",
                  },
                  options: socialPlatformOptions,
                  required: true,
                },
                linkField(),
              ],
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: {
                    path: "/src/globals/common/social-platform-row-label",
                    exportName: "SocialPlatformRowLabel",
                    clientProps: {
                      fallbackLabelKey: "custom:common:socialLinkRowLabel",
                    } as SocialPlatformRowLabelProps,
                  },
                },
              },
            },
            {
              name: "newsletter",
              label: {
                en: "Newsletter Form",
                es: "Formulario de Boletín",
              },
              type: "group",
              fields: [
                showField(),
                textField({
                  name: "title",
                  label: { en: "Title", es: "Título" },
                  admin: {
                    condition: (data) => !!data.footer?.newsletter?.show,
                  },
                }),
                textareaField({
                  name: "description",
                  label: { en: "Description", es: "Descripción" },
                  admin: {
                    condition: (data) => !!data?.footer?.newsletter?.show,
                  },
                }),
                textField({
                  name: "emailPlaceholder",
                  label: {
                    en: "Email Placeholder",
                    es: "Marcador de correo electrónico",
                  },
                  admin: {
                    condition: (data) => data.footer.newsletter.show,
                  },
                }),
                textField({
                  name: "buttonLabel",
                  label: { en: "Button Label", es: "Etiqueta del botón" },
                  admin: {
                    condition: (data) => data.footer.newsletter.show,
                  },
                }),
              ],
              admin: {
                description: {
                  en: "For demo purposes only. This form is not enabled yet.",
                  es: "Solo para fines de demostración. Este formulario aún no está habilitado.",
                },
              },
            },
          ],
        },
        {
          name: "pageNotFoundScreen",
          label: {
            en: "Page Not Found Screen",
            es: "Pantalla de Página No Encontrada",
          },
          fields: [
            descriptionField({
              en: "This screen is shown when a user tries to access a page that does not exist.",
              es: "Esta pantalla se muestra cuando un usuario intenta acceder a una página que no existe.",
            }),
            textField({
              name: "heading",
              label: { en: "Heading", es: "Título" },
            }),
            richTextField(),
          ],
        },
        {
          name: "errorScreen",
          label: {
            en: "Internal Server Error Screen",
            es: "Pantalla de Error Interno del Servidor",
          },
          fields: [
            descriptionField({
              en: "This screen is shown when the server encounters an error.",
              es: "Esta pantalla se muestra cuando el servidor encuentra un error.",
            }),
            textField({
              name: "heading",
              label: { en: "Heading", es: "Título" },
            }),
            richTextField(),
          ],
        },
      ],
    },
  ],
};
