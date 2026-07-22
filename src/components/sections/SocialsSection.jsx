import useTranslation from "../../hooks/useTranslation.js";

const SOCIALS = [
  {
    href: "https://www.instagram.com/cristhian.richard/",
    src: "/social/instagram.png",
    alt: "Instagram",
  },
  {
    href: "https://www.linkedin.com/in/cristhian-richard-bb9060174/",
    src: "/social/linkedin.png",
    alt: "LinkedIn",
  },
  {
    href: "https://github.com/CristhianRichard94",
    src: "/social/github.svg",
    alt: "GitHub",
  },
];

function SocialsSection() {
  const { t } = useTranslation();

  return (
    <section className="main-section align-left" id="socials-section">
      <div className="text">
        <h1>{t("socials.title")}</h1>
        <ul className="social-media">
          {SOCIALS.map((social) => (
            <li key={social.href}>
              <a target="_blank" rel="noreferrer" href={social.href}>
                <img src={social.src} alt={social.alt} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SocialsSection;
