import { FC } from "react";

interface IInputToggleSwitchProps {
  value: boolean;
  onChange: (newValue: boolean) => void;
  label: string;
}

const InputToggleSwitch: FC<IInputToggleSwitchProps> = ({
  value,
  onChange,
  label,
}) => {
  return (
    <div className="custom-control custom-switch">
      <input
        type="checkbox"
        className="custom-control-input"
        id="customSwitches"
        checked={value}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
        readOnly
      />
      <label className="custom-control-label" htmlFor="customSwitches">
        {label}
      </label>
    </div>
  );
};

export default InputToggleSwitch;
