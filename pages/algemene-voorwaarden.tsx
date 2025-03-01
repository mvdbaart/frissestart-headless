import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import { getPageBySlug, Page } from '../lib/api';

interface AlgemeneVoorwaardenProps {
  page: Page | null;
}

export default function AlgemeneVoorwaarden({ page }: AlgemeneVoorwaardenProps) {
  return (
    <Layout 
      title="Algemene Voorwaarden - Frisse Start Opleidingen"
      description="Lees onze algemene voorwaarden voor informatie over de afspraken en regels die gelden bij het volgen van onze opleidingen."
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-text-dark">Algemene Voorwaarden</h1>
          
          {page ? (
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content.rendered }}
            />
          ) : (
            <div className="prose prose-lg max-w-none">
              <p>
                Deze algemene voorwaarden zijn van toepassing op alle overeenkomsten tussen Frisse Start Opleidingen en deelnemers aan opleidingen, trainingen, cursussen en andere vormen van opleiding en onderwijs.
              </p>
              
              <h2>1. Definities</h2>
              <p>
                In deze algemene voorwaarden wordt verstaan onder:
              </p>
              <ul>
                <li><strong>Opdrachtnemer:</strong> Frisse Start Opleidingen, gevestigd te [Vestigingsplaats], ingeschreven bij de Kamer van Koophandel onder nummer [KvK-nummer].</li>
                <li><strong>Opdrachtgever:</strong> De natuurlijke persoon of rechtspersoon die aan Opdrachtnemer opdracht heeft gegeven tot het verzorgen van een opleiding.</li>
                <li><strong>Deelnemer:</strong> De natuurlijke persoon die deelneemt aan een door Opdrachtnemer verzorgde opleiding. De Deelnemer kan tevens Opdrachtgever zijn.</li>
                <li><strong>Opleiding:</strong> Cursus, training, workshop, coaching, counseling of enige andere bijeenkomst met als doel het overbrengen en/of vergroten van kennis en/of vaardigheden.</li>
              </ul>
              
              <h2>2. Inschrijving en bevestiging</h2>
              <p>
                Inschrijving voor een opleiding kan via het inschrijfformulier op de website, per e-mail of telefonisch. Na ontvangst van de inschrijving stuurt Opdrachtnemer een bevestiging van de inschrijving, waarmee de overeenkomst tot stand komt. Opdrachtnemer heeft het recht een Deelnemer te weigeren indien deze niet voldoet aan de door Opdrachtnemer gestelde toelatingscriteria.
              </p>
              
              <h2>3. Annulering door Opdrachtgever</h2>
              <p>
                Annulering door de Opdrachtgever dient schriftelijk te geschieden. Bij annulering tot 4 weken voor aanvang van de opleiding is de Opdrachtgever 25% van het cursusgeld verschuldigd. Bij annulering tussen 4 en 2 weken voor aanvang van de opleiding is de Opdrachtgever 50% van het cursusgeld verschuldigd. Bij annulering binnen 2 weken voor aanvang van de opleiding is de Opdrachtgever het volledige cursusgeld verschuldigd.
              </p>
              <p>
                In geval de Deelnemer na aanvang van de opleiding de deelname tussentijds beëindigt of anderszins niet aan de opleiding deelneemt, heeft de Opdrachtgever geen recht op enige terugbetaling.
              </p>
              
              <h2>4. Annulering door Opdrachtnemer</h2>
              <p>
                Opdrachtnemer heeft het recht zonder opgave van redenen een opleiding te annuleren of deelname van een Deelnemer te weigeren, in welke gevallen de Opdrachtgever recht heeft op terugbetaling van het volledige door deze aan Opdrachtnemer betaalde bedrag.
              </p>
              <p>
                Opdrachtnemer behoudt zich het recht voor om in geval van onvoldoende inschrijvingen een opleiding af te gelasten. Opdrachtgever zal hierover tijdig worden geïnformeerd. Opdrachtnemer zal het reeds betaalde cursusgeld restitueren of in overleg met de Opdrachtgever de deelname verplaatsen naar een opleiding op een andere datum.
              </p>
              
              <h2>5. Betaling</h2>
              <p>
                Na inschrijving ontvangt de Opdrachtgever een factuur. Betaling dient te geschieden binnen 14 dagen na factuurdatum, doch uiterlijk voor aanvang van de eerste cursusdag. Bij niet tijdige betaling is Opdrachtgever in gebreke zonder dat een nadere ingebrekestelling is vereist. Opdrachtnemer is gerechtigd bij niet tijdige betaling de Deelnemer de toegang tot de opleiding te weigeren.
              </p>
              <p>
                Bij overschrijding van de betalingstermijn is Opdrachtgever wettelijke rente verschuldigd. Eventuele incassokosten komen voor rekening van Opdrachtgever.
              </p>
              
              <h2>6. Intellectuele eigendom</h2>
              <p>
                Het auteursrecht op de door Opdrachtnemer uitgegeven brochures, projectmateriaal, cursusmateriaal, handboeken, les- en werkboeken, software, e.d. berust bij Opdrachtnemer, tenzij een andere auteursrechthebbende op het werk zelf is aangegeven. Zonder uitdrukkelijke schriftelijke toestemming van Opdrachtnemer zullen door de Opdrachtgever geen gegevens uit gedeelten en/of uittreksels of enig materiaal worden gepubliceerd of op welke wijze dan ook worden vermenigvuldigd.
              </p>
              
              <h2>7. Aansprakelijkheid</h2>
              <p>
                Opdrachtnemer is niet aansprakelijk voor enige schade die veroorzaakt is door of verband houdt met deelname aan een opleiding van Opdrachtnemer of de annulering van de cursusovereenkomst door Opdrachtnemer, tenzij aan Opdrachtnemer opzet of grove nalatigheid kan worden verweten.
              </p>
              <p>
                Indien Opdrachtnemer op enig moment ondanks het bepaalde in lid 1 wel aansprakelijk is voor enige schade, dan zal deze beperkt zijn tot maximaal het factuurbedrag.
              </p>
              <p>
                Indirecte schade wordt niet vergoed.
              </p>
              
              <h2>8. Vertrouwelijkheid</h2>
              <p>
                Opdrachtnemer zal alle informatie van of over de Opdrachtgever of Deelnemer die zij in het kader van de uitvoering van de overeenkomst verkrijgt, vertrouwelijk behandelen. Opdrachtnemer zal de ontvangen informatie alleen gebruiken voor het doel waarvoor deze is verstrekt.
              </p>
              
              <h2>9. Persoonsgegevens</h2>
              <p>
                Door het aangaan van een overeenkomst met Opdrachtnemer wordt aan Opdrachtnemer toestemming verleend voor automatische verwerking van de uit de overeenkomst verkregen persoonsgegevens. Deze persoonsgegevens zal Opdrachtnemer uitsluitend gebruiken voor haar eigen activiteiten. Opdrachtnemer zal de bedoelde persoonsgegevens niet aan derden ter beschikking stellen. Voor meer informatie over hoe wij omgaan met persoonsgegevens verwijzen wij naar ons privacybeleid.
              </p>
              
              <h2>10. Toepasselijk recht en geschillen</h2>
              <p>
                Op alle overeenkomsten tussen Opdrachtnemer en Opdrachtgever is Nederlands recht van toepassing. Geschillen voortvloeiend uit overeenkomsten, waarop deze voorwaarden van toepassing zijn, zullen worden voorgelegd aan de bevoegde rechter in de plaats waar Opdrachtnemer gevestigd is.
              </p>
              
              <h2>11. Wijziging voorwaarden</h2>
              <p>
                Opdrachtnemer heeft het recht deze algemene voorwaarden te wijzigen. De Opdrachtgever wordt geacht de betreffende wijzigingen te hebben aanvaard indien Opdrachtnemer niet binnen 14 dagen na de schriftelijke mededeling van de wijziging te hebben gedaan, een schriftelijk protest daartegen heeft ontvangen.
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
  const page = await getPageBySlug('algemene-voorwaarden');
  
  return {
    props: {
      page,
    },
    revalidate: 60 * 10, // Revalidate every 10 minutes
  };
};