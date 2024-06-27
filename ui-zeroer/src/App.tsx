import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

function App() {
  const PANES = [
    {
      value: "aa",
      component: <></>,
    },
    {
      value: "bb",
      component: <></>,
    },
  ];

  return (
    <>
      <Tabs>
        <TabsList>
          {PANES.map(({ value: v }) => (
            <TabsTrigger value={v} key={v} />
          ))}
        </TabsList>
        {PANES.map(({ value: v, component }) => (
          <TabsContent value={v} key={v}>
            {component}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}

export default App;
