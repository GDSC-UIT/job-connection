import skillApi from '@api/skill';
import React from 'react';
import { useController } from 'react-hook-form';
import { useQuery } from 'react-query';
import ReactSelect from 'react-select';

const SkillMultiSelect = ({ control, name, rules, label }) => {
  const { data } = useQuery(['skills', { size: 1000 }], () => skillApi.get({ size: 1000 }));
  const { field } = useController({ control, name, defaultValue: [] });

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <ReactSelect
        isMulti
        options={data?.data.items || []}
        getOptionLabel={(x) => x.name}
        getOptionValue={(x) => x.id}
        value={field.value.map((id) => data?.data.items.find((x) => x.id == id))}
        onChange={(data) => {
          field.onChange(data.map((x) => x.id));
        }}
        closeMenuOnSelect={false}
      />
    </div>
  );
};

export default SkillMultiSelect;
