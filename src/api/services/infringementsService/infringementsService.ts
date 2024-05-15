import { InfringementsProps, InfringementsPropsResponse } from "../../../models/InfringementsProps";

export const fetchIncidents = async (limit: number, offset: number): Promise<InfringementsPropsResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/incident/?limit=${limit}&offset=${offset}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    const incidents: InfringementsProps[]= responseData.data;
    
    return {
      data: incidents,
      totalCount: responseData.totalCount,
    };
  } catch (error: any) {
    console.error(`Failed to fetch incidents: ${error.message}`);
    throw error;
  }
};

  export const fetchImage = async (fileName: string): Promise<Blob> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/image/${fileName}`, {
        headers: {
          'Accept': 'image/webp',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const blob = await response.blob();
      return blob;
    } catch (error:any) {
      console.error(`Failed to fetch image: ${error.message}`);
      throw error;
    }
  };