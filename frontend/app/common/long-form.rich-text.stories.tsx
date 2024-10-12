import { Meta, StoryObj } from "@storybook/react";
import { bold, link, plain, simpleElement, text } from "./rich-text.builders";
import { LongFormRichText } from "./long-form-rich-text";

const meta = {
  title: "common/LongFormRichText",
  component: LongFormRichText,
} satisfies Meta<typeof LongFormRichText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: [
      plain(
        text(
          "Thank you for choosing La Puerta Hostels. These Terms and Conditions outline the rules and regulations for using our website, booking services, and staying at our property. By accessing this website and making a reservation, you agree to be bound by the following terms. Please read them carefully.",
        ),
      ),
      simpleElement("h4", text("1. Reservations")),
      plain(
        text(
          "All bookings made through our website or directly with the hotel are subject to room availability and confirmation. Once a reservation is confirmed, an email confirmation will be sent to you containing your booking details. The room rates are quoted in Colombian Pesos and include applicable taxes unless otherwise stated.",
        ),
      ),
      simpleElement("h4", text("2. Check-In and Check-Out")),
      simpleElement(
        "ul",
        simpleElement("li", text("Check-in time: "), bold("4.00 p.m.")),
        simpleElement(
          "li",
          text("Check-out time: "),
          bold("11.00 a.m."),
          text(
            " Late check-out requests are subject to availability and may incur additional charges.",
          ),
        ),
      ),
      simpleElement("h4", text("3. Payment")),
      plain(
        text(
          "A valid credit card is required to guarantee your booking. Payment methods accepted include [credit card types], bank transfers, and cash on arrival. The hotel reserves the right to pre-authorize your credit card prior to your arrival.",
        ),
      ),
      simpleElement("h4", text("4. Changes to Your Reservation")),
      plain(
        text(
          "If you need to modify your reservation, please contact us at least [number of hours/days] before your scheduled check-in time. Changes are subject to availability, and price adjustments may apply.",
        ),
      ),
      simpleElement("h4", text("5. Cancellation and No-Show")),
      plain(
        text(
          "For all cancellation policies, including fees and deadlines, please refer to our ",
        ),
        link("/cancellation", text("Cancellation Policy")),
        text(
          " page. Failure to cancel your booking within the allowed time or not showing up will result in charges as outlined in the Cancellation Policy.",
        ),
      ),
      simpleElement("h4", text("6. Room Policies")),
      plain(text("The maximum number of guests per room is [number].")),
      plain(
        text(
          "Smoking is [allowed/not allowed] in all guest rooms and public areas. Designated smoking areas are available [if applicable].",
        ),
      ),
      plain(
        text(
          "Pets are [allowed/not allowed]. If pets are allowed, additional fees and rules may apply.",
        ),
      ),
      plain(text("")),
      plain(
        text(
          "Guests are responsible for any damage caused to hotel property during their stay. Repair or replacement costs will be charged to the guest’s account.",
        ),
      ),
      simpleElement("h4", text("7. Liability")),
      plain(
        text(
          "[Hotel Name] is not responsible for any loss or damage to personal belongings left in guest rooms or public areas. We recommend using the in-room safe provided for valuables. Additionally, the hotel is not liable for any injuries, damages, or accidents occurring on the property unless caused by negligence on the part of the hotel.",
        ),
      ),
      simpleElement("h4", text("8. Use of the Website")),
      plain(text("By using this website, you agree that:")),
      simpleElement(
        "ul",
        simpleElement(
          "li",
          text(
            "All information provided during the booking process is accurate and complete.",
          ),
        ),
        simpleElement(
          "li",
          text(
            "You will not engage in any activities that may harm the website, impair its functionality, or interfere with other users.",
          ),
        ),
        simpleElement(
          "li",
          text(
            "You are responsible for maintaining the confidentiality of your booking and payment details.",
          ),
        ),
      ),
      simpleElement("h4", text("9. Privacy")),
      plain(
        text(
          "We take your privacy seriously. For more information on how we handle your personal data, please see our ",
        ),
        link("/privacy", text("Privacy Policy")),
        text("."),
      ),
      simpleElement("h4", text("10. Governing Law")),
      plain(
        text(
          "These terms and conditions are governed by the laws of [country/state], and any disputes arising will be resolved in accordance with these laws.",
        ),
      ),
      simpleElement("h4", text("11. Amendments")),
      plain(
        text(
          "La Puerta Hostels reserves the right to update or modify these Terms and Conditions at any time. Guests are encouraged to review the terms regularly to stay informed of any changes.",
        ),
      ),
    ],
  },
};
