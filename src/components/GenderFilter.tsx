export const GenderFilter = ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => {
    return (
      <select className="gender-filter"
        value={value}
        onClick={e=>e.stopPropagation()}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {["male", "female", "all"].map((gender) => {
          return (
            <option value={gender} key={gender}>
              {gender}
            </option>
          );
        })}
      </select>
    );
  };