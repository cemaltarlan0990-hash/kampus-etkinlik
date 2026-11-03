import { NavLink } from "react-router-dom";

const menu = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/events", label: "Etkinlikler" },
  { to: "/admin", label: "Yönetim" },
  { to: "/login", label: "Giriş" },
];

// NavLink açık sayfanın linkine kendisi aria-current="page" ekler; CSS onu boyar.
// end: onsuz "/" her adresle eşleşir, Ana Sayfa hep aktif görünür.
function Navigation() {
  return (
    <div className="site-baslik menu-cubugu">
      <nav className="kabuk menu">
        {menu.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === "/"}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Navigation;
