import styled from "styled-components/native";

export const Overlay = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

export const ModalBody = styled.View`
  background-color: #fafafa;
  border-radius: 8px;
  padding: 24px;
  width: 100%;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Form = styled.View`
  margin: 32px 0 0 0;
`;

export const Input = styled.TextInput`
  height: 56px;
  background: #ffffff;
  border: 1px solid rgba(204, 204, 204, 0.5);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`;
