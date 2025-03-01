import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import { getPageBySlug, Page } from '../lib/api';

interface PrivacyProps {
  page: Page | null;
}

export default function Privacy({ page }: PrivacyProps) {
  return (
    <Layout 
      title="Privacybeleid - Frisse Start Opleidingen"
      description="Lees ons privacybeleid om te begrijpen hoe wij omgaan met uw persoonlijke gegevens."
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-text-dark">Privacybeleid</h1>
          
          {page ? (
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content.rendered }}
            />
          ) : (
            <div className="prose prose-lg max-w-none">
              <p>
                Bij Frisse Start Opleidingen hechten we veel waarde aan de bescherming van uw persoonsgegevens. 
                In dit privacybeleid willen we heldere en transparante informatie geven over hoe wij omgaan met persoonsgegevens.
              </p>
              
              <p>
                Wij doen er alles aan om uw privacy te waarborgen en gaan daarom zorgvuldig om met persoonsgegevens. 
                Frisse Start Opleidingen houdt zich in alle gevallen aan de toepasselijke wet- en regelgeving, 
                waaronder de Algemene Verordening Gegevensbescherming.
              </p>
              
              <h2>Verwerking van persoonsgegevens</h2>
              <p>
                Frisse Start Opleidingen verwerkt uw persoonsgegevens doordat u gebruik maakt van onze diensten en/of 
                omdat u deze zelf aan ons verstrekt. Hieronder vindt u een overzicht van de persoonsgegevens die wij verwerken:
              </p>
              <ul>
                <li>Voor- en achternaam</li>
                <li>Geslacht</li>
                <li>Geboortedatum</li>
                <li>Adresgegevens</li>
                <li>Telefoonnummer</li>
                <li>E-mailadres</li>
                <li>Overige persoonsgegevens die u actief verstrekt in correspondentie en telefonisch</li>
              </ul>
              
              <h2>Bijzondere en/of gevoelige persoonsgegevens</h2>
              <p>
                Onze website en/of dienst heeft niet de intentie gegevens te verzamelen over websitebezoekers die jonger zijn dan 16 jaar, 
                tenzij ze toestemming hebben van ouders of voogd. We kunnen echter niet controleren of een bezoeker ouder dan 16 is. 
                Wij raden ouders dan ook aan betrokken te zijn bij de online activiteiten van hun kinderen, 
                om zo te voorkomen dat er gegevens over kinderen verzameld worden zonder ouderlijke toestemming.
              </p>
              
              <h2>Doel en grondslag van de verwerking</h2>
              <p>
                Frisse Start Opleidingen verwerkt uw persoonsgegevens voor de volgende doelen:
              </p>
              <ul>
                <li>Het afhandelen van uw betaling</li>
                <li>U te kunnen bellen of e-mailen indien dit nodig is om onze dienstverlening uit te kunnen voeren</li>
                <li>U te informeren over wijzigingen van onze diensten en producten</li>
                <li>Om goederen en diensten bij u af te leveren</li>
                <li>Frisse Start Opleidingen verwerkt ook persoonsgegevens als wij hier wettelijk toe verplicht zijn, zoals gegevens die wij nodig hebben voor onze belastingaangifte</li>
              </ul>
              
              <h2>Bewaartermijn</h2>
              <p>
                Frisse Start Opleidingen bewaart uw persoonsgegevens niet langer dan strikt nodig is om de doelen te realiseren waarvoor uw gegevens worden verzameld.
              </p>
              
              <h2>Delen van persoonsgegevens met derden</h2>
              <p>
                Frisse Start Opleidingen verkoopt uw gegevens niet aan derden en verstrekt deze uitsluitend indien dit nodig is voor de uitvoering van onze overeenkomst met u of om te voldoen aan een wettelijke verplichting. Met bedrijven die uw gegevens verwerken in onze opdracht, sluiten wij een bewerkersovereenkomst om te zorgen voor eenzelfde niveau van beveiliging en vertrouwelijkheid van uw gegevens. Frisse Start Opleidingen blijft verantwoordelijk voor deze verwerkingen.
              </p>
              
              <h2>Cookies, of vergelijkbare technieken</h2>
              <p>
                Frisse Start Opleidingen gebruikt alleen technische en functionele cookies, en analytische cookies die geen inbreuk maken op uw privacy. Een cookie is een klein tekstbestand dat bij het eerste bezoek aan deze website wordt opgeslagen op uw computer, tablet of smartphone. De cookies die wij gebruiken zijn noodzakelijk voor de technische werking van de website en uw gebruiksgemak. Ze zorgen ervoor dat de website naar behoren werkt en onthouden bijvoorbeeld uw voorkeursinstellingen. Ook kunnen wij hiermee onze website optimaliseren. U kunt zich afmelden voor cookies door uw internetbrowser zo in te stellen dat deze geen cookies meer opslaat. Daarnaast kunt u ook alle informatie die eerder is opgeslagen via de instellingen van uw browser verwijderen.
              </p>
              
              <h2>Gegevens inzien, aanpassen of verwijderen</h2>
              <p>
                U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heeft u het recht om uw eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van uw persoonsgegevens door Frisse Start Opleidingen en heeft u het recht op gegevensoverdraagbaarheid. Dat betekent dat u bij ons een verzoek kunt indienen om de persoonsgegevens die wij van u beschikken in een computerbestand naar u of een ander, door u genoemde organisatie, te sturen.
              </p>
              <p>
                U kunt een verzoek tot inzage, correctie, verwijdering, gegevensoverdraging van uw persoonsgegevens of verzoek tot intrekking van uw toestemming of bezwaar op de verwerking van uw persoonsgegevens sturen naar info@frissestart.nl.
              </p>
              <p>
                Om er zeker van te zijn dat het verzoek tot inzage door u is gedaan, vragen wij u een kopie van uw identiteitsbewijs met het verzoek mee te sturen. Maak in deze kopie uw pasfoto, MRZ (machine readable zone, de strook met nummers onderaan het paspoort), paspoortnummer en Burgerservicenummer (BSN) zwart. Dit ter bescherming van uw privacy. We reageren zo snel mogelijk, maar binnen vier weken, op uw verzoek.
              </p>
              
              <h2>Hoe wij persoonsgegevens beveiligen</h2>
              <p>
                Frisse Start Opleidingen neemt de bescherming van uw gegevens serieus en neemt passende maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. Als u de indruk heeft dat uw gegevens niet goed beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan contact op via info@frissestart.nl.
              </p>
              
              <h2>Wijzigingen in het privacybeleid</h2>
              <p>
                Frisse Start Opleidingen behoudt zich het recht voor om wijzigingen aan te brengen in dit privacybeleid. Het verdient aanbeveling om dit privacybeleid regelmatig te raadplegen, zodat u van deze wijzigingen op de hoogte bent.
              </p>
              
              <h2>Contact</h2>
              <p>
                Voor vragen of opmerkingen over ons privacybeleid kunt u contact opnemen via:
              </p>
              <p>
                Frisse Start Opleidingen<br />
                Email: info@frissestart.nl<br />
                Telefoon: +31 (0)12 345 6789
              </p>
              
              <p className="text-sm text-gray-500 mt-8">
                Laatste update: 1 juni 2023
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const page = await getPageBySlug('privacy');
  
  return {
    props: {
      page,
    },
    revalidate: 60 * 10, // Revalidate every 10 minutes
  };
};