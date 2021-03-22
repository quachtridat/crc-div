import { NextPage } from 'next';
import Layout from '@/components/Layout';

import CrcDiv from '@/components/CrcDiv';

const CrcDivPage: NextPage = () => {  
  return (
    <Layout title="CRC">
      <div className="max-w-screen-lg px-8 py-4 mx-auto">
        {/* <h1 className="w-full mx-auto mb-4 text-4xl text-center">Cyclic Redundancy Check</h1> */}
        <CrcDiv />
      </div>
    </Layout>
  );
};

export default CrcDivPage;
