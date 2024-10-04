import { useEffect, useState } from 'react';
import { fetchMaterialById } from '../utils/fetchMaterial';
import { MaterialData } from '../utils/types';

export const useSingleMaterial = (id: string) => {
  const [data, setData] = useState<MaterialData | null>(null);  
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<Error | null>(null);  

  useEffect(() => {
    const getMaterial = async () => {
      setLoading(true);  
      try {
        const person = await fetchMaterialById(id);  
        setData(person); 
      } catch (err) {
        setError(err as Error);  
      } finally {
        setLoading(false);  
      }
    };

    if (id) {
      getMaterial();  
    }
  }, [id]); 

  return { data, loading, error };  
};