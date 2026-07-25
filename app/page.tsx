import Link from "next/link";

const features = [
  { number: "01", title: "Cross-department clarity", body: "Sales, service, and parts exports become one connected operating picture." },
  { number: "02", title: "Signal, not spreadsheets", body: "Anomalies and missed opportunities surface automatically, with context." },
  { number: "03", title: "Ready before Monday", body: "A repeatable executive report in seconds—not half a day of manual work." },
];

export default function Home() {
  return (
    <main className="landing">
      <nav className="site-nav">
        <Link href="/" className="wordmark"><span>GH</span> Ghost Hand Studios</Link>
        <div className="nav-links">
          <a href="#capabilities">Capabilities</a>
          <Link href="/upload">Import data</Link>
          <Link href="/demo" className="button button-small button-ghost">View live demo <span>↗</span></Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><i /> Dealer intelligence / Prototype 01</div>
          <h1>See what your<br />DMS is <em>not</em><br />telling you.</h1>
          <p>Ghost Hand connects the exports your teams already use—then turns them into the decisions you should make next.</p>
          <div className="hero-actions">
            <Link href="/demo" className="button button-light">Explore the intelligence <span>→</span></Link>
            <Link href="/upload" className="text-link">Import your own data <span>↗</span></Link>
          </div>
        </div>
        <div className="signal-panel" aria-label="Live intelligence preview">
          <div className="signal-top">
            <span>LIVE SIGNAL</span><span className="pulse">● MONITORING</span>
          </div>
          <div className="signal-main">
            <div className="signal-label">MONTHLY GROSS PROFIT</div>
            <div className="signal-value">$472,350</div>
            <div className="signal-delta">↗ 12.4% <span>vs. prior month</span></div>
          </div>
          <div className="mini-chart">
            {[32, 40, 37, 53, 48, 66, 61, 74, 70, 88, 84, 96].map((h, i) => <i key={i} style={{height: `${h}%`}} />)}
          </div>
          <div className="signal-alert">
            <b>01</b>
            <div><strong>Margin anomaly detected</strong><span>Taycan gross is 23% above the 90-day baseline.</span></div>
            <span>→</span>
          </div>
          <div className="signal-meta"><span>3 departments connected</span><span>Updated 8 sec ago</span></div>
        </div>
      </section>

      <section className="proof-strip">
        <span>THE MANUAL WAY</span><b>4.5 hours</b><i />
        <span>WITH GHOST HAND</span><b>8 seconds</b>
        <span className="time-back">TIME, RETURNED.</span>
      </section>

      <section className="feature-section" id="capabilities">
        <div className="section-kicker">BUILT FOR THE DECISIONS BETWEEN THE REPORTS</div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.number}>
              <span>{feature.number}</span><h2>{feature.title}</h2><p>{feature.body}</p><b>EXPLORE CAPABILITY →</b>
            </article>
          ))}
        </div>
      </section>

      <footer><div className="wordmark"><span>GH</span> Ghost Hand Studios</div><p>Private prototype · Sample data only</p></footer>
    </main>
  );
}
