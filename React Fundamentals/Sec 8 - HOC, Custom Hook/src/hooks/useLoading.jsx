import React from 'react'
import { useState } from 'react'

function useLoading() {
  const [loading, setLoading] = useState(0);

  const startLoading = () => setLoading(0);
  const stopLoading = () => setLoading(1);

  return{
    loading,
    startLoading,
    stopLoading
  }
}

export default useLoading