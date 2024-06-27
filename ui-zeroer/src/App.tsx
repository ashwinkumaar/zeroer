import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';

import { MainSection } from '@/components/sections/main';
import { DataSection } from '@/components/sections/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SECTIONS = [
  {
    value: 'main',
    triggerText: 'Add new user',
    component: <MainSection />,
  },
  {
    value: 'data',
    triggerText: 'Data',
    component: <DataSection />,
  },
];

const urlParamKey = 'view';

const queryClient = new QueryClient();

function App() {
  const [routeState, setRouteState] = useState(SECTIONS[0].value);

  useEffect(() => {
    if (window) {
      const params = new URLSearchParams(window.location?.search);
      const route = params?.get(urlParamKey);
      if (route && SECTIONS.map((v) => v.value).includes(route)) {
        setRouteState(route);
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className='h-screen w-screen bg-white pt-12'>
        <Tabs value={routeState} className='mx-auto flex w-full max-w-screen-lg flex-col gap-3'>
          <TabsList className='grid w-full grid-cols-2'>
            {SECTIONS.map((section) => (
              <TabsTrigger value={section.value} key={section.value}>
                <a
                  className='size-full'
                  href={`/${section.value !== 'main' ? '?view=' + section.value : ''}`}
                >
                  <span>{section.triggerText}</span>
                </a>
              </TabsTrigger>
            ))}
          </TabsList>
          {SECTIONS.map((section) => (
            <TabsContent value={section.value} key={section.value}>
              {section.component}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
