import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';

export function DataGraph() {
  const queryClient = useQueryClient();
  const [graph, setGraph] = useState({
    nodes: [
      { id: 1, label: 'Node 1', title: 'node 1 tootip text' },
      { id: 2, label: 'Node 2', title: 'node 2 tootip text' },
      { id: 3, label: 'Node 3', title: 'node 3 tootip text' },
      { id: 4, label: 'Node 4', title: 'node 4 tootip text' },
      { id: 5, label: 'Node 5', title: 'node 5 tootip text' },
      { id: 221, label: 'Node 221', title: 'node 5 tootip text' },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ],
  });

  useEffect(() => {
    // if (window.location.search) {
    //   let params = new URLSearchParams(window.location.search);
    //   const name = params.get('name');
    //   const state = queryClient.getQueryData<{}>([{ id: 'name', value: name }]);
    //   if (state?.data?.id) {
    //   }
    // }
  }, []);

  const options = {
    layout: {
      hierarchical: true,
    },
    edges: {
      color: '#000000',
    },
    height: '500px',
  };

  return <Graph graph={graph} options={options} />;
}
