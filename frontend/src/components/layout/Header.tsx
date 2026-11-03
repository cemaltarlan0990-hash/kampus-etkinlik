// Site başlığı her sayfada aynı; sayfanın kendi başlığı sayfanın içindeki <h2>.
function Header() {
  return (
    <header className="site-baslik">
      <div className="kabuk">
        <h1>Kampüs Etkinlikleri</h1>
        <p className="alt-baslik">Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
      </div>
    </header>
  );
}

export default Header;
