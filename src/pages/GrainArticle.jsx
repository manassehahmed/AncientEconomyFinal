import React from 'react'
import './GrainArticle.css'

function GrainArticle() {
  return (
    <div className="grain-article-page">
      <div className="article-container">
        <header className="article-header">
          <h1>The Athenian Daily: Citizen's Guide to Navigating the Grain Market</h1>
        </header>

        <div className="article-content">
          <section className="article-intro">
            <p>
              As grain ships arrive from Egypt, Sicily, Cyrene, and the Black Sea, Athenians face 
              another year of unpredictable supply and volatile prices. With the 28% annual chance 
              of crop failure in Attica (Manning) and weather disruptions from Nile flooding and 
              Etesian winds, buyers must stay alert.
            </p>
          </section>

          <section className="scam-section">
            <h2>Form a Common Buying Front</h2>
            <p>
              In 386 BCE, price spikes are made worse because dealers competed against each other, 
              bidding grain upward and passing the cost onto buyers. Anytos advised merchants to 
              form a single purchasing front, negotiating collectively with importers to prevent 
              sudden price jumps.
            </p>
            <p className="advice-box">
              <strong>Advice:</strong> United group has far more leverage than isolated buyers.
            </p>
          </section>

          <section className="scam-section">
            <h2>Beware of Spoiled or Watered Grain</h2>
            <p>
              The agoranomoi were charged with preventing the sale of spoiled grain at the price 
              of fresh grain. Spoilage was common in years when ships were delayed by winds or 
              Nile failures.
            </p>
            <p>
              <strong>Warning signs:</strong>
            </p>
            <ul>
              <li>Grain could be damp or warm</li>
              <li>Musty or sour smells</li>
              <li>If a seller refuses to let you check grain from the middle or bottom</li>
            </ul>
          </section>

          <section className="scam-section">
            <h2>Watch Out for Fake News and Price Rumors</h2>
            <p>
              Lysias 22.14 describes grain dealers spreading rumors of shipwrecks, Spartan 
              blockades, or war to justify high prices:
            </p>
            <p className="advice-box">
              <strong>Advice:</strong> Confirm news with multiple merchants or official announcements. 
              If prices are rising on rumor alone, be skeptical.
            </p>
          </section>

          <section className="scam-section">
            <h2>Beware of Fake Weights and Short Measures</h2>
            <p>
              Merchants sometimes used weights from other cities that looked similar but were 
              lighter. Some use counterfeit weights entirely.
            </p>
            <p className="advice-box">
              <strong>Advice:</strong> Ask the merchant to use an official weight under an agoranomos 
              supervision.
            </p>
          </section>

          <section className="scam-section">
            <h2>Know the Just Price – and What Sellers Are Allowed to Charge</h2>
            <p>
              Grain retailers were forbidden to take more than 1 obol per drachma. Profit margins 
              are capped at 16.6%.
            </p>
          </section>

          <div className="financial-column">
            <h2>Financial Column: Coin Troubles Cut Into Profits</h2>
            <p className="column-author"><strong>Xenophon</strong></p>
            <div className="column-content">
              <p>
                A rise in clipped, plated, and debased coins is forcing merchants to absorb losses 
                or slow transactions in order to test every drachma that crosses the counter.
              </p>
              <p>
                Under Nikophon's Law, any suspicious coin must be taken to the public approver, who 
                is authorized to test-cut the piece and stamp it if genuine. While this protects the 
                marketplace, it also means that even routine purchases now require extra time, and 
                many coins are rejected outright. Every false drachma accepted represents a direct 
                loss to the seller, and in a narrow-margin regulated trade like grain, those losses 
                add up quickly, especially with the one-obol margin ceiling.
              </p>
              <p>
                Trust in coinage is important for market exchange, and when that trust weakens, 
                merchants either raise prices to cover the risk or become reluctant to accept 
                unfamiliar coins at all. The result is a slower, more uncertain marketplace, exactly 
                the opposite of what the city intends as it works to keep grain affordable.
              </p>
              <p>
                Merchants urge citizens to check their coins carefully and make use of the public 
                tester when in doubt. Merchants also have resorted to using their own weights to 
                check for bronze cores, as many counterfeits have a silver coating with the public 
                stamp. In this season of volatile grain supply and unpredictable weather, the last 
                thing Athens needs is for bad coinage to make a difficult market even worse.
              </p>
            </div>
          </div>

          <section className="conclusion-section">
            <h2>Conclusion</h2>
            <p>
              The grain market in Athens is complex and vulnerable to exploitation. Weather patterns 
              create natural price fluctuations that dishonest merchants exploit. Combined with the 
              threat of counterfeit coinage, both merchants and citizens must remain vigilant.
            </p>
            <p>
              Remember: If a deal seems too good to be true, it likely is. Always inspect grain 
              carefully, verify coinage, and deal with reputable merchants. Your food security and 
              financial well-being depend on it.
            </p>
            <p className="article-footer">
              <em>Stay informed about weather patterns and shipping conditions. Knowledge is your 
              best defense against market scams.</em>
            </p>
          </section>

          <section className="sources-section">
            <h2>Sources & References</h2>
            <div className="sources-content">
              <h3>Counterfeit Coinage</h3>
              <ul>
                <li><strong>Law of Nicophon (375/74 BCE)</strong> - Established official coin testers (dokimastes) to examine coins for authenticity, demonstrating the recognized problem of counterfeit coinage in Athens.</li>
                <li><strong>Peloponnesian War Period (432-404 BCE)</strong> - Historical evidence of debased Athenian coinage (plated coins with base metal cores) during financial strain, leading to inflation and economic disruption.</li>
              </ul>

              <h3>Grain Market Regulations & Practices</h3>
              <ul>
                <li><strong>Lysias 22.14</strong> - Describes grain dealers spreading rumors to justify high prices.</li>
                <li><strong>Anytos (386 BCE)</strong> - Advised merchants to form a single purchasing front to prevent price spikes.</li>
                <li><strong>Demosthenes</strong> - <em>Against Leptines</em> and other orations reference grain trade regulations and market oversight practices in Athens.</li>
                <li><strong>Xenophon</strong> - <em>Ways and Means</em> discusses grain imports, market regulation, and economic practices.</li>
                <li><strong>Aristotle</strong> - <em>Athenian Constitution</em> references grain market oversight and regulations.</li>
              </ul>

              <h3>Secondary Sources</h3>
              <ul>
                <li><strong>Manning, J.G.</strong> - References to 28% annual crop failure risk in Attica.</li>
                <li><strong>Garnsey, Peter</strong> (1988). <em>Famine and Food Supply in the Graeco-Roman World</em>. Cambridge University Press. Discusses grain shortages, price fluctuations, and market practices.</li>
                <li><strong>Moreno, Alfonso</strong> (2007). <em>Feeding the Democracy: The Athenian Grain Supply in the Fifth and Fourth Centuries BC</em>. Oxford University Press. Comprehensive study of Athenian grain trade, including regulations and market practices.</li>
                <li><strong>Horden, Peregrine & Purcell, Nicholas</strong> (2000). <em>The Corrupting Sea: A Study of Mediterranean History</em>. Wiley-Blackwell. Discusses maritime trade patterns, including grain shipping.</li>
                <li><strong>Oliver, G.J.</strong> (2007). <em>War, Food, and Politics in Early Hellenistic Athens</em>. Oxford University Press. Discusses grain trade networks and economic relationships.</li>
              </ul>

              <p className="sources-note">
                <em>Note: The specific scam descriptions are based on universal patterns of market fraud 
                and the historical evidence of market regulations (which implies fraud was occurring), 
                though exact documentation of these specific scam types does not survive in the sources. 
                The counterfeit coinage information is well-documented historically.</em>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default GrainArticle