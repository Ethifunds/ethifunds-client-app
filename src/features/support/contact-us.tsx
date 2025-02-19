import { assets, variables } from "@/constants";

export default function ContactUs() {
  const contacts = variables.CONTACTS;
  const contactsList = [
    {
      title: contacts.support_email,
      link: `mailto:${contacts.support_email}`,
      icon: assets.inbox_01,
    },
    {
      title: contacts.phone,
      link: `tel:${contacts.phone}`,
      icon: assets.phone_01,
    },
  ];

  return (
    <div className="space-y-5 rounded-lg border px-4 py-8">
      <h4 className="highlight-accent text-neutral-1000">Contact us:</h4>

      <div className="space-y-5">
        {contactsList.map((item) => (
          <div className="content-standard flex items-center gap-3 text-neutral-700">
            <img src={item.icon} alt={item.title} className="size-6" />
            <a href={item.link}>{item.title} </a>
          </div>
        ))}
      </div>
    </div>
  );
}
