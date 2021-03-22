import { NextPage } from 'next';
import Layout from '@/components/Layout';

import CrcDiv from '@/components/CrcDiv';

const CrcDivPage: NextPage = () => {  
  return (
    <Layout title="CRC" className="flex flex-col flex-1 w-screen h-screen">
      <main className="flex-1 w-full px-8 py-4 mx-auto">
        <CrcDiv />
      </main>
      <footer className="flex flex-col flex-grow flex-shrink-0 max-h-20">
        <hr />
        <div className="flex flex-col justify-around flex-grow px-4 py-2">
          <p className="text-center">
            Written by Dat Quach.
          </p>
          <p className="text-center">
            Source code available at <a href="https://github.com/quachtridat/crc-div" className="font-black">GitHub</a>.
          </p>
        </div>
      </footer>
    </Layout>
  );
};

export default CrcDivPage;
