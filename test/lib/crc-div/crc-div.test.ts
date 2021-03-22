import { CrcDiv } from '@/lib/crc-div/crc-div';
import { BooleanWrapper } from '@/lib/crc-div/structure/wrapper';
import { binArrToStr, nameof } from '@/lib/utils';

interface TestCaseInputInterface {
  dataBitStr: string;
  genBitStr: string;
}

interface TestCaseOutputInterface {
  remBitStr: string;
}

interface TestCaseInterface {
  input: TestCaseInputInterface;
  output: TestCaseOutputInterface;
}

function f({ input, output }: TestCaseInterface) {
  const [dataBits, genBits] = [input.dataBitStr, input.genBitStr].map<Array<boolean>>((bitStr) => bitStr.split('').map<boolean>((ch) => ch !== '0')).map<Array<BooleanWrapper>>((arr) => arr.map((x) => new BooleanWrapper(x)));

  return () =>
    expect(binArrToStr(CrcDiv.remainderFor(dataBits, genBits).map((x) => x.value))).toBe(
      output.remBitStr
    );
}

const testcases: TestCaseInterface[] = [
  {
    input: {
      dataBitStr: '10111000',
      genBitStr: '1001',
    },
    output: {
      remBitStr: '101',
    },
  },
  {
    input: {
      dataBitStr: '10011111',
      genBitStr: '1111',
    },
    output: {
      remBitStr: '011',
    },
  },
  {
    input: {
      dataBitStr: '1010101010',
      genBitStr: '10011',
    },
    output: {
      remBitStr: '0100',
    },
  },
  {
    input: {
      dataBitStr: '01010101010',
      genBitStr: '10011',
    },
    output: {
      remBitStr: '0100',
    },
  },
];

testcases.forEach((testcase) => test(`test ${nameof({_: CrcDiv.remainderFor.name})}`, f(testcase)));