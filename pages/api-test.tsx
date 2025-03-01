import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Layout from '../components/Layout';
import { testApiEndpoints, getAvailableRoutes, getOpleidingenData } from '../lib/api-test';

interface ApiTestProps {
  apiResults: any;
  availableRoutes: string[];
  opleidingenData: any[];
}

export default function ApiTest({ apiResults, availableRoutes, opleidingenData }: ApiTestProps) {
  const [activeTab, setActiveTab] = useState('apiResults');

  return (
    <Layout title="API Test - Frisse Start Opleidingen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-text-dark">WordPress API Test</h1>
        
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'apiResults' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('apiResults')}
            >
              API Results
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'routes' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('routes')}
            >
              Available Routes
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'opleidingen' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('opleidingen')}
            >
              Opleidingen Data
            </button>
          </div>
        </div>
        
        {activeTab === 'apiResults' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-text-dark">API Test Results</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2 text-text-dark">Standard WordPress Endpoints</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-60">
                {JSON.stringify(apiResults.standardEndpoints, null, 2)}
              </pre>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2 text-text-dark">Custom Endpoints</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-60">
                {JSON.stringify(apiResults.customEndpoints, null, 2)}
              </pre>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-2 text-text-dark">Direct Access</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-60">
                {JSON.stringify(apiResults.directAccess, null, 2)}
              </pre>
            </div>
          </div>
        )}
        
        {activeTab === 'routes' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-text-dark">Available WordPress API Routes</h2>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Filter routes..."
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={(e) => {
                  const filterInput = document.getElementById('routesList');
                  if (filterInput) {
                    Array.from(filterInput.getElementsByTagName('li')).forEach(item => {
                      if (item.textContent?.toLowerCase().includes(e.target.value.toLowerCase())) {
                        item.style.display = '';
                      } else {
                        item.style.display = 'none';
                      }
                    });
                  }
                }}
              />
            </div>
            
            <ul id="routesList" className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
              {availableRoutes.map((route, index) => (
                <li key={index} className="mb-1 pb-1 border-b border-gray-200">
                  {route}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {activeTab === 'opleidingen' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-text-dark">Opleidingen Data</h2>
            
            {opleidingenData.length > 0 ? (
              opleidingenData.map((result, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-bold mb-2 text-text-dark">Endpoint: {result.endpoint}</h3>
                  <p className="mb-2">Status: {result.status}</p>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              ))
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md">
                <p>No opleidingen data found from any endpoint.</p>
                <p className="mt-2">Possible reasons:</p>
                <ul className="list-disc ml-6 mt-2">
                  <li>The custom API endpoints are not set up on the WordPress site</li>
                  <li>The wp_opleidingen table doesn't exist or is empty</li>
                  <li>There are permission issues accessing the data</li>
                  <li>CORS restrictions are preventing access from this domain</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Test API endpoints
  const apiResults = await testApiEndpoints();
  
  // Get available routes
  const availableRoutes = await getAvailableRoutes();
  
  // Get opleidingen data
  const opleidingenData = await getOpleidingenData();
  
  return {
    props: {
      apiResults,
      availableRoutes,
      opleidingenData,
    },
  };
};