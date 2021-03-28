// @flow
import * as React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

type Props = {
  title: React.Node,
  body: React.Node,
};

const Modal = ({ children, title, body }: Props) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Overlay className="bg-white bg-opacity-40 fixed fill bottom-0 left-0 right-0 top-0" />
      <AlertDialog.Content className="fixed top-[50%] left-[50%] w-64 bg-white rounded-md p-5 shadow-xl transform translate-x-[-50%] translate-y-[-50%]">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description>{body}</AlertDialog.Description>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        <AlertDialog.Action>Accept</AlertDialog.Action>
      </AlertDialog.Content>
      {children}
    </AlertDialog.Root>
  );
};

export default Modal;
