import DataSection from './components/sections/DataSection';
import MainSection from './components/sections/MainSection';
import { Button } from './components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

function App() {
  return (
    <div className='h-screen w-screen bg-white pt-12'>
      <Tabs defaultValue='main' className='mx-auto w-full max-w-screen-lg'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='main'>Main</TabsTrigger>
          <TabsTrigger value='data'>Data</TabsTrigger>
        </TabsList>
        <TabsContent value='main'>
          <MainSection />
        </TabsContent>
        <TabsContent value='data'>
          <DataSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
