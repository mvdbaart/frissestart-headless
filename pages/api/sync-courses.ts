import { NextApiRequest, NextApiResponse } from 'next';
import { getCourses } from '../../lib/api';

/**
 * API endpoint om cursussen te synchroniseren met WordPress
 * 
 * Dit endpoint kan worden aangeroepen om een verse ophaling van cursussen uit WordPress te forceren
 * Het kan handmatig worden geactiveerd of via een webhook vanuit WordPress wanneer cursussen worden bijgewerkt
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Alleen GET-verzoeken toestaan
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Methode niet toegestaan. Gebruik GET.' });
  }
  
  try {
    // Optioneel: Voeg hier een authenticatiecontrole toe
    // Bijvoorbeeld, controleer op een geheime sleutel in de request headers
    const apiKey = req.headers['x-api-key'];
    const configuredApiKey = process.env.SYNC_API_KEY;
    
    if (configuredApiKey && apiKey !== configuredApiKey) {
      return res.status(401).json({ success: false, message: 'Niet geautoriseerd' });
    }
    
    // Voer de synchronisatie uit (alleen ophalen van cursussen)
    console.log('Cursussen synchroniseren gestart...');
    const courses = await getCourses();
    
    // Retourneer het resultaat
    return res.status(200).json({
      success: true,
      coursesCount: courses.length,
      message: `Succesvol ${courses.length} cursussen gesynchroniseerd van WordPress`
    });
  } catch (error) {
    console.error('Error in sync-courses API endpoint:', error);
    return res.status(500).json({
      success: false,
      message: `Error bij het synchroniseren van cursussen: ${error.message || 'Onbekende fout'}`
    });
  }
}