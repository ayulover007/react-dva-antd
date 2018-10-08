import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';

const FomBinderWrapper = () =>{
  return (
    <FormBinderWrapper
      value={{
        id: '1',
        name: '卓凌',
        age: 20,
        sex: 'male'
      }}
      ref="formInstance"
    >
      <div>
        <FormBinder name="id">
          <Input htmlType="hidden"/>
        </FormBinder>
        <FormBinder name="name">
          <Input label="姓名："/>
        </FormBinder>
        <FormBinder name="age">
          <NumberPicker label="年龄："/>
        </FormBinder>
        <FormBinder name="sex">
          <RadioGroup label="性别：">
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </RadioGroup>
        </FormBinder>
        <FormBinder name="hobby">
          <CheckboxGroup label="爱好：" dataSource={hobbies}/>
        </FormBinder>
      </div>
    </FormBinderWrapper>
  )
}

export default FomBinderWrapper;
