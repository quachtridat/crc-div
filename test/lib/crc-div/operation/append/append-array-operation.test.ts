import { nameof } from '@/lib/utils';
import { AppendArrayInplaceOperationData, AppendArrayInplaceOperation } from '@/lib/crc-div/operation/append-array';

interface TestCaseInputInterface {
  value: any;
  appendable: any[];
}

interface TestCaseOutputInterface {
  appendable: any[];
}

interface TestCaseInterface {
  input: TestCaseInputInterface;
  output: TestCaseOutputInterface;
}

function f({input, output}: TestCaseInterface) {
  const data = new AppendArrayInplaceOperationData(input.appendable, input.value);
  const op = new AppendArrayInplaceOperation(data);

  op.execute();

  return () => {
    expect(input.appendable).toEqual(output.appendable);
  };
}

const testcases: TestCaseInterface[] = [
  {
    input: {
      appendable: [1, 2, 3],
      value: 4
    },
    output: {
      appendable: [1, 2, 3, 4]
    }
  },
  {
    input: {
      appendable: [],
      value: 'a'
    },
    output: {
      appendable: ['a']
    }
  }
]

testcases.forEach((testcase) => test(`test ${nameof({AppendArrayInplaceOperation})}`, f(testcase)));