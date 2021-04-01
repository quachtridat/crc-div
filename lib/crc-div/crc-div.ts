import assert from 'assert';
import { nameof, rangeFn } from '@/lib/utils';
import { InvalidArgumentException } from '@/lib/errors';
import { NewArrayOperation } from './operation/new-array';
import { BooleanWrapper } from './structure/wrapper';
import { AppendArrayInplaceOperation } from './operation/append-array';
import { XorBooleanWrapperOperation } from './operation/xor-boolean-wrapper';
import { VisualBit, VisualBitSettings } from './structure/visual-bit';
import { SetVisualSettingsOperation } from './operation/set-visual-settings';
import Descriptor from './structure/descriptor';

export type CrcDivStepBitDataType = BooleanWrapper;
export type CrcDivStepYieldType<BitType = CrcDivStepBitDataType> = Array<Array<BitType>> | Descriptor<string> | void;
export type CrcDivStepReturnType<BitType = CrcDivStepBitDataType> = Array<BitType>;
export type CrcDivStepNextType = never;
export type CrcDivStepGeneratorType<BitType = CrcDivStepBitDataType> = Generator<CrcDivStepYieldType<BitType>, CrcDivStepReturnType<BitType>, CrcDivStepNextType>;

export class CrcDiv/* <BitType extends CrcDivStepBitDataType = BooleanWrapper> */ {
  public static *generatorFor<BitType extends CrcDivStepBitDataType = CrcDivStepBitDataType, DataBitArrayType extends Array<BitType> = Array<BitType>, GenBitArrayType extends Array<BitType> = Array<BitType>>(dataBits: DataBitArrayType, genBits: GenBitArrayType, bitCtor?: new (boolVal: boolean) => BitType, skipYieldForIndivisibles = false): CrcDivStepGeneratorType<BitType> {
    if (dataBits.length < 1)
      throw new InvalidArgumentException(
        'The data bits cannot be empty!',
        nameof({ dataBits })
      );
    if (genBits.length < 1)
      throw new InvalidArgumentException(
        'The generator bits cannot be empty!',
        nameof({ genBits })
      );
    if (genBits[0].value === false)
      throw new InvalidArgumentException(
        `The leading generator bit must not be ${0}`,
        nameof({ genBits })
      );

    const calcDataArr = [] as Array<Array<BitType>>;
    yield calcDataArr;

    const descAddInitialRemBits = new Descriptor<string>(`Append ${genBits.length - 1} trailing zero bits to data bits.`);
    for (let i = 1; i < genBits.length; i += 1) {
      const pushTempDataBitOp = new AppendArrayInplaceOperation({container: dataBits, items: [bitCtor ? new bitCtor(false) : {value: false} as BitType]});
      pushTempDataBitOp.execute();
      yield descAddInitialRemBits;
    }

    {
      let dataBitIdx = 0;
      const endDataBitIdx = dataBits.length;
      let newRemBitArrOp = new NewArrayOperation<Array<BitType>>([] as Array<BitType>);
      let remBits = newRemBitArrOp.execute();
      
      // yield;
      calcDataArr.push(remBits);

      for (; dataBitIdx < endDataBitIdx && remBits.length < genBits.length; dataBitIdx += 1) {
        const remBitFromData = dataBits[dataBitIdx];

        if (remBitFromData instanceof VisualBit) {
          const setActiveSettingsOp = new SetVisualSettingsOperation<VisualBitSettings, VisualBit>({obj: remBitFromData as VisualBit, settings: {active: true}}, true);
          const descSetActiveRemBitFromData = new Descriptor<string>(`Mark data bit #${dataBits.length - dataBitIdx - 1} as active.`);
          setActiveSettingsOp.execute();
          yield descSetActiveRemBitFromData;
        }

        const newRemBit = bitCtor ? new bitCtor(remBitFromData.value) : {value: remBitFromData.value} as BitType;

        if (newRemBit instanceof VisualBit) {
          const setActiveSettingsOp = new SetVisualSettingsOperation<VisualBitSettings, VisualBit>({obj: newRemBit as VisualBit, settings: {active: true}}, true);
          setActiveSettingsOp.execute();
        }

        const pushRemBitOp = new AppendArrayInplaceOperation<BitType, Array<BitType>>({container: remBits, items: [newRemBit]});
        const descNewRemBit = new Descriptor<string>('Add the active data bit as a new remainder bit.');
        pushRemBitOp.execute();
        yield descNewRemBit;
        
        if (remBitFromData instanceof VisualBit) {
          const setActiveSettingsOp = new SetVisualSettingsOperation<VisualBitSettings, VisualBit>({obj: remBitFromData as VisualBit, settings: {active: false}}, true);
          setActiveSettingsOp.execute();
        }

        if (newRemBit instanceof VisualBit) {
          const setActiveSettingsOp = new SetVisualSettingsOperation<VisualBitSettings, VisualBit>({obj: newRemBit as VisualBit, settings: {active: false}}, true);
          setActiveSettingsOp.execute();
        }

        const descSetActiveRemBits = new Descriptor<string>('Unmark the data bit and the remainder bit.');
        yield descSetActiveRemBits;
      }

      assert.strictEqual(remBits.length, genBits.length);

      let offset = 0;

      for (; dataBitIdx <= endDataBitIdx; dataBitIdx += 1, offset += 1) {
        remBits = calcDataArr[calcDataArr.length - 1];

        const allZeros = remBits[offset].value !== genBits[0].value;
        const skipCalcYields = allZeros && skipYieldForIndivisibles;

        //const newGenBitArrOp: NewArrayOperation<Array<BitType>> = remBits[offset].value !== genBits[0].value ? new NewArrayOperation<Array<BitType>>((new Array<BitType>(offset + genBits.length)).map(() => bitCtor ? new bitCtor(false) : {value: false} as BitType)) : new NewArrayOperation<Array<BitType>>((new Array<BitType>(offset)).map(() => bitCtor ? new bitCtor(false) : {value: false} as BitType).concat(genBits.slice()));
        const newGenBitArrOp: NewArrayOperation<Array<BitType>> = allZeros ? new NewArrayOperation<Array<BitType>>(rangeFn(0, offset + genBits.length, 1, (): BitType => bitCtor ? new bitCtor(false) : {value : false} as BitType)) : new NewArrayOperation<Array<BitType>>(rangeFn(0, offset, 1, (): BitType => bitCtor ? new bitCtor(false) : {value : false} as BitType).concat(...rangeFn(0, genBits.length, 1, (_, idx) => bitCtor ? new bitCtor(genBits[idx].value) : {value: genBits[idx].value} as BitType)));
        const newGenBits = newGenBitArrOp.execute();

        for (let genBitIdx = 0; genBitIdx < offset; genBitIdx += 1) {
          const genBit = newGenBits[genBitIdx];
          if (genBit instanceof VisualBit) {
            const setHiddenSettingsOp = new SetVisualSettingsOperation<VisualBitSettings, VisualBit>({obj: genBit as VisualBit, settings: {hidden: true}}, true);
            setHiddenSettingsOp.execute();
          }
        }

        assert.strictEqual(remBits.length, newGenBits.length);

        calcDataArr.push(newGenBits);

        const descNewGenBits = new Descriptor<string>(allZeros ? 'Preserve remainder bits as the leading remainder bit is zero or differs from the leading generator bit.' : 'Copy the generator bits.');
        yield descNewGenBits;

        if (skipCalcYields) {
          const descSkipCalcYields = new Descriptor<string>('Fast-forwarding calculations as the remainder bits are preserved because the leading remainder bit is zero or differs from the leading generator bit.');
          yield descSkipCalcYields;
        }

        newRemBitArrOp = new NewArrayOperation<Array<BitType>>(remBits.slice(0, offset));
        const newRemBits = newRemBitArrOp.execute();

        for (let remBitIdx = 0; remBitIdx < offset; remBitIdx += 1) {
          const remBit = newRemBits[remBitIdx];
          if (remBit instanceof VisualBit) {
            const setHiddenSettingsOp = new SetVisualSettingsOperation<VisualBitSettings, VisualBit>({obj: remBit as VisualBit, settings: {hidden: true}}, true);
            setHiddenSettingsOp.execute();
          }
        }

        calcDataArr.push(newRemBits);

        while (newRemBits.length < remBits.length) {
          const currentIdx = newRemBits.length;

          const bit1 = remBits[currentIdx];
          const bit2 = newGenBits[currentIdx];

          // yield;
          for (const bit of [bit1, bit2]) {
            if (bit instanceof VisualBit) {
              const setActiveSettingsOp = new SetVisualSettingsOperation<VisualBitSettings, VisualBit>({obj: bit as VisualBit, settings: {active: true}}, true);
              setActiveSettingsOp.execute();
            }
          }
          const descSetActiveBits = new Descriptor<string>(`Mark remainder bit #${remBits.length - currentIdx - 1} and generator bit #${newGenBits.length - currentIdx - 1} as active`);
          if (!skipCalcYields) yield descSetActiveBits;

          const calcXorRemBitGenBit = new XorBooleanWrapperOperation({value1: bit1, value2: bit2});
          const xorVal = calcXorRemBitGenBit.execute();
          const newRemBit = bitCtor ? new bitCtor(xorVal.value) : xorVal as BitType;

          if (newRemBit instanceof VisualBit) {
            const setActiveSettingsOp = new SetVisualSettingsOperation<VisualBitSettings, VisualBit>({obj: newRemBit as VisualBit, settings: {active: true}}, true);
            setActiveSettingsOp.execute();
          }

          const pushRemBitOp = new AppendArrayInplaceOperation<BitType, Array<BitType>>({container: newRemBits, items: [newRemBit]});
          pushRemBitOp.execute();
          const descNewRemBit = new Descriptor<string>(`Exclusive-OR (XOR) operation between the remainder bit and the generator bit produces a new bit of value ${xorVal.value ? 1 : 0} as ${bit1.value ? 1 : 0} ⊕ ${bit2.value ? 1 : 0} = ${xorVal.value ? 1 : 0}.`);
          if (!skipCalcYields) yield descNewRemBit;
          if (currentIdx <= offset && newRemBit instanceof VisualBit) {
            const setHiddenSettingsOp = new SetVisualSettingsOperation<VisualBitSettings, VisualBit>({obj: newRemBit as VisualBit, settings: {hidden: true}}, true);
            setHiddenSettingsOp.execute();
          }
          if (newRemBit instanceof VisualBit) {
            const setActiveSettingsOp = new SetVisualSettingsOperation<VisualBitSettings, VisualBit>({obj: newRemBit as VisualBit, settings: {active: false}}, true);
            setActiveSettingsOp.execute();
          }
          for (const bit of [bit1, bit2]) {
            if (bit instanceof VisualBit) {
              const setActiveSettingsOp = new SetVisualSettingsOperation<VisualBitSettings, VisualBit>({obj: bit as VisualBit, settings: {active: false}}, true);
              setActiveSettingsOp.execute();
            }
          }
        }

        if (skipCalcYields) {
          const descSkipCalcYields = new Descriptor<string>('Fast-forwarded calculations as the remainder bits are preserved because the leading remainder bit is zero or differs from the leading generator bit.');
          yield descSkipCalcYields;
        }

        if (dataBitIdx < endDataBitIdx) {
          const remBitFromData = dataBits[dataBitIdx];

          if (remBitFromData instanceof VisualBit) {
            const setActiveSettingsOp = new SetVisualSettingsOperation<VisualBitSettings, VisualBit>({obj: remBitFromData as VisualBit, settings: {active: true}}, true);
            const descSetActiveRemBitFromData = new Descriptor<string>(`Mark data bit #${dataBits.length - dataBitIdx - 1} as active.`);
            setActiveSettingsOp.execute();
            yield descSetActiveRemBitFromData;
          }

          const newRemBit = bitCtor ? new bitCtor(remBitFromData.value) : {value: remBitFromData.value} as BitType;

          if (newRemBit instanceof VisualBit) {
            const setActiveSettingsOp = new SetVisualSettingsOperation<VisualBitSettings, VisualBit>({obj: newRemBit as VisualBit, settings: {active: true}}, true);
            setActiveSettingsOp.execute();
          }

          const pushRemBitOp = new AppendArrayInplaceOperation<BitType, Array<BitType>>({container: newRemBits, items: [newRemBit]});
          const descNewRemBit = new Descriptor<string>('Add the active data bit as a new remainder bit.');
          pushRemBitOp.execute();
          yield descNewRemBit;

          if (remBitFromData instanceof VisualBit) {
            const setActiveSettingsOp = new SetVisualSettingsOperation<VisualBitSettings, VisualBit>({obj: remBitFromData as VisualBit, settings: {active: false}}, true);
            setActiveSettingsOp.execute();
          }
          if (newRemBit instanceof VisualBit) {
            const setActiveSettingsOp = new SetVisualSettingsOperation<VisualBitSettings, VisualBit>({obj: newRemBit as VisualBit, settings: {active: false}}, true);
            setActiveSettingsOp.execute();
          }
          const descSetActiveRemBits = new Descriptor<string>('Unmark the data bit and the remainder bit.');
          yield descSetActiveRemBits;
        }
      }
    }

    assert.strictEqual(calcDataArr.length > 0, true);

    const result = calcDataArr.slice(-1)[0].slice(-(genBits.length - 1));

    const descResult = new Descriptor<string>(`The result is ${result.length <= 10 ? result.map<string>((x) => x.value ? '1' : '0').join('') : result.slice(0, 3).map<string>((x) => x.value ? '1' : '0').join('').concat('...').concat(result.slice(-3).map<string>((x) => x.value ? '1' : '0').join(''))}.`);
    yield descResult;

    return result;
  }

  static remainderFor<BitType extends CrcDivStepBitDataType = CrcDivStepBitDataType, DataBitArrayType extends Array<BitType> = Array<BitType>, GenBitArrayType extends Array<BitType> = Array<BitType>>(dataBits: DataBitArrayType, genBits: GenBitArrayType, bitCtor?: new (boolVal: boolean) => BitType): Array<BitType> {
    const gen = CrcDiv.generatorFor<BitType>(dataBits, genBits, bitCtor);
    let state = gen.next();
    while (state.done !== true) state = gen.next();
    return state.value;
  }
}

export default CrcDiv;
