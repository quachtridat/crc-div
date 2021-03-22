import { useState, ChangeEvent, ChangeEventHandler } from 'react';

import { VisualBit } from '@/lib/crc-div/structure/visual-bit';
import { CrcDiv, CrcDivStepGeneratorType } from '@/lib/crc-div/crc-div';

import VisualBitView from '@/components/VisualBitView';
import { clampNumber } from '@/lib/utils';
import { useInterval } from '@/lib/hooks/interval.hook';
import Descriptor from '@/lib/crc-div/structure/descriptor';

interface CrcDivInterface {
  dataBits: Array<VisualBit>;
  genBits: Array<VisualBit>;
  stateMachine: CrcDivStepGeneratorType<VisualBit>;
}

const [MIN_AUTO_INTERVAL, MAX_AUTO_INTERVAL, DEFAULT_AUTO_INTERVAL] = [10, 10000, 1000];

const INTRO_DESC = 'Use the control panel to enter inputs and iterate through each step manually or let the program run automatically using control buttons and auto interval time length number box.';

export const crcDivComponent: React.FC = () => {
  const [dataStr, setDataStr] = useState<string>('');
  const [genStr, setGenStr] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const [noNextStep, setNoNextStep] = useState<boolean>(true);
  const [crcDiv, setCrcDiv] = useState<CrcDivInterface>();
  const [calcData, setCalcData] = useState<Array<Array<VisualBit>>>([]);
  const [numStep, setNumStep] = useState<number>(0);
  const [desc, setDesc] = useState<string>(INTRO_DESC);

  const [autoIntervalTimeLength, setAutoIntervalTimeLength] = useState<number>(DEFAULT_AUTO_INTERVAL);
  const [isAuto, setIsAuto] = useState<boolean>(false);

  const onChangeDataStr: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    if (dataStr.length < 128) setDataStr((e.target as HTMLInputElement).value);
  };

  const onChangeGenStr: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    if (genStr.length < 128) setGenStr((e.target as HTMLInputElement).value);
  };

  const onClickLoad = () => {
    try {
      const dataBits = dataStr.split('').map((x) => new VisualBit(x !== '0'));
      const genBits = genStr.split('').map((x) => new VisualBit(x !== '0'));
      const machine = CrcDiv.generatorFor(dataBits, genBits, VisualBit);
      setIsAuto(false);
      setDesc('');
      setResult('');
      setNumStep(0);
      setCalcData([]);
      setCrcDiv({ dataBits: dataBits, genBits: genBits, stateMachine: machine });
      setAutoIntervalTimeLength(clampNumber(MIN_AUTO_INTERVAL, autoIntervalTimeLength, MAX_AUTO_INTERVAL));
      setNoNextStep(false);
    } catch (e: any) {
      if (e instanceof Error) {
        setResult(`Error: ${e.message}`);
      } else {
        setResult('An error has occurred!');
      }
    }
  };

  const advanceState = () => {
    if (crcDiv) {
      const state = crcDiv.stateMachine.next();
      if (state.done === true) {
        setIsAuto(false);
        if (!noNextStep) {
          setNumStep(numStep + 1);
          setNoNextStep(true);
          if (state.value) setResult(state.value.map((x) => x.value ? '1' : '0').join(''));
        }
      } else {
        setNumStep(numStep + 1);
        if (state.value) {
          if (state.value instanceof Descriptor) {
            if (typeof state.value.description === 'string') {
              setDesc(state.value.description);
            }
          } else {
            setCalcData(state.value);
          }
        }
      }
    }
  };

  useInterval(() => {
    advanceState();
  }, !noNextStep && isAuto ? autoIntervalTimeLength : null);

  const onClickNextStep = () => {
    setIsAuto(false);
    advanceState();
  };

  const onChangeAutoInterval: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    const s = (e.target as HTMLInputElement).value;
    const x = Number.parseInt(s);
    setAutoIntervalTimeLength(isNaN(x) ? DEFAULT_AUTO_INTERVAL : x);
  };

  const onClickAuto = () => {
    setIsAuto(true);
  };

  const onClickPause = () => {
    setIsAuto(false);
  };

  return (
    <div className="flex flex-1 w-full gap-x-4 gap-y-4">
      <form action="#" method="POST" className="min-w-max">
        <div className="overflow-hidden rounded-md shadow">
          <div className="p-6 space-y-6">
            <p className="mx-auto text-lg text-center">Cyclic Redundancy Check</p>
            <fieldset>
              <legend className="text-base font-medium text-gray-900 sr-only">Input</legend>
              <div className="mt-2 space-y-4">
                <div>
                  <label htmlFor="data-string" className="block text-sm font-medium text-gray-700">Data</label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <span className="inline-flex items-center h-full px-4 py-0 text-sm text-gray-500 bg-transparent border-transparent rounded-md focus:ring-indigo-500">
                        Binary
                      </span>
                      <span className="w-[1px] h-5/6 bg-gray-300 ml-1"></span>
                    </div>
                    <input type="text" name="data-string" id="data-string" value={dataStr} onChange={onChangeDataStr} placeholder="Data" className="block w-full pl-20 font-mono text-sm text-right border-gray-300 rounded-md focus:ring-indigo-500" />
                  </div>
                </div>
                <div>
                  <label htmlFor="gen-string" className="block text-sm font-medium text-gray-700">Generator</label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <span className="inline-flex items-center h-full px-4 py-0 text-sm text-gray-500 bg-transparent border-transparent rounded-md focus:ring-indigo-500">
                        Binary
                      </span>
                      <span className="w-[1px] h-5/6 bg-gray-300 ml-1"></span>
                    </div>
                    <input type="text" name="gen-string" id="gen-string" value={genStr} onChange={onChangeGenStr} placeholder="Generator" className="block w-full pl-20 font-mono text-sm text-right border-gray-300 rounded-md focus:ring-indigo-500" />
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-base font-medium text-gray-900 sr-only">Output</legend>
              <div className="mt-4 space-y-4">
                <div className="">
                  <label className="block text-sm font-medium text-gray-700">Result</label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <span className="inline-flex items-center h-full px-4 py-0 text-sm text-gray-500 bg-transparent border-transparent rounded-md focus:ring-indigo-500">
                        Binary
                      </span>
                      <span className="w-[1px] h-5/6 bg-gray-300 ml-1"></span>
                    </div>
                    <input type="text" name="result-string" id="result-string" value={result} disabled={true} placeholder="Result" className="inline-block w-full pl-20 font-mono text-sm text-right border-gray-300 rounded-md focus:ring-indigo-500" />
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="flex flex-col w-full bg-gray-50">
            <div className="grid grid-cols-2 grid-rows-1 px-6 py-3">
              <div className="flex items-center flex-1 gap-x-2">
                <span>Step</span><span className="px-4 py-2 font-bold text-white bg-black rounded-md">{numStep}</span>
              </div>
              <div className="flex justify-end flex-1 gap-x-2">
                <button type="button" onClick={onClickLoad} className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed">
                  Load
                </button>
                <button type="button" onClick={onClickNextStep} disabled={noNextStep} className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed">
                  Next Step
                </button>
              </div>
            </div>
            <div className="flex flex-1 px-6 py-3 gap-x-2">
              <div className="relative w-full rounded-md shadow-sm">
                <input type="number" min={MIN_AUTO_INTERVAL} max={MAX_AUTO_INTERVAL} value={autoIntervalTimeLength} onChange={onChangeAutoInterval} disabled={noNextStep} className="block w-full pr-20 text-sm border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500" placeholder="Auto Interval" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-sm text-gray-500">
                    ms/step
                  </span>
                </div>
              </div>
              <button type="button" onClick={onClickAuto} disabled={noNextStep || isAuto} className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed">
                Auto
              </button>
              <button type="button" onClick={onClickPause} disabled={noNextStep || !isAuto} className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-gray-500 disabled:cursor-not-allowed">
                Pause
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="flex flex-1 flex-col rounded-md shadow max-h-[75vh] pt-6 content-start">
        <div className="flex flex-col items-start px-6 font-mono">
          {
            crcDiv ?
            [crcDiv.dataBits, crcDiv.genBits].map((arr, idx) => (
              <span key={idx} className="inline-block font-mono">
                {
                  arr?.map((x, idx2) => (
                    <VisualBitView key={idx2} visualBit={x} className={`${x.settings?.active ? 'text-red-500' : ''} ${x.settings?.hidden ? 'invisible' : ''}`} />
                  ))
                }
              </span>
            )) : (
              <>
                <span>Data bits</span>
                <span>Generator bits</span>
              </>
            )
          }
          <span className="w-full bg-black border-none h-0.5"></span>
        </div>
        <div className="flex flex-col items-start flex-1 px-6 overflow-auto font-mono">
          {
            calcData.map((arr, idx) => {
              return (
                <span key={idx} className={`${(idx & 1) === 1 ? 'border-b border-black' : ''}`}>
                  {
                    arr.map((x, idx2) => (
                      <VisualBitView key={idx2} visualBit={x} className={`${x.settings?.active ? 'text-red-500' : ''} ${x.settings?.hidden ? 'invisible' : ''}`} />
                    ))
                  }
                </span>
              )
            })
          }
        </div>
        <div className="flex flex-col w-full bg-gray-50">
          <div className="p-6">
            <p className="block font-mono text-center">{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default crcDivComponent;