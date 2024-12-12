import React from 'react';
import { FadeLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // Fixed typo
        height: '50vh', // Center vertically in half the viewport height
      }}
    >
      <FadeLoader color="#007bff" height={15} width={5} radius={2} margin={2} />
    </div>
  );
}
