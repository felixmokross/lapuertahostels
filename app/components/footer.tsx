import { SVGProps } from "react";
import { Image } from "./image";

const navigation = {
  hotel: [
    { name: "About", href: "#" },
    { name: "Puerta Aqua", href: "/aqua" },
    { name: "La Puerta Azul", href: "/azul" },
    { name: "Contact", href: "#" },
  ],
  experiences: [
    { name: "Santa Marta", href: "#" },
    { name: "Lost City", href: "#" },
    { name: "Tayrona Park", href: "#" },
    { name: "Minca", href: "#" },
  ],
  legal: [
    { name: "Terms", href: "#" },
    { name: "Cancelation", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "FAQ", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/lapuertahostels",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export function Footer() {
  return (
    <footer className="mt-40 bg-puerta-100" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-5xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <h6 className="mt-2 flex items-center gap-2 font-serif text-base uppercase tracking-wider text-neutral-900">
              <Image
                className="h-7"
                src="/logos/logo-puerta-simple.png?updatedAt=1703906701749&tr=h-56"
                alt="La Puerta Hostels Logo"
              />
              La Puerta Hostels
            </h6>
            <p className="text-sm leading-6 text-neutral-600">
              La Puerta Hostels S.A.S.
              <br />
              Calle 18 #5-66
              <br />
              Santa Marta 470004
              <br /> Colombia
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-neutral-400 hover:text-neutral-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-neutral-900">
                Hotel
              </h3>
              <ul className="mt-6 space-y-4">
                {navigation.hotel.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm leading-6 text-neutral-600 hover:text-neutral-900"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 md:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-neutral-900">
                Experiences
              </h3>
              <ul className="mt-6 space-y-4">
                {navigation.experiences.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm leading-6 text-neutral-600 hover:text-neutral-900"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 md:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-neutral-900">
                Legal
              </h3>
              <ul className="mt-6 space-y-4">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm leading-6 text-neutral-600 hover:text-neutral-900"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-neutral-900/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm font-semibold leading-6 text-neutral-900">
              Subscribe to our newsletter
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Don&rsquo;t miss out on new experiences, discounts, or any other
              news from us!
            </p>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-puerta-600 sm:w-56 sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <button
                type="submit"
                className="flex h-full w-full items-center justify-center rounded-md bg-puerta-500 px-3 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm hover:bg-puerta-200 hover:text-puerta-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-puerta-600"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
        <div className="mt-8 border-t border-neutral-900/10 pt-8 sm:mt-10 lg:mt-12">
          <p className="text-xs leading-5 text-neutral-500">
            &copy; 2024 La Puerta Hostels S.A.S. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
