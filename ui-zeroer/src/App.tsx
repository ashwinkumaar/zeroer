import { AddUserForm } from './AddUser';
import DataSection from './components/sections/DataSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

function App() {
  return (
    <div className='h-screen w-screen bg-white pt-12'>
      <Tabs defaultValue='main' className='mx-auto w-full max-w-screen-lg'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='main'>Add new user</TabsTrigger>
          <TabsTrigger value='data'>Data</TabsTrigger>
        </TabsList>
        <TabsContent value='main'>
          <AddUserForm />
        </TabsContent>
        <TabsContent value='data'>
          <DataSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
