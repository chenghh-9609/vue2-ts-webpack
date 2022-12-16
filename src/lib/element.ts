import {
  Button,
  Table,
  TableColumn,
  Dialog,
  Form,
  FormItem,
  Input,
  MessageBox,
  Message,
  Loading,
} from 'element-ui';

export default {
  install(V: any) {
    V.use(Button);
    V.use(Table);
    V.use(TableColumn);
    V.use(Dialog);
    V.use(Form);
    V.use(FormItem);
    V.use(Input);
    V.use(Input);
    V.use(Input);
    V.prototype.$loading = Loading.service;
    V.prototype.$message = Message;
    // V.prototype.$msgbox = MessageBox;
    V.prototype.$alert = MessageBox.alert;
    V.prototype.$confirm = MessageBox.confirm;
    V.prototype.$prompt = MessageBox.prompt;
  },
};
