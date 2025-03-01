import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import axios from 'axios';

interface SyncCoursesProps {
  isAuthorized: boolean;
}

export default function SyncCourses({ isAuthorized }: SyncCoursesProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success?: boolean;
    message?: string;
    coursesCount?: number;
    error?: string;
  } | null>(null);

  const handleSync = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      // Gebruik GET in plaats van POST
      const response = await axios.get('/api/sync-courses', {
        headers: {
          // Als je een API-sleutel hebt ingesteld, voeg deze hier toe
          // 'x-api-key': 'your-api-key'
        }
      });
      
      setResult(response.data);
    } catch (error) {
      console.error('Error bij het synchroniseren van cursussen:', error);
      setResult({
        success: false,
        error: error.response?.data?.message || error.message || 'Onbekende fout opgetreden'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthorized) {
    return (
      <Layout title="Niet geautoriseerd - Frisse Start Opleidingen">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 text-text-dark">Niet geautoriseerde toegang</h1>
          <p>Je hebt geen toestemming om deze pagina te bekijken.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Cursussen Synchroniseren - Frisse Start Opleidingen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-text-dark">Cursussen Synchroniseren met WordPress</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="mb-6">
            Gebruik deze pagina om handmatig cursussen te synchroniseren vanuit de WordPress-database. 
            Dit zal de nieuwste cursusgegevens ophalen en de website bijwerken.
          </p>
          
          <button
            onClick={handleSync}
            disabled={isLoading}
            className={`px-6 py-3 rounded-md font-medium ${
              isLoading 
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
          >
            {isLoading ? 'Bezig met synchroniseren...' : 'Cursussen Synchroniseren'}
          </button>
        </div>
        
        {result && (
          <div className={`rounded-lg p-6 mb-8 ${
            result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <h2 className={`text-xl font-bold mb-2 ${
              result.success ? 'text-green-800' : 'text-red-800'
            }`}>
              {result.success ? 'Synchronisatie Succesvol' : 'Synchronisatie Mislukt'}
            </h2>
            
            {result.message && (
              <p className={result.success ? 'text-green-700' : 'text-red-700'}>
                {result.message}
              </p>
            )}
            
            {result.error && (
              <p className="text-red-700">
                Fout: {result.error}
              </p>
            )}
            
            {result.coursesCount !== undefined && (
              <p className="mt-2 font-medium">
                Cursussen gesynchroniseerd: {result.coursesCount}
              </p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Eenvoudige autorisatiecontrole - in een echte app zou je een goede authenticatie implementeren
  // Dit is slechts een eenvoudig voorbeeld met een query parameter voor demonstratie
  const { token } = context.query;
  const isAuthorized = token === process.env.ADMIN_TOKEN || process.env.NODE_ENV === 'development';
  
  return {
    props: {
      isAuthorized,
    },
  };
};