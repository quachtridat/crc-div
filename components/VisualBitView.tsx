import { VisualBit } from '@/lib/crc-div/structure/visual-bit';

export interface Props<SettingsType> extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  visualBit?: VisualBit<SettingsType>;
  /**
   * `true` or `false` instead of `1` or `0`
   */
  alpha?: boolean;
}

export type ComponentInterface<SettingsType> = React.FC<Props<SettingsType>>;

export const visualBitViewComponent = <SettingsType,> ({visualBit, alpha, ...otherProps}: Props<SettingsType>): ReturnType<ComponentInterface<SettingsType>> => {
  return (
    <span {...otherProps}>
      {
        visualBit ? visualBit.value ? alpha === true ? 'true' : 1 : alpha === true ? 'false' : 0 : alpha === true ? 'false' : 0
      }
      
    </span>
  );
};

export default visualBitViewComponent;