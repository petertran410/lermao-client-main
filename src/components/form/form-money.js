import { FormErrorMessage, Input } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

const FormMoney = (props) => {
  const { control, name } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{
        required: 'Số tiền không được để trống',
        pattern: {
          value: /^\d*$/,
          message: 'Vui lòng nhập số hợp lệ'
        }
      }}
      render={({ field, fieldState }) => (
        <>
          <NumericFormat
            id={name}
            value={field.value}
            placeholder="Nhập số tiền"
            onValueChange={(values) => {
              field.onChange(values.value);
            }}
            thousandSeparator
            decimalScale={0}
            allowNegative={false}
            valueIsNumericString
            customInput={Input}
          />
          <FormErrorMessage>{fieldState.error ? fieldState.error.message : null}</FormErrorMessage>
        </>
      )}
    />
  );
};

export default FormMoney;
