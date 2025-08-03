import { GlobalConfig } from "payload";
import { canManageContent } from "../../common/access-control";
import { showField } from "@fxmk/cms-plugin";
import { socialPlatformOptions } from "@/common/social-platforms";
import { SocialPlatformRowLabelProps } from "@/globals/common/social-platform-row-label";
import { descriptionField } from "@/fields/description";
import { optionalRichTextField } from "@/fields/rich-text";
import { optionalTextField, textField } from "@/fields/text";
import { optionalTextareaField, textareaField } from "@/fields/textarea";
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
            optionalRichTextField({
              name: "address",
              label: {
                en: "Address",
                es: "Dirección",
              },
            }),
            optionalRichTextField({
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
            optionalTextField({
              name: "heading",
              label: { en: "Heading", es: "Título" },
            }),
            optionalRichTextField(),
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
            optionalTextField({
              name: "heading",
              label: { en: "Heading", es: "Título" },
            }),
            optionalRichTextField(),
          ],
        },
        {
          name: "uiLabels",
          label: {
            en: "UI Labels",
            es: "Etiquetas de la Interfaz de Usuario",
          },
          fields: [
            {
              name: "banner",
              label: { en: "Banner", es: "Banner" },
              type: "group",
              fields: [
                optionalTextField({
                  name: "dismiss",
                  label: { en: "Dismiss", es: "Descartar" },
                }),
              ],
            },
            {
              name: "footer",
              label: { en: "Footer", es: "Pie de página" },
              type: "group",
              fields: [
                optionalTextField({
                  name: "heading",
                  label: { en: "Heading", es: "Título" },
                }),
                {
                  name: "newsletter",
                  label: { en: "Newsletter", es: "Boletín" },
                  type: "group",
                  fields: [
                    optionalTextField({
                      name: "emailLabel",
                      label: {
                        en: "Email Label",
                        es: "Etiqueta de correo electrónico",
                      },
                    }),
                  ],
                },
              ],
            },
            {
              name: "imageViewer",
              label: { en: "Image Viewer", es: "Visor de Imágenes" },
              type: "group",
              fields: [
                optionalTextField({
                  name: "previous",
                  label: { en: "Previous", es: "Anterior" },
                }),
                optionalTextField({
                  name: "next",
                  label: { en: "Next", es: "Siguiente" },
                }),
                optionalTextField({
                  name: "fullscreen",
                  label: { en: "Full Screen", es: "Pantalla Completa" },
                }),
                optionalTextField({
                  name: "exitFullscreen",
                  label: {
                    en: "Exit Full Screen",
                    es: "Salir de Pantalla Completa",
                  },
                }),
                optionalTextField({
                  name: "close",
                  label: { en: "Close", es: "Cerrar" },
                }),
                optionalTextField({
                  name: "seeMoreImages_one",
                  label: {
                    en: "See More Images (singular)",
                    es: "Ver Más Imágenes (singular)",
                  },
                  admin: {
                    description: {
                      en: "Use the {{count}} placeholder to display the number of images.",
                      es: "Usa el marcador {{count}} para mostrar el número de imágenes.",
                    },
                  },
                }),
                optionalTextField({
                  name: "seeMoreImages_other",
                  label: {
                    en: "See More Images (plural)",
                    es: "Ver Más Imágenes (plural)",
                  },
                  admin: {
                    description: {
                      en: "Use the {{count}} placeholder to display the number of images.",
                      es: "Usa el marcador {{count}} para mostrar el número de imágenes.",
                    },
                  },
                }),
              ],
            },
            {
              name: "slidesBlock",
              type: "group",
              fields: [
                optionalTextField({
                  name: "goToSlide",
                  label: { en: "Go to Slide", es: "Ir a la Diapositiva" },
                  admin: {
                    description: {
                      en: "Use the {{slide}} placeholder to display the slide number.",
                      es: "Usa el marcador {{slide}} para mostrar el número de diapositiva.",
                    },
                  },
                }),
              ],
            },
            {
              name: "errorBoundary",
              label: {
                en: "Error Boundary",
                es: "Límite de Error",
              },
              type: "group",
              fields: [
                optionalTextField({
                  name: "title",
                  label: { en: "Title", es: "Título" },
                }),
                optionalTextareaField({
                  name: "text",
                  label: { en: "Text (HTML)", es: "Texto (HTML)" },
                }),
              ],
            },
            {
              name: "maintenanceScreen",
              label: {
                en: "Maintenance Screen",
                es: "Pantalla de Mantenimiento",
              },
              type: "group",
              fields: [
                optionalTextField({
                  name: "login",
                  label: { en: "Login", es: "Iniciar sesión" },
                }),
              ],
            },
            {
              name: "login",
              label: { en: "Login", es: "Iniciar sesión" },
              type: "group",
              fields: [
                optionalTextField({
                  name: "email",
                  label: { en: "Email", es: "Correo electrónico" },
                }),
                optionalTextField({
                  name: "password",
                  label: { en: "Password", es: "Contraseña" },
                }),
                optionalTextField({
                  name: "submit",
                  label: { en: "Submit", es: "Enviar" },
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
};
