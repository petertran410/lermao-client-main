import { Controller } from 'react-hook-form';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const FormEditor = (props) => {
  const { name, control } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value } }) => (
        <SunEditor
          setContents={value}
          onChange={onChange}
          height="400px"
          setOptions={{
            buttonList: [
              ['fontSize', 'formatBlock'],
              ['bold', 'underline', 'italic', 'strike'],
              ['align', 'horizontalRule', 'list', 'table'],
              ['fontColor', 'hiliteColor'],
              ['outdent', 'indent'],
              ['undo', 'redo'],
              ['removeFormat'],
              ['link', 'image'],
              ['fullScreen']
            ],
            showPathLabel: false
          }}
        />
      )}
    />
  );
};

export default FormEditor;
